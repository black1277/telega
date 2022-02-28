const { Telegraf, Markup, Scenes, Composer } = require('telegraf')

const oneStep = new Composer()
oneStep.on('text', async (ctx)=>{
  try {
    ctx.wizard.state.data = {}
    ctx.wizard.state.data.userName = ctx.message.from.username
    ctx.wizard.state.data.firstName = ctx.message.from.first_name
    ctx.wizard.state.data.lastName = ctx.message.from.last_name
    await ctx.replyWithHTML('Какое второе <b>действие</b> выберите?', Markup.inlineKeyboard([
      [Markup.button.callback('UP', 'up'), Markup.button.callback('DOWN', 'down')]
    ]))
    return ctx.wizard.next()
  } catch(e){
    console.log(e)
  }
})

const twoStep = new Composer()
twoStep.on('text', async (ctx)=>{
  try {
    ctx.wizard.state.data.action = ctx.message.text
    await ctx.replyWithHTML('Title! Укажите следущее второе <i>действие</i>?')
    return ctx.wizard.next()
  } catch(e){
    console.log(e)
  }
})
twoStep.action("up", async (ctx) => {
  try {
    await ctx.answerCbQuery()
    ctx.wizard.state.data.action = "Вверх!"
    await ctx.replyWithHTML('Вверх! Укажите еще одно <i>действие</i>!')
    return ctx.wizard.next()
  } catch (e) {
    console.log(e)
  }
})
twoStep.action("down", async (ctx) => {
  try {
    await ctx.answerCbQuery()
    ctx.wizard.state.data.action = "Вниз!"
    await ctx.replyWithHTML('Вниз! Укажите еще одно <i>действие</i>!')
    return ctx.wizard.next()
  } catch (e) {
    console.log(e)
  }
})

const lastStep = new Composer()
lastStep.on('text', async (ctx)=>{
  try {
    ctx.wizard.state.data.twotext = ctx.message.text
    const wizData = ctx.wizard.state.data
    await ctx.replyWithHTML(`Вы указали <b>${wizData.action}</b> и <b>${wizData.twotext}</b>, 
<b>${wizData.userName || 'Nonickname'}</b>, <b>${wizData.firstName || 'John'}</b>, <b>${wizData.lastName || 'Dow'}</b>,`)
    await ctx.replyWithHTML(`Все действия завершены !!! ${wizData.action}`)
    return ctx.scene.leave()
  } catch(e){
    console.log(e)
  }
})
const twoScene = new Scenes.WizardScene('twoWizard', oneStep, twoStep, lastStep)

module.exports = twoScene