const Discord = require("discord.js");

module.exports = () => async (message) => {
  let embed = new Discord.MessageEmbed()
    .setColor("36393f")
    .addFields({
      name: "Help Links",
      value: `[GitHub](https://github.com/samRBLX/moblox-bot 'Documentation')
        [Support Discord](https://discord.gg/SYtrv9m 'optional hovertext')
        [Learn how to use it](https://github.com/samRBLX/moblox-bot/blob/master/README.md 'optional hovertext')`,
    })
    .setFooter("moblox by imacodr#0930")
    .setTimestamp()
    .setThumbnail(message.author.avatarURL());
  await message.author.send(embed);

  //  `jdsaoijdioajdiojsad asdoias doas doasjddo jo ${message.author}`
};
