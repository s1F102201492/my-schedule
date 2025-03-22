import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface modelPageProps {
    setModelPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Model:React.FC<modelPageProps> = ({ setModelPage }) => {


    // AIと情報をやり取りするための変数を管理
    const [isGenerating, setIsGenerating] = useState<boolean>(false); // AIが回答を生成している途中であることを示す値
    const [response, setResponse] = useState<string>(''); // AIからの回答

    const handleAIModel = (e: { preventDefault: () => void }) => {
        e.preventDefault();


    }

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
            <Button onClick={handleAIModel} />
        </Box>
        
    </div>
  )
}

export default Model