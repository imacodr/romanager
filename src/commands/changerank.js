const { message } = require("noblox.js");

const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.channel.send("You do not have permissions.");

  try {
    const values = value.split(" ");
    const userid = await nbx.getIdFromUsername(values[0]);
    await nbx.setRank({
      group: process.env.GROUPID,
      target: userid,
      name: values[1],
    });

    const doneembed = new Discord.MessageEmbed()
      .setColor(`GREEN`)
      .setTitle("✅ Successfully changed user rank")
      .setDescription(`Succsessfully changed user rank to ${values[1]}.`)
      .setThumbnail(message.author.avatarURL())
      .setTimestamp()
      .setFooter(`Rank changed made by ${message.author.username}`);
    message.channel.send(doneembed);
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setColor(`RED`)
      .setTitle("❌ Failed")
      .setDescription(e.message)
      .setTimestamp()
      .setFooter(`Rank change failed by ${message.author.username}`);

    message.channel.send(errembed);
  }
};
