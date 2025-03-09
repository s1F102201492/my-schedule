import { Box, Typography } from '@mui/material';
import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

interface loadingType {
    loading: boolean;
}

const Loader: React.FC<loadingType> = ({ loading }) => {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // 縦方向に配置
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // 画面全体を占める
                }}>
                <Typography
                    sx={{
                        mb: 2, // 下に余白を追加
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#357a38',
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

export default Loader;
