import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface modelPageProps {
    setModelPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Model:React.FC<modelPageProps> = ({ setModelPage }) => {
  return (
    <div>
        <Tooltip title="戻る">
            <IconButton onClick={() => setModelPage(false)}
                sx={{ ml: 2, mt: 2}}>
                <ArrowBackIcon />
            </IconButton>
        </Tooltip>
        <Box sx={{ ml: 4, mt:2 }}>
            <Typography variant='h5'>理想の自分をイメージしてみる</Typography>
            <Typography variant='subtitle1' sx={{ mt: 2}}>
                あなたが頑張っている習慣からそれらを達成した姿をイメージしてみましょう！
            </Typography>
        </Box>
        
    </div>
  )
}

export default Model