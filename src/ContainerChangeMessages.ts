export enum MessageType {
    CLEAR = "CLEAR",
    ADD = "ADD"
}

export interface ClearMessage {
    type: MessageType.CLEAR
}

export interface AddMessage {
    type: MessageType.ADD;
    content: string;
}

export type Message = ClearMessage | AddMessage;