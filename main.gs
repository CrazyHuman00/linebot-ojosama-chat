// とりあえず自分専用
const LINE_CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_CHANNEL_ACCESS_TOKEN");
const OPEN_AI_KEY = PropertiesService.getScriptProperties().getProperty("OPEN_AI_KEY");

/**
 * doPost
 */
function doPost(e) {
  json = JSON.parse(e.postData.contents);

  var replyToken = json.events[0].replyToken;
  if (typeof replyToken === 'undefined') {
    return;
  }

  var receiveMessage = json.events[0].message.text;
  

  
}
