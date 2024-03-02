// とりあえず自分専用
const LINE_CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_CHANNEL_ACCESS_TOKEN");
const OPENAI_APIKEY = PropertiesService.getScriptProperties().getProperty("OPEN_AI_KEY");

/**
 * debug用の関数
 */
function debugFunction()
{
  let settingSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting");

  let model = settingSheet.getRange("B1").getValue();
  let botCharacter = settingSheet.getRange("B2").getValue();

  console.log(model, botCharacter);
  


}

/**
 * doPost
 */
function doPost(e) {
  json = JSON.parse(e.postData.contents);

  var replyToken = json.events[0].replyToken;
  if (typeof replyToken === 'undefined') {
    return;
  }

  var userMessage = json.events[0].message.text;
  
  // ============= debug =============
  let sheetSettings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting");
  sheetSettings.getRange(4, 2).setValue(receiveMsg);
  sheetSettings.getRange(5, 2).setValue(fromLineData);
  // =================================

  let settingSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting");
  let model = settingSheet.getRange("B1").getValue();
  let botCharacter = settingSheet.getRange("B2").getValue();

  const prompt = userMessage;

  // メッセージを作成する
  requestOptions = createMessage(OPENAI_APIKEY, model, botCharacter, prompt);
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  const text = json['choices'][0]['message']['content'].trim();

  // メッセージの送信
  reply(text);
}
