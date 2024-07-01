import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld('networkWorker', {
    refreshSoundsList: () => ipcRenderer.invoke("refresh")
});
console.log("Assets");
