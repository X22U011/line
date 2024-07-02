'use strict';

const line = require('@line/bot-sdk');

const config = {
    channelSecret: 'cb31ee43bf3a1572a156d6d76cf738d7',
    channelAccessToken: 'ovuz6jr4c+bLpqfYGbt6F0KrOZsA9mQ46LQRvBqPV6J560r0GlDyMerynLG3I88SFBAfqhlYr/YNVm5QBe5iagwx3pQowPWw5uaV5ta5SzgED+zHBvFboo+NXuzrc5if9ZlEXYCQrRyNm6aphJttyAdB04t89/1O/w1cDnyilFU='
};
const client = new line.Client(config);


const main = async () => {

    const messages = [{
        type: 'text',
        text: 'いっせい送信です！'
    }];

    try {
        const res = await client.broadcast(messages);
        console.log(res);        
    } catch (error) {
        console.log(`エラー: ${error.statusMessage}`);
        console.log(error.originalError.response.data);
    }
}

main();