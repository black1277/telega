const { Telegraf, Markup, Scenes, session } = require('telegraf')
const oneScene = require('./scenes/one')
const twoScene = require('./scenes/two')
require('dotenv').config()
const BT = process.env.BOT_TOKEN
const bot = new Telegraf(BT)

const stage = new Scenes.Stage([oneScene, twoScene])
bot.use(session({}))
bot.use(stage.middleware())


bot.hears('/one', (ctx) => ctx.reply('oneWizard'))

bot.hears('Первый пункт', (ctx) => ctx.scene.enter('oneWizard'))
bot.hears('Второй пункт', (ctx) => ctx.scene.enter('twoWizard'))

bot.hears('Третий пункт', (ctx) => ctx.reply('Вы выбрали третий пункт!'))
bot.hears('/stop', (ctx) => bot.stop('SIGINT'))

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

bot.launch()