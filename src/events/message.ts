import { Client, Message } from "discord.js";
import { get_command, can_run_command } from "../commands/commands";
import { IEventInfo } from "../interfaces/events";

/**
 * The function that will be called once the event
 * is fired.
 * 
 * @param client The client currently logged in
 * @since 1.0.0
 */
export function on_fire(client: Client, message: Message): void {
    if (!message.guild.available) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    // Parse the message for the command name.
    const command_name: string = message.content.split(" ")[0] // Remove everything after a space.
                                 .split(process.env.PREFIX)[1] // Remove the prefix.
                                 .toLowerCase();               // Transform the text to lower case.

    // Get the command. If it does not exist, this function returns null.
    const command: [ boolean, any ] = get_command(command_name);

    // Handle commands not existing.
    if (!command[0]) {
        message.reply(`I cannot find the command '${command_name}'. Are you sure it exists?`);

        return;
    }

    const can_run: [boolean, string] = can_run_command(command[1].info, message.member, message.channel);

    if (!can_run[0]) {
        message.reply(can_run[1]);

        return;
    }

    // Parse the message for the arguments.
    const args: string[] = message.content.split(" ").filter((value, index) =>  {
        index >= 1
    });

    // Run the command.
    command[1].run(client, message, args);
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