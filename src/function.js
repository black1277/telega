/**
 * Функция для отправки сообщения ботом
 * @param {String} id_btn Идентификатор кнопки для обработки
 * @param {String} text Текстовое сообщение для отправки
 * @param {String} src_img Путь к изображению, или false чтобы отправить только текст
 * @param {Boolean} preview Блокировать превью у ссылок или нет, true - блокировать, false - нет
 */
function addActionBot(id_btn,  text, src_img='', preview=true) {
  bot.action(id_btn, async (ctx) => {
    try {
      await ctx.answerCbQuery()
      if (src_img !== false) {
        await ctx.replyWithPhoto({
          source: src_img
        })
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: preview
      })
    } catch (e) {
      console.error(e)
    }
  })
}
// addActionBot('btn_1', my_const.text1, './img/1.jpg', true)
module.exports = addActionBot