const Discord = require('discord.js');
const db = require('quick.db');
const rs = require('randomstring');
module.exports = {

        name: 'panel',
        category: 'Ticket',
        description: 'Setup ticket system',
    memberpermissions: ["ADMINISTRATOR"],
    
     run: async (bot, message, args) => {
    let ticketroom = message.channel;
      let name = args[0]
            let color = args[1]
      let namee = new Discord.MessageEmbed() .setDescription(`Please Provide a panel name \n\`panel <name> <color>\``) .setColor("RED")
            if(!name) return message.channel.send(namee)
      let colorr = new Discord.MessageEmbed() .setDescription(`Please Provide a panel color \n\`panel <name> <color>\``) .setColor("RED")
            if(!color) return message.channel.send(colorr)
      let sent = await ticketroom.send(new Discord.MessageEmbed()
      .setTitle(name || "Ticket System")
      .setDescription("To create a ticket react with 📨")
      .setFooter("Ticket System")
                                       .setColor(color || "#149414")
  );    
      
    sent.react('📨');
    db.delete(`tickets_${message.guild.id}`)
    db.set(`tickets_${message.guild.id}`, sent.id)
      message.delete()
    }
}