const Discord = require("discord.js");


module.exports = {
    name: "nuke",
    category: "Moderation",
    cooldown: 2,
  memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, user, text, prefix) => {
              if (!message.member.hasPermission("ADMINISTRATOR")){
        //You can change the Permission it requires to something else//
            return message.channel.send("You dont have the permission to use this commands!")
        }
        
        if(!message.channel.deletable) {
            return message.reply("This channel cannot be nuked bruh :/")
        }
        let newchannel = await message.channel.clone()
        await message.channel.delete()
        let nukeembed = new Discord.MessageEmbed()
        .setTitle("Channel Has Been Nuked")
        
        .setImage('https://media0.giphy.com/media/oe33xf3B50fsc/200.gif')
        //You can change this gif to something else//
        await newchannel.send(nukeembed)
    }
}