/**
 * Dateオブジェクトを 'YYYY-MM-DD' 形式の文字列に変換する関数
 * * @param {Date} date - 変換するDateオブジェクト
 * @returns {string} 'YYYY-MM-DD' 形式の日付文字列
 * * @example
 * const date = new Date("2023/01/01");
 * const str = ChangeHyphenDay(date); // "2023-01-01"
 */
export const ChangeHyphenDay = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
