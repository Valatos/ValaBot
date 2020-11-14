import { config as load_env_variables } from "dotenv";
import BotClient from "./client/BotClient";

// Load all environment variables from the .env file.
// If a variable already exists, it skips it.
// This makes my life easier when hosting the bot
// locally.
load_env_variables();

// Creating the bot instance.
const client = new BotClient(process.env.TOKEN);

// Starting the bot.
client.run();