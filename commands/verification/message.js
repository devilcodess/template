const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `a20808`;
const db = require("quick.db");
const PREFIX = require("../../botconfig/config.json");
module.exports = {
    name: "setverifymessage",
    category: "Verification",

    description: "Set Verify Message!",
    usage: "Setverifymessage <Message>",
    memberpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args, text, prefix) => {

        //Start

        let On = await db.fetch(`VerifyOn_${message.guild.id}`);
        if (On && On.toLowerCase() === "off") return message.channel.send(`Please Enable Verification System!`);
        

        let Text = message.content.slice(PREFIX.length).trim().split(/ +/g);

        if (!Text[1]) return message.channel.send(`Please Give A Message!`);

        if (Text.slice(1).join(" ").length > 1500) return message.channel.send(`Too Long Message!`);

        await db.set(`VerifyMessage_${message.guild.id}`, Text.slice(1).join(" "));

        let Embed = new MessageEmbed()
        .setColor(Color)
        .setTitle(`Success`)
        .setDescription(`Verification Message Has Been Setted\n${Text.slice(1).join(" ")}`)
        .setFooter(`Setted By ${message.author.username}`)
        .setTimestamp();

        return message.channel.send(Embed);

        //End

    }
};