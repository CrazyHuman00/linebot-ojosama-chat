// スプレッドシートを操作するファイル

/**
 * スプレッドシートに値を書き込む関数(ユーザの入力)
 * @param {sheet} sheet - データシート
 * @param {userPrompt} userPrompt - ユーザの入力
 */
function setCellValueUserPrompt(userPrompt) 
{
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
  var data = sheet.getRange("A1:A").getValues();
  var lastRow = data.filter(String).length;
  sheet.getRange(lastRow + 1,1).setValue(userPrompt);
}


/**
 * スプレッドシートに値を書き込む関数(ボットの応答)
 * @param {sheet} sheet - データシート
 * @param {botAnswer} botAnswer - ボットの応答
 */
function setCellValueBotAnswer(botAnswer) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
  var data = sheet.getRange("B1:B").getValues();
  var lastRow = data.filter(String).length;
  sheet.getRange(lastRow + 1,2).setValue(botAnswer);
}


/**
 * 指定されたターン数になるとスプレッドシートに書かれた会話を白紙にする
 */
function forgotData() 
{
  let settingSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting");
  let dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");

  let maxNumberOfTurns = settingSheet.getRange("B3").getValue();
  let lastRow = dataSheet.getRange("B:B").getValues().filter(String).length;

  // 一番上の行を除くA2,B2からA4,B4を消す
  if (lastRow > maxNumberOfTurns)
  {
    dataSheet.getRange("A2:B6").clear();
  }
}

