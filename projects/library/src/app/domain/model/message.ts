export interface MessageHolder {
  message: string
  messageParameters: Array<any>
  messageType: MessageType
}

export enum MessageType {
  Info,
  Success,
  Warning,
  Error,
}
