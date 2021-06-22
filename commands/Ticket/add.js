const Discord = require("discord.js")

module.exports = {
	name: 'add',
	category: 'Ticket',
	description: 'Adds a member to a specified ticket.',
 run: async (client, message, args, text, prefix) => {   
  if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
          const notATicketChannel = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Incorrect Usage")
          .setDescription(`Correct Usage:\`d!add <member>\``)
          .setFooter(`Ticket System`)
				return message.channel.send(notATicketChannel);
			}
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				}).then(() => {
           const added = new Discord.MessageEmbed()
        .setColor("RED")
          .setDescription(`**Successfully added ${member} to ${message.channel}**`)
				message.channel.send(added);
				});
			}
			catch(e) {
				return message.channel.send('An error occurred, please try again!');
			}
		}
	},
};