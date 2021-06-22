const Discord = require("discord.js")

module.exports = {
	name: 'remove',
	category: 'Ticket',
	description: 'Removes a member to a specified ticket.',
    memberpermissions: ["ADMINISTRATOR"],

 run: async (client, message, args, text, prefix) => {   
		if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
const notATicketChannel = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Incorrect Usage")
          .setDescription(`Correct Usage:\`d!remove <member>\``)
          .setFooter(`Ticket System`)
				return message.channel.send(notATicketChannel);
			}
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: false,
					SEND_MESSAGES: false,
					ATTACH_FILES: false,
					READ_MESSAGE_HISTORY: false,
				}).then(() => {
				 const removed = new Discord.MessageEmbed()
        .setColor("RED")
          .setDescription(`**Successfully removed ${member} from ${message.channel}**`)
				message.channel.send(removed);
				});
			}
			catch(e) {
				return message.channel.send('An error occurred, please try again!');
			}
		}
	},
};