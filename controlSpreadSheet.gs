// スプレッドシートを操作するファイル

/**
 * スプレッドシートに値を書き込む関数(ユーザーの入力)
 */
function setCellValueUserPrompt(userPrompt) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
  let columnB = sheet.getRange("B:B").getValues();
  for (let i = 0; i < columnB.length; i += 2) {
    if (columnB[i][0] == "") {
      sheet.getRange(i + 1, 2).setValue(userPrompt);
      break;
    }
  }
}

/**
 * スプレッドシートに値を書き込む関数(ボットの応答)
 */
function setCellValue(botAnswer) {
  // 現在アクティブなシートを取得する
  let sheet = SpreadsheetApp.getActiveSheet();
  // 最終行数を取得する
  let lastRow = sheet.getLastRow();
  // 2列目の範囲オブジェクトを取得する
  let range = sheet.getRange(2, 2, lastRow, 1);
  // 2列目の値を取得する
  let values = range.getValues();

  // 2列目の値を順番に処理する
  for (let i = 0; i < values.length; i++) {
    // 空セルかどうかを判断する
    if (values[i][0] === "") {
      // 奇数行かどうかを判断する
      if ((i + 2) % 2 === 1) {
        // 繰り返し処理をスキップする
        continue;
      }
      // 空セルの範囲オブジェクトを取得する
      let cell = sheet.getRange(i + 2, 2);
      // セルに値を代入する
      cell.setValue(botAnswer);
      // 繰り返し処理を終了する
      break;
    }
  }
}

/**
 * 設定した最大ターン数に応じて、スプレッドシートの値を上に詰める
 */
function forgotData() {
  // シートの取得
  let sheetSettings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  // 設定された最大ターン数を取得
  let maxNumberOfTurns = sheetSettings.getRange("B3").getValue();
  // シートの取得
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  // 最終行数の取得
  let lastRow = sheet.getRange("B:B").getValues().filter(String).length;
  
  // 最大ターンを超える場合
  if (lastRow > maxNumberOfTurns * 2) {
    for (let i = 3; i <= lastRow; i++) {
      let value = sheet.getRange(i, 2).getValue();
      sheet.getRange(i - 2, 2).setValue(value);
    }
    // 指定行数以上の値を削除
    sheet.getRange(maxNumberOfTurns * 2 + 1, 2, 2, 1).clearContent();
  }
}