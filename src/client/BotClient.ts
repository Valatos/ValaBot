import * as discord from "discord.js";
import { readdirSync } from "fs";
import { refresh_cache as refresh_commands_cache } from "../commands/commands";

export default class BotClient {
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
     * Loads all the events, and registers them to the bot.
     * This way they will be called once the event is fired.
     * 
     * @since 1.0.0
     */
    private load_events(): void {
        const event_files = readdirSync(`${__dirname}/../events/`);

        for (const file of event_files) {
            const event = require(`${__dirname}/../events/${file}`);
            
            if (event.info.enabled) {
                this.client.on(event.info.trigger_name, (...params) => {
                    event.on_fire(this.client, ...params);
                });

                console.log(`[ValaBot]: Loaded event '${file.split(".")[0]}' trigged by event '${event.info.trigger_name}'`);
            }
        }
    }

    /**
     * Starts the bot, using the token
     * provided when creating this bot instance.
     * 
     * @since 1.0.0
     */
    public run(): void {
        this.load_events();
        refresh_commands_cache();

        this.client.login(this.token);
    }
}