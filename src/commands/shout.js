const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  let channel = message.channel;
  const doneembed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setTitle("✅ Successfully Shouted")
    .setDescription(`Succsessfully shouted ${value}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Shout made by ${message.author.username}`);

  const clearembed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setTitle("✅ Successfully cleared shout")
    .setDescription(`Succsessfully cleared shout`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Shout cleared by ${message.author.username}`);

  nbx.shout(process.env.GROUPID, value);

  if (!value) {
    channel.send(clearembed);
  } else channel.send(doneembed);
};
