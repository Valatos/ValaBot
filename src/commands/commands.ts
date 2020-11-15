import { Channel, GuildMember, Permissions } from "discord.js";
import { readdirSync } from "fs";
import { ICommandInfo, CommandPermissions } from "../interfaces/commands";

let commands_cache: any[] = [];

/**
 * This function refreshes the command cache, by
 * clearing it and then re-populating it.
 * 
 * @since 1.0.0
 */
export function refresh_cache(): any[] {
    const categories: string[] = readdirSync(__dirname).filter(file => {
        // Ignore this file, because it is in the directory
        // that is being searched through.
        if (!__filename.endsWith(file)) {
            return file;
        }
    })

    // Clear the array. The garbage collector will take care of the data.
    categories.forEach(category => {
        const command_files = readdirSync(`${__dirname}/${category}`);

        command_files.forEach(file => {
            // Require the command, so we can access its contents.
            const file_required = require(`${__dirname}/${category}/${file}`);
            const data = {
                names: file_required.info.command_names,
                command_required: file_required
            };

            commands_cache.push(data);
        });
    })

    return commands_cache;
}

/**
 * Checks if a user can run a command. This will be decided based
 * on the command info, and the channel in which it is run.
 * 
 * @param command_info The command info of the command.
 * @param executor The person attempting to run this command.
 * @param channel The channel in which the command is being run.
 * @since 1.0.0
 */
export function can_run_command(command_info: ICommandInfo, executor: GuildMember, channel: Channel): [ boolean, string ] {
    if (!command_info.allow_in_dm && channel.type == "dm") {
        return [ false, "You cannot use this command in Direct Messages (DMs)." ];
    }

    let has_permissions = false;

    if (command_info.locked_to & CommandPermissions.BotCreatorOnly && executor.id == process.env.CREATOR_ID) {
        has_permissions = true;
    }

    if (executor && command_info.locked_to & CommandPermissions.ServerAdminOnly && executor.hasPermission(null, {
        checkAdmin: true,
        checkOwner: true
    })) {
        has_permissions = true;
    }

    if (command_info.locked_to & CommandPermissions.Everyone) {
        has_permissions = true;
    }

    if (!has_permissions) {
        return [ false, "You are not allowed to use this command. You lack the required permissions." ];
    }
    
    return [ true, "" ];
}

/**
 * Searches the command categories for the specified command.
 * 
 * @param search_query The command name given by the user.
 * @returns Returns a table with two entries: a boolean and an 'any'.
 *          The boolean indicates if the command was found, and the
 *          any type is the returned command itself.
 * @since 1.0.0
 */
export function get_command(search_query: string): [ boolean, any ] {
    // Returning the data this way is not nice, but the forEach function
    // is a function too, so everything we return gets returned to that,
    // and not to the caller of this function.
    let return_data: [ boolean, any ] = [ false, null ];

    // Loop through all commands in the cache.
    commands_cache.forEach(command_data => {
        // Check all of the names to see if one matches.
        command_data.names.forEach(command_name => {
            // Transform the search query to lower case, so
            // it becomes case insensitive.
            if (command_name == search_query.toLowerCase()) {
                return_data = [ true, command_data.command_required ];
            }
        });
    });
    
    return return_data;
}