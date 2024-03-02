/**
 * メッセージを作成する関数
 */
function createMessage(OPENAI_APIKEY, model, botCharacter, prompt) {
  const requestOptions = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ OPENAI_APIKEY
    },
    "payload": JSON.stringify({
      "model": model,
      "messages": [ 
        {"role": "system", "content": botCharacter},
        {"role": "user", "content": prompt}]
    })
  }
  
  return requestOptions;
}
