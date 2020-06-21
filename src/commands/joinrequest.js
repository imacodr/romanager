const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.channel.send("You do not have permissions.");

  const doneembed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setTitle("✅ Successfully Accepted/Denied")
    .setDescription(`Succsessfully accepted/denied user.`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Acceptance/Denience made by ${message.author.username}`);

  try {
    const values = value.split(" ");
    const userid = await nbx.getIdFromUsername(values[0]);
    await nbx.handleJoinRequest(process.env.GROUPID, userid, values[1]);
    message.channel.send(doneembed);
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setColor(`RED`)
      .setTitle("❌ Failed")
      .setDescription(e.message)
      .setTimestamp()
      .setFooter(`Acceptance/Denience failed by ${message.author.username}`);

    message.channel.send(errembed);
  }
};
