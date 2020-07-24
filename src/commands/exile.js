const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("You do not have permissions.");

  const doneembed = new Discord.MessageEmbed()
    .setColor("36393f")
    .setTitle("✅ Successfully Exiled")
    .setDescription(`Succsessfully exiled ${value}.`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Exilation made by ${message.author.username}`)
    .setAuthor(
      message.author.username + `#${message.author.discriminator}`,
      message.author.avatarURL()
    );

  try {
    const userid = await nbx.getIdFromUsername(value);
    await nbx.exile(process.env.GROUPID, userid);
    message.channel.send(doneembed);
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setColor("36393f")
      .setTitle("❌ Failed")
      .setDescription(e.message)
      .setTimestamp()
      .setFooter(`Exilation failed by ${message.author.username}`)
      .setAuthor(
        message.author.username + `#${message.author.discriminator}`,
        message.author.avatarURL()
      );

    message.channel.send(errembed);
  }
};
