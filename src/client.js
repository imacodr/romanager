const Discord = require("discord.js");
const nbx = require("noblox.js");
const fs = require("fs");
const path = require("path");

const firebase = require("./firebase");
const TOKEN = process.env.BOT_TOKEN;

const PREFIX = process.env.PREFIX;

async function refreshCookie() {
  const cookie = await nbx.refreshCookie();
  firebase.setCookie(cookie);
}

async function startApp() {
  const cookie = await firebase.getCookie();

  await nbx.setCookie(cookie);
  let currentUser = await nbx.getCurrentUser();
  console.log(currentUser);

  setInterval(refreshCookie, 30000);
}

const COMMANDS = {};
const normalizedPath = path.join(__dirname, "commands");
fs.readdirSync(normalizedPath).forEach(function (file) {
  const command = file.replace(".js", "");
  COMMANDS[command] = require("./commands/" + file.toLowerCase());
});

const client = new Discord.Client();
let guildCount = 0;
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  guildCount = client.guilds.cache.size;
  updateActivity();
});

updateActivity = () => {
  client.user
    .setActivity(`${PREFIX}help | ${client.user.username}`, {
      type: "LISTENING",
    })
    .then((presence) =>
      console.log(`Activity set to ${presence.activities[0].name}`)
    )
    .catch(console.error);
};

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;
  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const [command, ...values] = message.content.split(PREFIX)[1].split(" ");
  const commandObj = COMMANDS[command.toLowerCase()];

  commandObj(message, values.join(" "));
});

startApp();

client.login(TOKEN);

return client;
