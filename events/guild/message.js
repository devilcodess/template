const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { escapeRegex } = require("../../handlers/functions"); //Loading all needed functions
//here the event starts
module.exports = async (client, message) => {
  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild) return;
    // if the message  author is a bot, return aka ignore the inputs
    if (message.author.bot) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    //get the current prefix from the botconfig/config.json
    let prefix = config.prefix;
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift().toLowerCase();
    //if no cmd added return error
    
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command) {
       try {
        //try to delete the message of the user who ran the cmd

        //if Command has specific permission return error
        if (
          command.memberpermissions &&
          !message.member.hasPermission(command.memberpermissions)
        ) {
                      message.react("❌")
          return message.channel
            .send(
              new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle("❌ Error | You are not allowed to run this command!")
                .setDescription(
                  `You need these Permissions: \`${command.memberpermissions.join(
                    "`, ``"
                  )}\``
                )
            )
            .then(msg =>
              msg
                .delete({ timeout: 5000 })
                .catch(e => console.log("Couldn't Delete --> Ignore".gray))
            );
        }
        //run the command with the parameters:  client, message, args, user, text, prefix,
        command.run(
          client,
          message,
          args,
          message.member,
          args.join(" "),
          prefix
        );
      } catch (e) {
        console.log(String(e.stack).red);
                              message.react("❌")
        return message.channel
          .send(
            new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(
                "❌ Something went wrong while, running the: `" +
                  command.name +
                  "` command"
              )
              .setDescription(`\`\`\`${e.message}\`\`\``)
          )
          .then(msg =>
            msg
              .delete({ timeout: 5000 })
              .catch(e => console.log("Couldn't Delete --> Ignore".gray))
          );
      }
    } //if the command is not found send an info msg
    else
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle(`Error`)
            .setDescription(
              `❌ Invalid command, type \`${prefix}help\` to get list of commands`
            )
        )
        .then(msg =>
          msg
            .delete({ timeout: 5000 })
            .catch(e => console.log("Couldn't Delete --> Ignore".gray))
        );
  } catch (e) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`❌ ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
    );
  }
};
