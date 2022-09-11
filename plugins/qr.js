const {Function,isPublic} = require("../lib/");
const jimp = require('jimp')
const QRReader = require('qrcode-reader')
Function({pattern: 'qr ?(.*)', fromMe: isPublic, desc: 'qr code reader', type: 'plugin'}, async (message, match, client) => {
if (!message.reply_message || !message.reply_message.image)
return await message.reply("_Reply to a  qr image_")
const { bitmap } = await jimp.read(await message.reply_message.downloadAndSaveMedia())
const qr = new QRReader()
qr.callback = (err, value) =>
message.reply(err ?? value.result)
qr.decode(bitmap)
})
Function({pattern: 'gqr ?(.*)', fromMe: isPublic, desc: 'text to qr code', type: 'converter'}, async (message, match, client) => {
match = match || message.reply_message.text
if (!match) return await message.reply("_eg .gqr Hermit_")
await message.client.sendFromUrl(message.chat,`https://h-e-r-m-i-t-web.herokuapp.com/qrcode?text=${encodeURI(match)}`)
});