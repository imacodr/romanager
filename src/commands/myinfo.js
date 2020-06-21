const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = () => async (message, value) => {
  let channel = message.channel;
  const userid = await nbx.getIdFromUsername(value);

  await nbx.getPlayerInfo(userid).then((playerInfo) => {
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
