import { app as EApplication } from "electron";
import { Application } from "./Application.js";

(() =>{
    // if (ElectronSquirrelStartup) {
    //     EApplication.quit();
    //     return;
    // }

    let app: Application;

    EApplication.whenReady().then(() => {
        app = new Application();
    })
})()