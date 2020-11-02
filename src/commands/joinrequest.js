const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = async (message, value) => {
  if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.channel.send("You do not have permissions.");
  const values = value.split(" ");
  const userid = await nbx.getIdFromUsername(values[0]);

  const doneembed = new Discord.MessageEmbed()

    .setDescription(
      "```diff\n" + `+ Successfully accepted/denied ${values[0]}` + "\n```"
    )
    .setThumbnail(
      `https://www.roblox.com/headshot-thumbnail/image?userId=${userid}&width=420&height=420&format=png`
    )
    .setTimestamp()
    .setFooter(
      `Join request handled by ${message.author.tag} | ${message.author.id}`
    )
    .setAuthor(
      "Success",
      "https://images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png"
    );

  try {
    await nbx.handleJoinRequest(process.env.GROUPID, userid, values[1]);
    message.channel.send(doneembed);
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setDescription("```diff\n" + `- ${e.message}` + "\n```")
      .setTimestamp()
      .setFooter(`Failed by ${message.author.tag} | ${message.author.id}`)
      .setAuthor(
        "Failed",
        "https://media.discordapp.net/attachments/539579135786352652/641188940983959555/627171202464743434.png"
      );

    message.channel.send(errembed);
  }
};
