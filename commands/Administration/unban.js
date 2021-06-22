const Discord = require("discord.js");

module.exports = {
    name: "unban",
    category: "Moderation",
    cooldown: 2,
     usage: "Bans the user",
      memberpermissions: ["ADMINISTRATOR"],
    description: "[name | nickname | mention | ID] <reason> (optional)",
    run: async (client, message, args, user, text, prefix) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		
	if(isNaN(args[0])) return message.channel.send("You need to provide an ID.")
    let bannedMember = await client.users.fetch(args[0])
        if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!")|
    message.delete()
    try {
        message.guild.members.unban(bannedMember, reason)
        message.channel.send(`${bannedMember.tag} has been unbanned from the guild with reason: ${reason} !`)
    } catch(e) {
        console.log(e.message)
    }

}
}