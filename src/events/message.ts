import { IEventInfo } from "../interfaces/events";
import { Client, Message } from "discord.js";

/**
 * The function that will be called once the event
 * is fired.
 * 
 * @param client The client currently logged in
 * @since 1.0.0
 */
export function on_fire(client: Client, message: Message): void {
    // TODO: Implement this.
}

/**
 * An array containing the information relevant
 * to this event.
 * 
 * @since 1.0.0
 */
export const info: IEventInfo = {
    trigger_name: "message",
    enabled: true
}