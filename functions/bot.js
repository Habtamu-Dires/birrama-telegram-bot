const { Telegraf } = require('telegraf');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;

const web_link = "https://regal-bienenstitch-f4682c.netlify.app/";

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome',{
    reply_markup:{inline_keyboard:[[{text: "Click Here", web_app: {url: web_link}}]]},
}));

bot.on('message', (ctx) => {
    const message = ctx.message;
    const data = JSON.parse(message.web_app_data.data);
    ctx.reply('Thank You. Your Order: '+ data.text);
});

bot.launch();