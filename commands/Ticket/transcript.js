const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'transcript',
	category: 'Ticket',
	description: 'Trascripts a specified ticket.',

 run: async (client, message, args, text, prefix) => {   
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if (channel.name.includes('ticket-')) {
			if (message.member.hasPermission('ADMINISTRATOR') || channel.name === `ticket-${message.author.id}`) {
				channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: ' ',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Chat transcript for ${channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('An error occurred, please try again!');
					}

					const embed = new MessageEmbed()
          .setTitle("Transcript")
						.setDescription(`[Click Here](${response.url}) to see your transcript`)
          .setFooter("Ticket System")
						.setColor('#149414');
					message.reply(embed);
				});
			}
		}
		else {
			return message.reply(
				'You cannot use this command here. Please use this command in a open ticket.',
			);
		}
	},
};