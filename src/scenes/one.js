const { Telegraf, Markup, Scenes, Composer } = require('telegraf')

const oneStep = new Composer()
oneStep.on('text', async (ctx)=>{
  try {
    ctx.wizard.state.data = {}
    ctx.wizard.state.data.userName = ctx.message.from.username
    ctx.wizard.state.data.firstName = ctx.message.from.first_name
    ctx.wizard.state.data.lastName = ctx.message.from.last_name
    await ctx.replyWithHTML('Какое <b>действие</b> выберите?')
    return ctx.wizard.next()
  } catch(e){
    console.log(e)
  }
})
const oneScene = new Scenes.WizardScene('oneWizard', oneStep)

module.exports = oneScene