const db = require("quick.db");
const Discord = require('discord.js');

module.exports = client => {
  console.log(` :: ⬜️ loaded ticket module` )
    client.on('messageReactionAdd', async (reaction, user) => {
       if(user.partial) await user.fetch();
       if(reaction.partial) await reaction.fetch();
       if(reaction.message.partial) await reaction.message.fetch();
     
       if (user.bot) return;
        let ticketid = await db.get(`tickets_${reaction.message.guild.id}`);
  if(!ticketid) return;
       if(reaction.message.id == ticketid && reaction.emoji.name == '📨') {
         db.add(`ticketnumber_${reaction.message.guild.id}`, 1)
         let ticketnumber = await db.get(`ticketnumber_${reaction.message.guild.id}`)
         if (ticketnumber === null) ticketnumber = "1"
         reaction.users.remove(user);
      
           reaction.message.guild.channels.create(`ticket-${ticketnumber}`, { 
               permissionOverwrites: [
                   {
                       id: user.id,
                       allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                   },
                   {
                       id: reaction.message.guild.roles.everyone,
                       deny: ["VIEW_CHANNEL"]
                   }
               ],
               type: 'text'
           }).then(async channel => {
             let data = {
               channelid: channel.id
             }
             db.push(`tickets`, data)

             channel.send(`<@${user.id}>`).then(log => {db.set(`mention_${channel.id}`, log.id)})
             db.set(`ticketauthor_${channel.id}`, user.id)
let icon = reaction.message.guild.iconURL()
             let ticketmsg = await channel.send(new Discord.MessageEmbed()
                                                .setTitle(`New Ticket`)
             .setDescription(`**Hello <@${user.id}> our staff will be with you soon! In the meantime please describe your issue further!**`) 
                                                .addField(`**Note:**`,`**- To delete the ticket react with ⛔
- To get the transcript of ticket react with 📰 **`)
             .setFooter("Ticket System")
             .setColor("#149414")
             .setTimestamp()
               );    
     
                 ticketmsg.react('⛔')
                              ticketmsg.react('📰')
                 console.log(`${ticketmsg.id}`)
                 db.set(`closeticket_${channel.id}`, ticketmsg.id)
                  db.set(`ticketauthor_${channel.id}`, user.id)
           })
       }
     });



   client.on('messageReactionAdd', async (reaction, user) => {
             if(user.partial) await user.fetch();
       if(reaction.partial) await reaction.fetch();
       if(reaction.message.partial) await reaction.message.fetch();
     
       if (user.bot) return;
       let ticketid = await db.get(`closeticket_${reaction.message.channel.id}`);
       if(!ticketid) return;
     if(reaction.message.id == ticketid && reaction.emoji.name == '⛔') {
let embed = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`**Ticket Will Be Deleted After 5 Seconds**`)
.setTimestamp()
reaction.message.channel.send(embed)
db.delete(`closeticket_${reaction.message.channel.id}`)
db.delete(`closedoptions_${reaction.message.channel.id}`)
db.delete(`mention_${reaction.message.channel.id}`)
db.delete(`ticketauthor_${reaction.message.channel.id}`)
setTimeout(function(){ 

             reaction.message.channel.delete()
           }, 5000); 
       }
   });


const sourcebin = require('sourcebin_js');

   client.on('messageReactionAdd', async (reaction, user) => {
               if(user.partial) await user.fetch();
       if(reaction.partial) await reaction.fetch();
       if(reaction.message.partial) await reaction.message.fetch();
     
       if (user.bot) return;
       let ticketid = await db.get(`closeticket_${reaction.message.channel.id}`);
       if(!ticketid) return;
      if(reaction.message.id == ticketid && reaction.emoji.name == '📰') {
    const channel = reaction.message.channel;
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
						return reaction.message.channel.send('An error occurred, please try again!');
					}
    
					const embed = new Discord.MessageEmbed()
          .setTitle("Transcript")
						.setDescription(`[Click Here](${response.url}) to see your transcript`)
          .setFooter("Ticket System")
						.setColor('#149414');
					reaction.message.reply(embed);
          reaction.users.remove(user)
				})}})
}