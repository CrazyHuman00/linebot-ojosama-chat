/**
 * LINEへの返信
 */
function reply(LINE_CHANNEL_ACCESS_TOKEN, replyToken, replyMessage){
  let replyUrl = "https://api.line.me/v2/bot/message/reply";
  let contents = {
          replyToken: replyToken,
          messages: [{ type: 'text', text: replyMessage }],
  };
  let options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
    },
    payload: JSON.stringify(contents)
  };
  UrlFetchApp.fetch(replyUrl, options);
}