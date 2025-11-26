import { Box, Typography } from "@mui/material";
import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { LoadingModel } from "../../Models/models";

/**
 * フェードアニメーションを使用するローディングコンポーネント
 * 主にコンテンツの読み込み待ちなど、画面の一部または全体を占有して表示する場合に使用します。
 * * @component
 * @param {LoadingModel} props - ローディング表示フラグ(loading)
 */
const FadeLoading: React.FC<LoadingModel> = ({ loading }) => {
    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column", // 縦方向に配置
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh", // 画面全体を占める
                }}>
                <Typography
                    sx={{
                        mb: 2, // 下に余白を追加
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#357a38",
                    }}>
                    処理中...
                </Typography>
                <FadeLoader
                    color='#6fbf73'
                    loading={loading}
                />
            </Box>
        </div>
    );
};

export default FadeLoading;
