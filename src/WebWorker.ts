import { net } from "electron";

export class WebWorker {
    address: string = "localhost";
    port: number = 80;

    get host(): string {
        return "http://" + this.address + ':' + this.port;
    }

    token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWlsZCI6IjEyNTYzMTQ5Nzc5ODg1MDk3NTkiLCJ1c2VyIjoiMzc5OTcwNjYwMzM3NzEzMTUzIiwiaWF0IjoxNzE5Nzc0MDY0fQ.VuUGCUOGg3Gigv2oxna1fon1udEV8bOHhIIWpXSlAjI";
    
    async getSoundsList(){
        let list = await net.fetch(this.host + "/sounds", {
            method: "GET"
        });
        return list.json();
    }

    async sendPlaySoundRequest(guildId: string, sound: string) {
        net.fetch(this.host + "/sound", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify({
                guildId: guildId,
                sound: sound
            })
        }).then(async res => {
            console.log(res.status, await res.json());
        })
    }
}