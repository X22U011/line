'use strict';

// 以下の2行のコードを追加
const Obniz = require('obniz'); 
const obniz = new Obniz('2644-2620');  //自分のobnizIDに書き換える

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: 'cb31ee43bf3a1572a156d6d76cf738d7',
    channelAccessToken: 'ovuz6jr4c+bLpqfYGbt6F0KrOZsA9mQ46LQRvBqPV6J560r0GlDyMerynLG3I88SFBAfqhlYr/YNVm5QBe5iagwx3pQowPWw5uaV5ta5SzgED+zHBvFboo+NXuzrc5if9ZlEXYCQrRyNm6aphJttyAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

    //ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
    if(req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff'){
        res.send('Hello LINE BOT!(POST)');
        console.log('疎通確認用');
        return; 
    }

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
  }
  
  obniz.display.clear(); //この行を追加
  obniz.display.print(`${event.message.text} \n`); //この行を追加
  
  return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text+"!" //実際に返信の言葉を入れる箇所
  });
  }
app.listen(PORT);
console.log(`Server running at ${PORT}`);