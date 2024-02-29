/**
 * メッセージを作成する関数
 */
function createMessage() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let settingSheet = spreadsheet.getSheetByName("Setting");
  let modelSetting = settingSheet.getRange("B1").getValue();
  let characterSettings = settingSheet.getRange("B2").getValue();
  
}
