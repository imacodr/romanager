const nbx = require("noblox.js");
const Discord = require("discord.js");

// Shout command 

module.exports = () => async (message, value) => {
  let channel = message.channel;
  const doneembed = new Discord.MessageEmbed()
    .setColor("36393f")
    .setTitle("✅ Successfully Shouted")
    .setDescription(`Succsessfully shouted ${value}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Shout made by ${message.author.username}`)
    .setAuthor(
      message.author.username + `#${message.author.discriminator}`,
      message.author.avatarURL()
    );

  const clearembed = new Discord.MessageEmbed()
    .setColor("36393f")
    .setTitle("✅ Successfully cleared shout")
    .setDescription(`Succsessfully cleared shout`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`Shout cleared by ${message.author.username}`)
    .setAuthor(
      message.author.username + `#${message.author.discriminator}`,
      message.author.avatarURL()
    );

  nbx.shout(process.env.GROUPID, value);

  if (!value) {
    channel.send(clearembed);
  } else channel.send(doneembed);
};
