require('dotenv').config();
const { Telegraf } = require('telegraf');
const serverless = require('serverless-http');

const BOT_TOKEN = process.env.BOT_TOKEN;

const web_link = "https://asbeza-order-webapp-telegram.netlify.app/";

const bot = new Telegraf(BOT_TOKEN);

const webhookUrl = 'https://birrama-telegram-bot-server.netlify.app/';

bot.telegram.setWebhook(webhookUrl);

bot.start((ctx) => ctx.reply('Welcome',{
    reply_markup:{inline_keyboard:[[{text: "Click Here", web_app: {url: web_link}}]]},
})); 

bot.on('message', async (ctx) => {
    try {
        const message = ctx.message;
        const data = JSON.parse(message.web_app_data.data);
        await ctx.reply('Thank you. Your Order: ' + data.text);
    } catch (err) {
        console.error(err);
        await ctx.reply('Oops, something went wrong!');
    }
}); 

module.exports.handler = serverless(bot.webhookCallback());
