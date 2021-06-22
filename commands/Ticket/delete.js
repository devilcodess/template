const Discord = require("discord.js")

module.exports = {
	name: 'delete',
	category: 'Ticket',
	description: 'Delete a specified ticket.',
	    memberpermissions: ["ADMINISTRATOR"],

 run: async (client, message, args, text, prefix) => {   
  
  if(message.channel.name.includes('ticket-')) {
			message.channel.delete();
  }
		else {
      const notATicketChannel = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("You can only use this in a ticket channel")
			return message.reply(notATicketChannel);
		}
	},
};