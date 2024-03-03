/**
 * メッセージ部分を作成する
 */
function createMessage(botCharacter) {
  // スプレッドシートの読み込み
  const dataSheet = new Sheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data"));

  // 最終行数の取得
  let lastRow = sheetData.getRange("B:B").getValues().filter(String).length;

  // プロンプト・応答を格納する配列
  let arrMessage = [];  
  
  // 行数分だけ要素を配列に追加する
  for (let i = 1; i <= lastRow; i++) {
    // セルの選択
    let rangeData = sheetData.getRange("B" + i);
    // セルの値を取得する
    let cellVal = rangeData.getValue();
    // 配列の末尾に要素を追加
    arrMessage.push(cellVal);
  }

  // message配列 1項目めはsystemメッセージ(キャラクター設定)
  let message = [{"role": "system", "content": botCharacter }];

  // メッセージ部分を作成
  for (let i = 0; i < arrMessage.length; i++) {
    // 奇数行の場合は、roleを"assistant"に設定し、それ以外の場合は、"user"に設定する
    let role = (i % 2 === 1) ? "assistant" : "user";
    // message配列に新しいオブジェクトを追加する
    message.push({
      "role": role,
      "content": arrMessage[i]
    });
  }
  console.log(message);
  // 作成したメッセージ(配列)を返す
  return message;
}
