/**
 * メッセージ部分を作成する
 */
function createMessage(sheet, botCharacter) {
  let message = [{"role": "system", "content": botCharacter }];

  // メッセージ部分を作成
  
  message.push({
      "role": "user",
      "content": sheet.getRangeValues()
    });
  console.log(message);
  // 作成したメッセージ(配列)を返す
  return message;
}
