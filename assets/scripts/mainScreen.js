console.log("Reloading");
window.networkWorker.refreshSoundsList();

window.networkWorker.onContainerChange(message => {
    switch (message.type) {
        case "CLEAR": 
            document.getElementById("soundsContainer").innerHTML = "";
            break;
        case "ADD":
            document.getElementById("soundsContainer").innerHTML += message.content;
            break;
    }
})

function playSound(name) {
    window.networkWorker.playSound(name);
}