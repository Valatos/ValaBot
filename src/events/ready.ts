import { IEventInfo } from "../interfaces/events";
import { Client } from "discord.js";

/**
 * The function that will be called once the event
 * is fired.
 * 
 * @param client The client currently logged in
 * @since 1.0.0
 */
export function on_fire(client: Client): void {
    client.user.setActivity({
        name: "for commands",
        type: "LISTENING"
    });
    
    console.log("[ValaBot]: Bot is ready.");
}

/**
 * An array containing the information relevant
 * to this event.
 * 
 * @since 1.0.0
 */
export const info: IEventInfo = {
    trigger_name: "ready",
    enabled: true
}