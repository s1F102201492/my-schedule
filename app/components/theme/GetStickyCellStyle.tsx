/**
 * テーブルのセルを固定表示（Sticky）するためのスタイルオブジェクトを生成するヘルパー関数
 * テーブルスクロール時にヘッダーや特定の列を固定したい場合に使用します。
 * * @param {number} width - セルの幅
 * @param {number} zIndex - 重なり順序（固定ヘッダーなどは高く設定）
 * @param {number} left - 左端からの固定位置（固定列の場合）
 * @param {string} align - テキストの配置 ('left' | 'right' | 'center' 等)
 * @returns {object} Reactのstyle属性に渡すCSSオブジェクト
 */
const GetStickyCellStyle = (
    width: number,
    zIndex: number,
    left: number,
    align: string,
) => {
    return {
        position: "sticky",
        left: left,
        background: "white",
        width: width,
        zIndex: zIndex,
        align: align,
    };
};

export default GetStickyCellStyle;
