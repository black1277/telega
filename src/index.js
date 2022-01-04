const { Telegraf, Markup, Scenes, session } = require('telegraf')
const oneScene = require('./scenes/one')
const twoScene = require('./scenes/two')
require('dotenv').config()
const BT = process.env.BOT_TOKEN
const PORT = process.env.PORT || 5000
const URL = process.env.URL
const bot = new Telegraf(BT)

const stage = new Scenes.Stage([oneScene, twoScene])
bot.use(session({}))
bot.use(stage.middleware())

bot.start(async (ctx) => {
  try {
    await ctx.reply('Выбирайте!', Markup.keyboard([
      ['Первый пункт'],
      ['Второй пункт', 'Третий пункт']
    ]).oneTime().resize())
  } catch(e){
    console.log(e)
  }
})

bot.hears('/one', (ctx) => ctx.reply('oneWizard'))

bot.hears('Первый пункт', (ctx) => ctx.scene.enter('oneWizard'))
bot.hears('Второй пункт', (ctx) => ctx.scene.enter('twoWizard'))

bot.hears('Третий пункт', (ctx) => ctx.reply('Вы выбрали третий пункт!'))
bot.hears('/stop', (ctx) => bot.stop('SIGINT'))

bot.help((ctx) => ctx.reply(`Send me a sticker`))
bot.on(`sticker`, (ctx) => ctx.reply(`👍`))
bot.hears(`hi`, (ctx) => ctx.reply(`Hey there`))
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