const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `a20808`;
const db = require("quick.db");

module.exports = {
    name: "setverifychannel",
    category: "Verification",
    description: "Set Verify Channel!",
    usage: "Setverifychannel <Mention Channel>",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, text, prefix) => {

        //Start

        let On = await db.fetch(`VerifyOn_${message.guild.id}`);
        if (On && On.toLowerCase() === "off") return message.channel.send(`Please Enable Verification System!`);
        

        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);

        await db.set(`VerifyChannel_${message.guild.id}`, Channel.id);

        let Embed = new MessageEmbed()
        .setColor(Color)
        .setTitle(`Success`)
        .setDescription(`Verification Channel Has Been Setted - <#${Channel.id}>`)
        .setFooter(`Setted By ${message.author.username}`)
        .setTimestamp();

        return message.channel.send(Embed);

        //End

    }
};