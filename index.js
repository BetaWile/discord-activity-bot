require("dotenv").config();
const { Client } = require("discord.js");
const beta = require("discord.js");
const betasettings = require("./settings.json");
const fetch = require("node-fetch");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
const fs = require("fs");
const client = new Client();

var PREFIX = betasettings.prefix;


const ACTIVITIES = {
    "poker": {
        id: "755827207812677713",
        name: "Poker Night"
    },
    "betrayal": {
        id: "773336526917861400",
        name: "Betrayal.io"
    },
    "youtube": {
        id: "755600276941176913",
        name: "YouTube"
    },
    "fishington": {
        id: "814288819477020702",
        name: "Fishington.io"
    }
};
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`Beta ❤️ Bot Club`, { type:'PLAYING' })

});


client.on("ready", () => console.log("Beta ❤️ Bot Club"));
client.on("warn", console.warn);
client.on("error", console.error);

client.on("message", async (message, guild) => {
    if (message.author.bot || !message.guild) return;
    if (message.content.indexOf(PREFIX) !== 0) return;

    const args = message.content.slice(PREFIX.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") return message.channel.send(new beta.MessageEmbed().setDescription(`Botun pingi: \`${client.ws.ping}ms\``));

    if (cmd === "davet") return message.channel.send(new beta.MessageEmbed().setFooter(client.user.username, client.user.displayAvatarURL()).setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic:true })).setTitle("Davet Linkleri Altta Belirtilmiştir <a:unlem:833495327319130114>").addField("<a:birds:817819279772614686> Botun Sahibi", `<@780891365063917572>`).addField("<a:heaven:833495378489770034> Davet Linki", `[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=833459679992610817&scope=bot&permissions=8)`).addField("<a:heaven:833495378489770034> Destek Sunucusu", `[Sunucuya Katıl](https://discord.gg/58UAMVJTSH)`).setColor("BLUE").setImage("https://cdn.discordapp.com/attachments/697145772801785876/831537189334155324/cizgi-1.gif"));

   if (cmd === "yardım") return  message.channel.send(new beta.MessageEmbed().setColor("BLUE").setFooter(client.user.username, client.user.displayAvatarURL()).setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic:true })).setDescription(`<a:birds:817819279772614686> **İşte Komutlarım; \n**-------------------------------------** \n <a:heaven:833495378489770034> ${PREFIX}oynat KanalID youtube | Youtube Üzerinden Video Oynatırsınız! \n <a:heaven:833495378489770034> ${PREFIX}oynat KanalID poker | Poker Oyunu Oynarsınız! \n <a:heaven:833495378489770034> ${PREFIX}oynat KanalID betrayal | Betrayal Oyunu Oynarsınız! \n <a:heaven:833495378489770034> ${PREFIX}oynat KanalID fishington | Fishington Oyunu Oynarsınız!**`).addField("__Botu Davet Et__", `[Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=833459679992610817&scope=bot&permissions=8)`).addField("__Destek Sunucusu__", `[Sunucuya Katıl](https://discord.gg/58UAMVJTSH)`));

     const seksizaman = moment
       .duration(client.uptime)
       .format(" D [gün], H [saat], m [dakika], s [saniye]");

    if(cmd === "istatistik") return message.channel.send(new beta.MessageEmbed().setColor(0x36393E).setImage("https://cdn.discordapp.com/attachments/697145772801785876/831537189334155324/cizgi-1.gif").setTimestamp().addField("<a:birds:817819279772614686>  **Botun Sahibi**", "<@780891365063917572>").addField(" **Gecikme süreleri**","Mesaj Gecikmesi: {ping1} ms \nBot Gecikmesi: {ping2} ms".replace("{ping1}", new Date().getTime() - message.createdTimestamp).replace("{ping2}", client.ws.ping),true).addField(" **Kullanıcılar**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true).addField(" **Sunucular**", client.guilds.cache.size.toLocaleString(), true).addField(" **Çalışma süresi**", seksizaman, true).addField(" **Kanallar**", client.channels.cache.size.toLocaleString(), true).addField(" **Discord.JS sürüm**", "v" + beta.version, true).addField(" **Node.JS sürüm**", `${process.version}`, true).addField("** Bot Davet**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8)"));




    if (cmd === "yttogether") {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel || channel.type !== "voice") return message.channel.send("Geçersiz kanal belirtildi!");
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("CREATE_INSTANT_INVITE iznine ihtiyacım var <a:unlem:833495327319130114>");

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "830427926482255902", // youtube together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (invite.error || !invite.code) return message.channel.send("YouTube Birlikte başlatılamadı!");
                message.channel.send(`**HeaveN Club** başlatılamadı** 'i Başlatmak İçin Tıklayın! ${channel.name}: <https://discord.gg/${invite.code}>`);
                //message.channel.send(`**HeaveN Club** başlatılamadı** 'i Başlatmak İçin Tıklayın! <#${channel.name}> : <https://discord.gg/${invite.code}>`);
            })
            .catch(e => {
                message.channel.send("**HeaveN Club** başlatılamadı <a:red2:798320255339855872>.");
            })
    }
   
    
    // or use this
    if (cmd === "oynat") {
        const channel = message.guild.channels.cache.get(args[0]);
        if (!channel || channel.type !== "voice") return message.channel.send(new beta.MessageEmbed().setColor("BLUE").setFooter(client.user.username, client.user.displayAvatarURL()).setTitle("Hatalı Kullanım <a:unlem:833495327319130114>").setDescription(`Doğru Kullanım İçin **${PREFIX}yardım** Yazınız.`));
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("CREATE_INSTANT_INVITE iznine ihtiyacım var <a:unlem:833495327319130114>");
        const activity = ACTIVITIES[args[1] ? args[1].toLowerCase() : null];
        if (!activity) return message.channel.send(`Doğru formatlar: \n${Object.keys(ACTIVITIES).map(m => `- **${PREFIX}activity <Channel_ID> ${m}**`).join("\n")}`);

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: activity.id,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (invite.error || !invite.code) return message.channel.send(`Başlatılamadı **${activity.name}** <a:red2:798320255339855872>.`);
                message.channel.send(new beta.MessageEmbed().setColor("BLUE").setFooter(client.user.username, client.user.displayAvatarURL()).setTitle("Başarılı <a:konfeti:833495327939624960>").addField("Başlatmak için tıkla!", `[Tıkla](<https://discord.gg/${invite.code})`).addField("Aktivite", `${activity.name}`).addField("Kanal", `<#${channel.id}>`));
                //message.channel.send(`Başlatmak İçin Buraya Tıklayın! **${activity.name}** **${channel.name}**: <https://discord.gg/${invite.code}> <a:konfeti:833495327939624960>`);
            })
            .catch(e => {
                message.channel.send(`Başlatılamadı **${activity.name}** <a:red2:798320255339855872>.`);
            })
    }
});
    

client.on('ready', ()=>{
    client.channels.cache.get('BOT_SES_KANAL_ID').join()
    console.log("Beta ❤️ Bot Club")
    })

client.on('guildDelete', guild => {
    const betaembed = new beta.MessageEmbed()
    .setColor('RED')
    .setTitle('Atıldım!')
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu Sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
    client.channels.cache.get('BOT_ATILINCA_ATICAĞI_MESAJ_KANAL_ID').send(betaembed);
});

client.on('guildCreate', guild => {
    const betaembed = new beta.MessageEmbed()
    .setColor('GREEN')
    .setTitle('Ekendim!')
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu Sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
    client.channels.cache.get('BOT_EKLENİNCE_ATICAĞI_MESAJ_KANAL_ID').send(bbetaembedeta);
});

client.login(betasettings.token) 
