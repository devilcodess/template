const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `a20808`;
const db = require("quick.db");

module.exports = {
    name: "setverifyrole",
    category: "Verification",
    description: "Set Verify Role!",
    usage: "Setverifyrole <Mention Role>",
    memberpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args, text, prefix) => {

        //Start

        let On = await db.fetch(`VerifyOn_${message.guild.id}`);
        if (On && On.toLowerCase() === "off") return message.channel.send(`Please Enable Verification System!`);


        let Role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        if (!Role) return message.channel.send(`Please Mention A Valid Role!`);

        await db.set(`VerifyRole_${message.guild.id}`, Role.id);

        let Embed = new MessageEmbed()
        .setColor(Color)
        .setTitle(`Success`)
        .setDescription(`Verification Role Has Been Setted - <@&${Role.id}>`)
        .setFooter(`Setted By ${message.author.username}`)
        .setTimestamp();

        return message.channel.send(Embed);

        //End

    }
};