// とりあえず自分専用

/**
 * debug用の関数
 * NOTE: doPost関数はそのままでは実行できないため、仮に設置した関数
 */
function debugFunction()
{
  var receiveMessage = "今日何しよ";

  var botMessage = generateResponseFromMessage(receiveMessage);

  console.log(botMessage);
  
}


/**
 * doPost
 */
function doPost(e) 
{
  var json = JSON.parse(e.postData.contents);
  var reply_token = json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  var userMessage = json.events[0].message.text;

  var botAnswer = generateResponseFromMessage(userMessage);

  reply(reply_token, botAnswer);
}


/**
 * myFunction
 * 送信されたメッセージを元にボットの回答を作成する一連の処理を行うメソッド
 */
function generateResponseFromMessage(receiveMessage)
{
  // settingから応答に必要なプロンプトを持ってくる
  const settingSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting");
  let model = settingSheet.getRange("B1").getValue();
  let botCharacter = settingSheet.getRange("B2").getValue();

  // ユーザーからのメッセージをスプレッドシートに書き込む
  setCellValueUserPrompt(receiveMessage);

  // メッセージを作成する
  var botAnswer = createMessage(receiveMessage, model, botCharacter);

  //　Botからのメッセージをスプレッドシートに書き込む
  setCellValueBotAnswer(botAnswer);

  return botAnswer;
}
