const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("You do not have permissions.");

  const doneembed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setTitle("✅ Successfully Exiled")
    .setDescription(`Succsessfully exiled user.`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Exilation made by ${message.author.username}`);

  try {
    const userid = await nbx.getIdFromUsername(value);
    await nbx.exile(process.env.GROUPID, userid);
    message.channel.send(doneembed);
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setColor(`RED`)
      .setTitle("❌ Failed")
      .setDescription(e.message)
      .setTimestamp()
      .setFooter(`Exilation failed by ${message.author.username}`);

    message.channel.send(errembed);
  }
};
