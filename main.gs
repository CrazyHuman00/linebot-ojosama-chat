// とりあえず自分専用
const LINE_CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_CHANNEL_ACCESS_TOKEN");
const OPENAI_APIKEY = PropertiesService.getScriptProperties().getProperty("OPEN_AI_KEY");

/**
 * debug用の関数
 * NOTE: doPost関数はそのままでは実行できないため、仮に設置した関数
 */
function debugFunction()
{
  var receiveMessage = "今日何しよ";

  myFunction(receiveMessage);
  
}

/**
 * doPost
 */
function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  var reply_token = json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  var userMessage = json.events[0].message.text;

  myFunction(userMessage)
}

/**
 * myFunction
 * 送信されたメッセージを元にボットの回答を作成する一連の処理を行うメソッド
 */
function myFunction(receiveMessage)
{
  // settingから応答に必要なプロンプトを持ってくる
  const settingSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting");
  let model = settingSheet.getRange("B1").getValue();
  let botCharacter = settingSheet.getRange("B2").getValue();

  // ユーザーからのメッセージをスプレッドシートに書き込む
  setCellValueUserPrompt(receiveMessage);

  // メッセージを作成する
  var botAnswer = createMessage(receiveMessage, model, botCharacter);
  console.log(botAnswer);

  //　Botからのメッセージをスプレッドシートに書き込む
  setCellValueBotAnswer(botAnswer);
  

  // メッセージを元に返信をする

}
