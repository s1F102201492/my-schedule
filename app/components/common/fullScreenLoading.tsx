// FullScreenLoading.tsx
import { Modal, Box, CircularProgress, Typography } from "@mui/material";
import { FullScreenLoadingProps } from "../../Models/models";

/**
 * 全画面を覆うモーダル形式のローディングコンポーネント
 * 画面操作をブロックし、重要な処理（送信中など）の進行中であることを示します。
 * ESCキーでのクローズを無効化しています。
 * * @component
 * @param {FullScreenLoadingProps} props - モーダルの表示状態(open)
 */
export default function FullScreenLoading({ open }: FullScreenLoadingProps) {
    return (
        <Modal
            open={open}
            aria-labelledby='global-loading'
            aria-busy={open}
            disableEscapeKeyDown // ESCで閉じられないように
            slotProps={{
                backdrop: {
                    sx: {
                        // 前面に出す＆文字色を白に（Spinnerにinheritさせる）
                        zIndex: (theme) => theme.zIndex.modal + 1,
                    },
                },
            }}>
            <Box
                sx={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 1.5,
                    color: "#fff",
                    outline: 0,
                }}>
                <CircularProgress
                    size={48}
                    thickness={4}
                />
                <Typography
                    id='global-loading'
                    aria-live='polite'>
                    処理中です...
                </Typography>
            </Box>
        </Modal>
    );
}
