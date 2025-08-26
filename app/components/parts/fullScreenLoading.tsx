// FullScreenLoading.tsx
import { Modal, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
    open: boolean;
}

export default function FullScreenLoading({ open }: Props) {
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
