const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.channel.send("You do not have permissions.");

  const userid = await nbx.getIdFromUsername(value);
  const doneembed = new Discord.MessageEmbed()
    .setColor("36393f")
    .setTitle("✅ Successfully Demoted")
    .setDescription(`Succsessfully demoted ${value}.`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Demotion made by ${message.author.username}`)
    .setAuthor(
      message.author.username + `#${message.author.discriminator}`,
      message.author.avatarURL()
    );

  try {
    await nbx.demote(process.env.GROUPID, userid);
    message.channel.send(doneembed);
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setColor("36393f")
      .setTitle("❌ Failed")
      .setDescription(e.message)
      .setTimestamp()
      .setFooter(`Demotion failed by ${message.author.username}`)
      .setAuthor(
        message.author.username + `#${message.author.discriminator}`,
        message.author.avatarURL()
      );

    message.channel.send(errembed);
  }
};
