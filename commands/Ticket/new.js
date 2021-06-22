const Discord = require("discord.js")

module.exports = {
	name: 'new',
	category: 'Ticket',
	description: 'Creates a new ticket.',
 run: async (client, message, args, text, prefix) => {   
   const reason = args.join(" ")
  const includeReason = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("Please enter a valid reason to open the ticket.")
      .setDescription(`Usage - \`l!new <reason>\``)
  if(!reason) return message.channel.send(includeReason)
  if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
    let mbed = new Discord.MessageEmbed()
        .setDescription(`**You already have a ticket, please close your exsisting ticket first before opening a new one!**`)
        .setColor("RED")
			return message.reply(mbed);
  }
		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
      let openEmbed = new Discord.MessageEmbed()
        .setDescription(`**${message.author.username}**, your ticket has been created! - ${channel}`)
        .setColor("#149414")
      message.reply(openEmbed);
      let thanksEmbed = new Discord.MessageEmbed()
        .setDescription(`**Hello <@${message.author.id}> our staff will be with you soon! In the meantime please describe your issue further!**`)
      .addField(`Note:`,`**- To Delete The Ticket type l!delete
      - To Get The Transcript type d!transcript**`)
      .addField(`Reason:`,`**${reason}**`)
        .setColor("#149414")
			channel.send(thanksEmbed);
			}
		);
	},
};