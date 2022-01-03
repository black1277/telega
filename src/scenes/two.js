const { Telegraf, Markup, Scenes, Composer } = require('telegraf')

const twoStep = new Composer()
twoStep.on('text', async (ctx)=>{
  try {
    ctx.wizard.state.data = {}
    ctx.wizard.state.data.userName = ctx.message.from.username
    ctx.wizard.state.data.firstName = ctx.message.from.first_name
    ctx.wizard.state.data.lastName = ctx.message.from.last_name
    await ctx.replyWithHTML('Какое <u>действие</u> выберите?')
    return ctx.wizard.next()
  } catch(e){
    console.log(e)
  }
})
const twoScene = new Scenes.WizardScene('twoWizard', twoStep)

module.exports = twoScene