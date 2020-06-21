const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  const doneembed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setTitle("✅ Successfully Promoted")
    .setDescription(`Succsessfully promoted user.`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Promotion made by ${message.author.username}`);

  try {
    const userid = await nbx.getIdFromUsername(value);
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
