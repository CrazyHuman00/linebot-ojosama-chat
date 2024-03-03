class Sheet 
{
  /**
   * シートに関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.sheet} sheet - 対象となるシート オブジェクト
   * @param {number} headerRows - ヘッダーの行数
   * @param {number} headerIndex - ヘッダー行のインデックス (ユニークなカラム)
   */
  constructor(sheet = SpreadsheetApp.getActiveSheet()) 
  {
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet = sheet;
  }

  /**
   * Class Sheet から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/spreadsheet/sheet
   */
  getDataRange() { return this.sheet.getDataRange(); }

  /**
   * シートの値すべて取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} シートの値
   */
  getDataRangeValues() 
  {
    const dataRangeValues = this.getDataRange().getValues();
    return dataRangeValues;
  }

  getRangeValues(range) 
  {
    return this.sheet.getRange(range).getValue();
  }

  setRangeValues(range, value) 
  {
    return this.sheet.getRange(range).setValue(value);
  }
  
}
