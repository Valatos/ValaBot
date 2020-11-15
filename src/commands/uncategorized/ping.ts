import { ICommandInfo, CommandPermissions, CommandCategory } from "../../interfaces/commands";
import { Client, Message } from "discord.js";

export function run(client: Client, message: Message, args: string[]): void {
    message.reply("Pong!");
}

export const info: ICommandInfo = {
    command_names: [
        "ping"
    ],
    category: CommandCategory.Uncategorized,
    allow_in_dm: true,
    locked_to: CommandPermissions.Everyone
}