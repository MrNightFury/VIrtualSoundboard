import { BrowserWindow, app, ipcMain } from "electron";
import { WebWorker } from "./WebWorker.js";
import { fileURLToPath } from "url"
import path from "path";
import ejs from "ejs";
import { SoundFileInfo } from "./SoundFileInfo.js";
import { Message, MessageType } from "./ContainerChangeMessages.js"

export class Application {
    window: BrowserWindow;
    net: WebWorker;
    guildId: string = "1256314977988509759";

    constructor() {
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        console.log(path.join(dirname, "preload.js"));

        this.net = new WebWorker();
        this.window = new BrowserWindow({
            webPreferences: {
                preload: path.join(dirname, "preload.mjs"),
                contextIsolation: true,
                sandbox: false
            }
        });

        this.window.loadFile("assets/views/index.html").then(() => {
            console.log(this.window.webContents.getURL())
        });

        ipcMain.handle("refresh", async () => {
            let sounds = await this.net.getSoundsList() as SoundFileInfo[];
            sounds.forEach(async item => {
                this.window.webContents.send("containerChangeMessage", {
                    type: MessageType.ADD,
                    content: await ejs.renderFile("./assets/ejs/soundCard.ejs", {item: item})
                } as Message);
            })
        });

        ipcMain.handle("playSound", (event, name) => {
            this.net.sendPlaySoundRequest(this.guildId, name);
        })
    }
}