const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `a20808`;
const db = require("quick.db");

module.exports = {
    name: "setverify",
    category: "Verification",
    description: "Set Verification Systen On Or Off!",
    usage: "Setverify <on Or Off>",
    memberpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args, text, prefix) => {

        //Start


        const Type = args[0];

        if (!Type) return message.channel.send(`Please Give Command Type - On , Off`);

        let array = ["on", "off"];

        if (!array.find(a => a === Type.toLowerCase())) return message.channel.send(`Invalid Type - On , Off`);

        const Current = await db.fetch(`VerifyOn_${message.guild.id}`);
        
        if (Current && Current.toLowerCase() === Type.toLowerCase()) return message.channel.send(`Its Already ${Current}!`);

        if (Current === null && Type.toLowerCase() === "on") return message.channel.send(`Its Already On!`);

        let Upper = Type.charAt(0).toUpperCase() + Type.slice(1);

        await db.set(`VerifyOn_${message.guild.id}`, Type.toLowerCase() === "on" ? null : Upper);

        let Embed = new MessageEmbed()
        .setColor(Color)
        .setTitle(`Success`)
        .setDescription(`Verification System Has Been ${Upper === "On" ? "Enabled" : "Disabled"} - <@${message.author.id}>`)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp();

        return message.channel.send(Embed);

        //End

    }
};