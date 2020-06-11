const Discord = require("discord.js");
const nbx = require("noblox.js");

const TOKEN = process.env.TOKEN;

const PREFIX = process.env.PREFIX;

//commands
const myinfo = require("./commands/myinfo");

module.exports = () => {
  const COMMANDS = {
    ping: (message) => {
      message.channel.send("pong");
    },
    myinfo: myinfo(),
  };

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

    //!claim welcomebot :  command = claim, param = welcomebot
    const [command, ...values] = message.content.split(PREFIX)[1].split(" ");
    const commandObj = COMMANDS[command];

    if (!commandObj) {
      await message.reply(
        "Unrecognized command. Accepted commands are: " +
          Object.keys(COMMANDS)
            .map((key) => `${PREFIX}${key}`)
            .join(", ")
      );
      return;
    }

    commandObj(message, values.join(" "));
  });

  client.login(TOKEN);

  return client;
};
