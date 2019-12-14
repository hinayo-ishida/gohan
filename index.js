
const express = require('express')
const bodyParser = require("body-parser")
const request = require("request")
const _ = require("lodash")
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('ドーナツ'))
// app.get('/hinayo', (req, res) => res.send('ひなよ'))
const accessToken = "fkfYtqgF9joQ/UoZ/W2viyvbD5dhpoPP9JjPCsaUFgpzxQ++dTiTwfTCMa9+YMVgq5p8YTfHv55nqDDqNj4/WoXCbe19mmmiulKscqYDNDnceirhMttk0SmAoQ210LBJh6No4s0hRM6i2SIhz/tnDwdB04t89/1O/w1cDnyilFU="

// app.get('/', (req, res) => res.send('ミスド'))
// app.get('/ishida', (req, res) => res.send('ひなよ')

app.post("/", (req, res) =>{
    const msg = req.body.events[0].message.text
    const replyToken = req.body.events[0].replyToken

    let replyMsg = "よくわかりません"
    let url = "https://media.giphy.com/media/3o6UBil4zn1Tt03PI4/giphy.gif"

    if (_.includes(msg, "川越")){
        replyMsg = "うなぎ"
        url = "https://ponpoko.gorp.jp/"
    } else if (_.includes(msg, "博多")){
        replyMsg = "めんたいこ"
        url = "https://www.kanefuku.co.jp/"
    } else if (_.includes(msg, "大阪")){
        replyMsg = "お好み焼き"
        url = "http://www.chibo.com/"
    } else if (_.includes(msg, "hogehoge")){
    replyMsg = "hogehoge"
    url = "http://www.chibo.com/"
}else if (_.includes(msg, "hogehoge2")){
    replyMsg = "hogehoge2"
    url = "http://www.chibo.com/"
}


    // console.log(msg)

    request({
        method: "POST",
        uri: "https://api.line.me/v2/bot/message/reply",
        body: {
            replyToken: replyToken,
            messages: [{
                type: "text",
                text: replyMsg
            }, {
                type: "text",
                text: url
            }]
        },
        auth: {
            bearer: accessToken
        },
        json: true
    })

    res.sendStatus(200)
})

app.listen(PORT, () => console.log('Example app listening on port 3000!'))
