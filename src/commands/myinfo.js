const noblox = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  let channel = message.channel;

  noblox.getPlayerInfo(value).then((playerInfo) => {
    let infoEmbed = new Discord.MessageEmbed()
      .setColor(`BLUE`)
      .setTitle(`${playerInfo.username}'s account`)
      .addField(`Status`, playerInfo.status)
      .addField(`Account Age (in days)`, playerInfo.age)
      .addField(`Join Date`, playerInfo.joinDate)
      .addField(`Description`, playerInfo.blurb)
      .setThumbnail(playerInfo.avatar);

    channel.send(infoEmbed);
  });
};
