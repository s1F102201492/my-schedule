"use client";

import { createTheme } from "@mui/material/styles";

/**
 * Material UIのカスタムテーマ定義
 * アプリケーション全体の色調（プライマリーカラーなど）を設定します。
 * * 設定内容:
 * - Primary Color: 緑系 (#6fbf73)
 */
const theme = createTheme({
    palette: {
        primary: {
            main: "#6fbf73",
            light: "#ffffff",
            dark: "#205723",
            contrastText: "#000000",
        },
    },
});

export default theme;
