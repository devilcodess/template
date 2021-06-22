const db = require("quick.db");
const Discord = require('discord.js');

module.exports = client => {
  console.log(` :: ⬜️ loaded verification module` )
client.on("guildMemberAdd", async member => {
  let VerifyChannel = await db.fetch(`VerifyChannel_${member.guild.id}`);
  if (!VerifyChannel || !member.guild.channels.cache.get(VerifyChannel)) return;
  let VerifyRole = await db.fetch(`VerifyRole_${member.guild.id}`);
  if (!VerifyRole) return;
  let VerifyMessage = await db.fetch(`VerifyMessage_${member.guild.id}`);
  if (!VerifyMessage) return;

  let Code = "";
  let Codes = "";
  for (let i = 0; i < 7; i++) {
    Codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    Code += Codes.charAt(Math.floor(Math.random() * Codes.length));
  }

  if (!VerifyMessage.toLowerCase().includes("<code>"))
    VerifyMessage = VerifyMessage + `\n\nCode: <code>`;

  VerifyMessage = VerifyMessage.toString()
    .toLowerCase()
    .replace("<code>", Code)
    .replace("<servername>", member.guild.name)
    .replace("<role>", `<@&${VerifyRole}>`)
    .replace("<channel>", `<#${VerifyChannel}>`);

  let Embeded = new Discord.MessageEmbed()
    .setColor(`#a20808`)
    .setTitle(`Verification!`)
    .setDescription(VerifyMessage)
    .setFooter("You have 5 minutes to write the code")
    .setTimestamp();

  const Channel = member.guild.channels.cache.get(VerifyChannel);

  await Channel.send(Embeded);

  let Array = [];

  const filter = m => m.author.id === member.user.id;
  const collector = Channel.createMessageCollector(filter, { time: 300000 });
  collector.on("collect", async m => {
    if (!Array[0]) {
      if (m.content !== Code) return Channel.send(`Wrong Code, Try Again`);
    }
    if (m.content === Code) {
      await Array.push("1");
      return Channel.send(`Congo, You Are Now Verified`).then(() =>
        member.roles.add([VerifyRole])
      );
    }
  });
  collector.on("end", async msgs => {
    if (Array[0]) return;
    Array = [];
    const sembed2 = new Discord.MessageEmbed()
      .setColor(`#a20808`)
      .setDescription(
        `**Hello, You Have Been Kicked From ${member.guild.name} for faling the verification**`
      )
      .setFooter(member.guild.name, member.guild.iconURL());
    member.send(sembed2);
    try {
      await member.kick({ reason: "failed the verification!" });
    } catch (error) {
      return Channel.send(`Failed To Kick Member!`);
    }
  });
})
};