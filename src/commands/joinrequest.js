const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.channel.send("You do not have permissions.");
  const values = value.split(" ");
  const userid = await nbx.getIdFromUsername(values[0]);

  const doneembed = new Discord.MessageEmbed()
    .setColor("36393f")
    .setTitle("✅ Successfully Accepted/Denied")
    .setDescription(`Succsessfully accepted/denied ${values[0]}.`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Acceptance/Denience made by ${message.author.username}`)
    .setAuthor(
      message.author.username + `#${message.author.discriminator}`,
      message.author.avatarURL()
    );

  try {
    await nbx.handleJoinRequest(process.env.GROUPID, userid, values[1]);
    message.channel.send(doneembed);
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setColor("36393f")
      .setTitle("❌ Failed")
      .setDescription(e.message)
      .setTimestamp()
      .setFooter(`Acceptance/Denience failed by ${message.author.username}`)
      .setAuthor(
        message.author.username + `#${message.author.discriminator}`,
        message.author.avatarURL()
      );

    message.channel.send(errembed);
  }
};
