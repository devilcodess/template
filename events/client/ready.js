const config = require("../../botconfig/config.json")
module.exports = client => {
  try{
    const stringlength = 69;
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
  }catch{ /* */ }

  try{
    client.user.setActivity(`l!help | ${client.guilds.cache.size.toLocaleString()} Servers | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users | ${client.channels.cache.size} Channels`, { type: "LISTENING" } , {status: "idle"});
  }catch (e) {
      console.log(String(e.stack).red);
  }
  //Change status each 10 minutes
  setInterval(()=>{
    try{
    client.user.setActivity(`l!help | ${client.guilds.cache.size.toLocaleString()} Servers | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users | ${client.channels.cache.size} Channels`, { type: "LISTENING" } , {status: "idle"});
    }catch (e) {
        console.log(String(e.stack).red);
    }
  }, 10*60*1000)
}