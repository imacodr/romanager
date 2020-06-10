const Discord = require("discord.js");

const TOKEN = process.env.TOKEN;

const PREFIX = process.env.PREFIX;

module.exports = () => {
  const COMMANDS = {
    ping: (message) => {
      message.channel.send("pong");
    },
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
      .setActivity(
        `mp!help | Currently on ${guildCount} servers | getrbots.com`,
        {
          type: "LISTENING",
        }
      )
      .then((presence) =>
        console.log(`Activity set to ${presence.activities[0].name}`)
      )
      .catch(console.error);
  };

  //joined a server
  client.on("guildCreate", (guild) => {
    console.log("Joined a new guild: " + guild.name);
    guildCount++;
    updateActivity();
  });

  //removed from a server
  client.on("guildDelete", (guild) => {
    console.log("Left a guild: " + guild.name);
    guildCount--;
    updateActivity();
  });

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
