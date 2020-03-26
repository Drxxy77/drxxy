var bot = require("../bot.js").bot;
roundTo = require("../bot.js").roundTo;
msToTime = require("../bot.js").msToTime;

module.exports.commands = [{cmd: "ping", desc: "Pong!", perm: []}, {cmd: "pong", desc: "Alias to `ping`", perm: []}, {cmd: "info", desc: "Info and statistics.", perm: []}, {cmd: "about", desc: "Alias to `info`", perm: []}];
module.exports.events = [];
module.exports.actions = function (type, cmd, body, obj) {
  if (cmd == "ping" || cmd == "pong") {
    if (obj.member) {api = obj.member.guild.shard.latency.toString() + "ms";}
    else {api = "N/A";}
    obj.channel.createMessage("Pinging...")
    .then(function(res) {
      botPing = new Date() - res.timestamp;
      if (botPing < 0) {botPing = botPing * -1}
      res.edit({
        content: "Pong!",
        embed: {
          color: 0x00FF00,
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: "API Latency",
              value: api,
              inline: true
            },
            {
              name: "Message Round Trip",
              value: botPing + "ms",
              inline: true
            }
          ]
        }
      })
    })
  }
  else if (cmd == "info" || cmd == "about") {
    total = 0;
    bot.guilds.map(g => g.memberCount).forEach(a => total = total + a);
    ctotal = 0;
    bot.guilds.map(g => g.channels.size).forEach(a => ctotal = ctotal + a);
    ram = process.memoryUsage().heapUsed / 1024 / 1024;
    roundedRam = roundTo(ram, 2);
    obj.channel.createMessage({
      embed: {
        title: "About",
        description: "[Invite Me](https://discordapp.com/api/oauth2/authorize?client_id=691667156869578783&permissions=8&scope=bot)",
        fields: [
          {
            name: "Information",
            value: "This bot was made by Drxxy#3671 and he put lots of effort into me, please show him support by adding me to your server, thanks!"
          },
          {
            name: "Statistics",
            value: "**RAM Usage**: " + roundedRam.toString() + " MB\n**Uptime**: " + msToTime(process.uptime() * 1000) + "\n**Servers**: " + bot.guilds.size + "\n**Users**: " + total + " (" + bot.users.size + " cached)\n**Channels**: " + ctotal + "\n**Modules Loaded**: " + require("../bot.js").mArr.length
          }
        ]
      }
    });
  }
}
module.exports.managersOnly = false;
module.exports.name = "ping";
