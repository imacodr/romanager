const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = async (message, value) => {
  let channel = message.channel;

  try {
    const userid = await nbx.getIdFromUsername(value);

    const role = await nbx.getRankNameInGroup(process.env.GROUPID, userid);

    const groups = await nbx.getGroups(userid);

    let content = groups.map((group) => "``" + group.Name + "``");
    let totalMessages = 1;

    do {
      let msg = [];
      let msgLength = 0;
      let complete = false;
      while (content.length > 0 && !complete) {
        const group = content[0];
        if (msgLength + group.length > 1800) {
          complete = true;
        } else {
          msgLength += group.length;
          msg.push(content.shift());
        }
      }

      let infoEmbed = new Discord.MessageEmbed()
        .setURL(`https://www.roblox.com/users/${userid}/profile`)
        .setTitle(
          totalMessages === 1
            ? `${value}'s groups`
            : `${value}'s groups | Extended`
        )
        .setDescription(msg.join("\n"))
        .setThumbnail(
          `https://www.roblox.com/headshot-thumbnail/image?userId=${userid}&width=420&height=420&format=png`
        )
        .setAuthor(
          message.author.username + `#${message.author.discriminator}`,
          message.author.avatarURL()
        );
      await channel.send(infoEmbed);
      totalMessages++;
    } while (content.length > 0);
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setDescription("```diff\n" + `- ${e.message}` + "\n```")
      .setTimestamp()
      .setFooter(`Failed by ${message.author.tag} | ${message.author.id}`)
      .setAuthor(
        "Failed",
        "https://media.discordapp.net/attachments/539579135786352652/641188940983959555/627171202464743434.png"
      );

    channel.send(errembed);
  }
};
