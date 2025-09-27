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

interface rewardProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RewardDialog: React.FC<rewardProps> = ({ open, setOpen }) => {
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
                            height: {xs: "80px", md: "200px"}, // 画面全体の高さ
                            width: {xs: "280px", md: "520px"} // 画面全体の幅
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
