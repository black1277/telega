const {Telegraf, Markup, Scenes, session} = require('telegraf')
const oneScene = require('./scenes/one')
const twoScene = require('./scenes/two')
const txt = require('./help')
require('dotenv').config()
const BT = process.env.BOT_TOKEN
const PORT = process.env.PORT || 5000
const URL = process.env.URL
const bot = new Telegraf(BT)
const styckers = ['🥱', '👍', '🐙', '🌟', '🆒', '😳']
const rand = (num) => {
  return Math.floor(Math.random()*num)
}
const stage = new Scenes.Stage([oneScene, twoScene])
bot.use(session({}))
bot.use(stage.middleware())

bot.start(async (ctx) => {
  try {
    await ctx.reply('Выбирайте!', Markup.keyboard([
      ['Первый пункт'],
      ['Второй пункт', 'Третий пункт']
    ]).oneTime().resize())
  } catch (e) {
    console.log(e)
  }
})


bot.hears('Первый пункт', (ctx) => ctx.scene.enter('oneWizard'))
bot.hears('Второй пункт', (ctx) => ctx.scene.enter('twoWizard'))
bot.hears('Третий пункт', (ctx) => ctx.reply('Вы выбрали третий пункт!'))

//bot.hears('/stop', (ctx) => bot.stop('SIGINT'))

bot.help((ctx) => ctx.reply(txt.commands))
bot.on(`sticker`, (ctx) => ctx.reply(styckers[rand(6)]))
bot.hears(`hi`, (ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}!`))
bot.hears('bye', (ctx) => ctx.reply('Bye!!!'))
bot.command('env', (ctx) => {
  ctx.reply(`ENV is ${process.env.NODE_ENV}`)
})

if (process.env.NODE_ENV === 'production') {
  bot.telegram.setWebhook(`${URL}/bot${BT}`)
  bot.startWebhook(`/bot${BT}`, null, PORT)
  console.log('Started with webhook')
} else {
  bot
    .launch()
    .then((res) => console.log(`Launched at ${new Date()}`))
    .catch((err) => console.log(`ERROR at launch:`, err))
}


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))