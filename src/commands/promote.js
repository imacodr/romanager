const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.channel.send("You do not have permissions.");

  const userid = await nbx.getIdFromUsername(value);

  const doneembed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setTitle("✅ Successfully Promoted")
    .setDescription(`Succsessfully promoted ${value}.`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Promotion made by ${message.author.username}`);

  try {
    await nbx.promote(process.env.GROUPID, userid);
    message.channel.send(doneembed);
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setColor(`RED`)
      .setTitle("❌ Failed")
      .setDescription(e.message)
      .setTimestamp()
      .setFooter(`Promotion failed by ${message.author.username}`);

    message.channel.send(errembed);
  }
};
