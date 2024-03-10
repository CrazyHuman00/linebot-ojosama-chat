/**
 * LINEへ返信するメソッド
 * @param {replyToken} replyToken - トークン
 * @param {replyMessage} botAnswer - botの応答
 */
function reply(replyToken, replyMessage)
{
  const LINE_CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_CHANNEL_ACCESS_TOKEN");
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