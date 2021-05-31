import { config as dotEnvConfig } from "dotenv";
import * as Discord from "discord.js";
dotEnvConfig();

// const PREFIX = process.env.PREFIX || "!";

const TOKEN = process.env.BOT_TOKEN;

const client = new Discord.Client();

client.on("ready", async () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.login(TOKEN);
