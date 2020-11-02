const Discord = require("discord.js");

module.exports = async (message) => {
  let embed = new Discord.MessageEmbed()
    .setAuthor(
      "Help",
      "https://wiki.octave.org/wiki/images/thumb/a/ae/Info_icon.svg/256px-Info_icon.svg.png"
    )
    .addField(
      "Commands",
      "[View Commands](https://moblox.getrbots.com/docs/commands.html)"
    )
    .addField(
      "Want to get moblox?",
      "[Go to moblox site](https://moblox.getrbots.com/)"
    )
    .addField("Developer", "<@622277900065832961>");

  try {
    const sentEmbed = new Discord.MessageEmbed().setAuthor(
      "Sent!",
      "https://images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png"
    );
    await message.author.send(embed);
    message.channel.send(sentEmbed);
  } catch (e) {
    const errorEmbed = new Discord.MessageEmbed()
      .setDescription("```diff\n" + `- ${e.message}` + "\n```")
      .setTimestamp()
      .setFooter(`Failed by ${message.author.tag} | ${message.author.id}`)
      .setAuthor(
        "Failed",
        "https://media.discordapp.net/attachments/539579135786352652/641188940983959555/627171202464743434.png"
      );
    message.channel.send(errorEmbed);
  }
};
