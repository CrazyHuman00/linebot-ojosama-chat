/**
 * openAIのAPIを呼び出す関数
 */
function callAPI(createdMessage, model) {
  let requestUrl = "https://api.openai.com/v1/chat/completions";
  let headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + OPENAI_APIKEY,
  };
  let payload = {
      "model": model,
      "messages": createdMessage
  };
  let options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(payload)
  };
  // UrlFetchAppでAPIを呼び出し、レスポンスを取得
  let response = UrlFetchApp.fetch(requestUrl, options).getContentText();
  // レスポンスをJSONオブジェクトに変換
  let objResponse = JSON.parse(response);
  // choices[0]のmessage.contentを返す
  return objResponse.choices[0].message.content;
}