class Sheet {
  /**
   * シートに関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.sheet} sheet - 対象となるシート オブジェクト
   * @param {number} headerRows - ヘッダーの行数
   * @param {number} headerIndex - ヘッダー行のインデックス (ユニークなカラム)
   */
  constructor(sheet = SpreadsheetApp.getActiveSheet(), headerRows = 1, headerIndex = 0) {
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet = sheet;
    /** @type {number} */
    this.headerRows = headerRows;
    /** @type {number} */
    this.headerIndex = headerIndex;
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
  getDataRangeValues() {
    const dataRangeValues = this.getDataRange().getValues();
    return dataRangeValues;
  }

  /**
   * ヘッダーを取得するメソッド
   * @return {Array.<string>} ヘッダー一覧
   */
  getHeaders() {
    const headerValues = this.getHeaderValues();
    const headers = headerValues[this.headerIndex];
    return headers;
  }

  /**
   * ヘッダー部分を取得するメソッド
   * @return {Array.<Array.<string>>} ヘッダー部分
   */
  getHeaderValues() {
    const values = this.getDataRangeValues();
    const headerValues = values.filter((_, i) => i < this.headerRows);
    return headerValues;
  }

  /**
   * ヘッダー行を除いたレコード部分を取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} レコード
   */
  getDataValues() {
    const values = this.getDataRangeValues();
    const dataValues = values.filter((_, i) => i >= this.headerRows);
    return dataValues;
  }
}
