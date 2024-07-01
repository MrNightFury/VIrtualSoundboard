import { contextBridge, ipcRenderer } from "electron";
import { Message } from "./ContainerChangeMessages.js";
console.log("Preload start");

contextBridge.exposeInMainWorld('networkWorker', {
    refreshSoundsList: () => ipcRenderer.invoke("refresh"),
    onContainerChange: (callback: (message: Message) => {}) => ipcRenderer.on('containerChangeMessage', (_event, value) => callback(value)),
    playSound: (name: string) => ipcRenderer.invoke("playSound", name)
})

console.log("Preload done");