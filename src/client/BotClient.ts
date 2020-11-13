import * as discord from "discord.js";

export class BotClient {
    private token: string;
    private client: discord.Client;

    /**
     * Creates a bot client, which can then be run.
     * 
     * @param {string} token The token used to run the bot.
     * @since 1.0.0
     */
    constructor(token: string) {
        /**
         * @type string
         * @private
         */
        this.token = token;

        /**
         * @private
         */
        this.client = new discord.Client();
    }

    /**
     * Starts the bot, using the token
     * provided when creating this bot instance.
     * 
     * @since 1.0.0
     */
    public run(): void {
        this.client.login(this.token);

        while (true) {}
    }
}