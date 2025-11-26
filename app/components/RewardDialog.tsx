import medalAnimation from "@/public/animations/Animation - 1742351524507.json";
import Lottie from "lottie-react";
import {
    Box,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React from "react";
import { DialogProps } from "../Models/models";

/**
 * タスク全完了時に表示されるお祝いダイアログコンポーネント
 * Lottieアニメーション（メダル）を使用して視覚的なリワードを提供します。
 * * @component
 * @param {DialogProps} props - ダイアログの開閉状態(open)と状態変更関数(setOpen)
 */
const RewardDialog: React.FC<DialogProps> = ({ open, setOpen }) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center", // 水平方向中央
                            height: {xs: "80px", sm: "200px"}, // 画面全体の高さ
                            width: {xs: "280px", sm: "520px"} // 画面全体の幅
                        }}>
                        <Lottie
                            animationData={medalAnimation}
                            loop={false}
                        />
                    </Box>
                    <DialogTitle
                        sx={{ display: "flex", justifyContent: "center" }}>
                        おめでとうございます！
                    </DialogTitle>
                    <DialogContentText
                        sx={{ display: "flex", justifyContent: "center" }}>
                        今日のタスクが全て終了しました！
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RewardDialog;
