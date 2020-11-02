const nbx = require("noblox.js");
const Discord = require("discord.js");

// Shout command

module.exports = async (message, value) => {
  let channel = message.channel;
  const doneembed = new Discord.MessageEmbed()

    .setDescription("```diff\n" + `+ Successfully shouted ${value}` + "\n```")
    .setTimestamp()
    .setFooter(`Shout made by ${message.author.tag} | ${message.author.id}`)
    .setAuthor(
      "Success",
      "https://images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png"
    );

  const clearembed = new Discord.MessageEmbed()

    .setDescription("```diff\n" + `+ Successfully cleared shout` + "\n```")
    .setTimestamp()
    .setFooter(`Shout cleared by ${message.author.tag} | ${message.author.id}`)
    .setAuthor(
      "Success",
      "https://images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png"
    );

  nbx.shout(process.env.GROUPID, value);

  if (!value) {
    channel.send(clearembed);
  } else channel.send(doneembed);
};
