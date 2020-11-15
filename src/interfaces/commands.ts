export enum CommandCategory {
    /**
     * @description This command is a command used to
     *              moderate a Discord server.
     * @since 1.0.0
     */
    Moderation,

    /**
     * @description This command has no real purpose, but to
     *              be fun.
     * @since 1.0.0
     */
    Fun,

    /**
     * @description This command can be used to configure the bot
     *              in a Discord server.
     * @since 1.0.0
     */
    Configurations,

    /**
     * @description This command can only be used by staff members
     *              of the bot.
     * @since 1.0.0
     */
    BotStaff,

    /**
     * @description This command does not fit any of the currently
     *              existing categories.
     * @since 1.0.0
     */
    Uncategorized
}

export enum CommandPermissions {
    /**
     * @description Only the bot creator can use this command.
     * @since 1.0.0
     */
    BotCreatorOnly,

    /**
     * @description Only bot staff can use this command.
     * @since 1.0.0
     */
    BotStaffOnly,

    /**
     * @description Only people with a role that has the
     *              Server Administrator permission can use this command.
     * @since 1.0.0
     */
    ServerAdminOnly,

    /**
     * @description Everyone can use this command.
     * @since 1.0.0
     */
    Everyone
}

export interface ICommandInfo {
    /**
     * @description The command names that triggers the command.
     * @since 1.0.0
     */
    command_names: string[],

    /**
     * @description The category to which this command belongs to.
     * @since 1.0.0
     */
    category: CommandCategory,

    /**
     * @description If this command may be used in a Direct Message (DM).
     * @since 1.0.0
     */
    allow_in_dm: boolean,

    /**
     * @description Who can use this command.
     * @since 1.0.0
     */
    locked_to: CommandPermissions
}