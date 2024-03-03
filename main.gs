// とりあえず自分専用
const LINE_CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_CHANNEL_ACCESS_TOKEN");
const OPENAI_APIKEY = PropertiesService.getScriptProperties().getProperty("OPEN_AI_KEY");

/**
 * debug用の関数
 * NOTE: doPost関数はそのままでは実行できないため、仮に設置した関数
 */
function debugFunction()
{
  let settingSheet = new Sheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting"));
  let model = settingSheet.getRangeValues("B1");
  let botCharacter = settingSheet.getRangeValues("B2");

  console.log(model, botCharacter);
  
}

/**
 * doPost
 */
function doPost(e) {
  let fromLineData = e.postData.contents;
  let receiveData = JSON.parse(fromLineData);
  let receiveMessage = receiveData.events[0].message.text;
  let replyToken = receiveData.events[0].replyToken;

  // modelとcharacterを読み込み、スプレッドシートに値を書き込む
  // let replyMessage = myFunction(receiveMessage);

  // reply関数を呼ぶ
  // reply(replyToken, replyMessage);

  // forgotData関数を呼ぶ
  // forgotData();

  // ==================================
  // modelとcharacterを読み込み、スプレッドシートに値を書き込む
  const settingSheet = new Sheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting"));
  let model = settingSheet.getRangeValues("B1");
  let botCharacter = settingSheet.getRangeValues("B2");

  // ユーザーからのメッセージをスプレッドシートに書き込む
  setCellValueUserPrompt(receiveMessage);

  // メッセージを作成する
  var createdMessage = createMessage(botCharacter);

  // メッセージを元に返信をする

  

}


function myFunction(receiveMessage) {
  // setCellValueUserPrompt関数を呼び出す
  setCellValueUserPrompt(receiveMessage);

  // fncCreateMessage関数を呼び出す
  let createdMessage = fncCreateMessage(botCharacter);

  // fncCallApi関数を呼び出す
  let botAnswer = callAPI(createdMessage, model);

  // setCellValue関数を呼び出す
  setCellValue(botAnswer);

  console.log(botAnswer);
  return(botAnswer);
}