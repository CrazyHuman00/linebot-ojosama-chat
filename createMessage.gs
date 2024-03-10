// メッセージを作成するファイル

/**
 * メッセージ部分を作成する
 */
function createMessage(userMessage, model, botCharacter) {
  let dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
  let message = [{"role": "system", "content": botCharacter }];

  // メッセージ部分を作成
  
  message.push({
    "role": "user",
    "content": userMessage
  });

  // 作成したメッセージ(配列)を返す
  botMessage = callAPI(message, model);
  
  return botMessage;
}

/**
 * openAIのAPIを呼び出す関数
 */
function callAPI(botMessage, model) 
{
  const OPENAI_APIKEY = PropertiesService.getScriptProperties().getProperty("OPEN_AI_KEY");
  console.log(OPENAI_APIKEY);
  console.log(model);
  console.log(botMessage);
  let requestUrl = "https://api.openai.com/v1/chat/completions";
  let headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + OPENAI_APIKEY,
  };
  let payload = {
      "model": model,
      "messages": botMessage
  };
  let options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(payload)
  };
  console.log(options);
  let response = UrlFetchApp.fetch(requestUrl, options).getContentText();
  let objResponse = JSON.parse(response);
  return objResponse.choices[0].message.content;
}