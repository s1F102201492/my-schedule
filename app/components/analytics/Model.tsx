import { Box, Button, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Lottie from 'lottie-react';
import penAnimation from "@/public/animations/Animation - 1742629439123.json";

interface modelPageProps {
    setModelPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Model:React.FC<modelPageProps> = ({ setModelPage }) => {
    const [search, setSearch] = useState<string>(''); // 条件を絞る機能
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    // AIと情報をやり取りするための変数を管理
    const [isGenerating, setIsGenerating] = useState<boolean>(false); // AIが回答を生成している途中であることを示す値
    const [response, setResponse] = useState<string>(''); // AIからの回答
    const [isComplete, setIsComplete] = useState<boolean>(true); // AIが回答を生成している途中であることを示す値

    const handleAIModel = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        setIsComplete(false);
        setIsGenerating(true);
        setResponse('');

        const res = await fetch('/api/chatgpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'model', search }),
        });

        if (!res.body) {
            setIsGenerating(false);
            alert('ストリーミングの開始に失敗しました。');
            return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let incompleteChunk = ""; // 不完全なチャンクを一時的に保持

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

             // 不完全なチャンクが前のチャンクの最後と繋がる可能性があるため、それを追加
            incompleteChunk += chunk;

            // 'data: ' で始まる行だけを処理
            const lines = incompleteChunk
            .split("\n")
            .filter((line) => line.startsWith("data: "));

            for (const line of lines) {
                const jsonString = line.replace("data: ", "").trim();
                if (jsonString === "[DONE]") {
                    // ストリーミングが完了した場合
                    setIsComplete(true); // 完了フラグを立てる
                    setIsGenerating(false); // 応答生成完了
                    break;
                }
                try {
                // JSONとして有効か確認
                    const parsedChunk = JSON.parse(jsonString);
                    const content = parsedChunk.choices[0]?.delta?.content;
                if (content) {
                    // チャンクごとにレスポンスを追加
                    setResponse((prev) => prev + content);
                }
                } catch (error) {
                // JSONが未完了の場合は、次のチャンクで処理を続ける
                console.error(
                    "Error parsing JSON (ignoring incomplete chunk):",
                    error
                );
                continue;
                }
            }
        // 最後の行が不完全だった場合、次のチャンクと繋げるため保存
        incompleteChunk = incompleteChunk.split("\n").slice(-1)[0];
        }
    }

  return (
    <div>
        <Tooltip title="戻る">
            <IconButton onClick={() => setModelPage(false)}
                sx={{ ml: 2, mt: 2}}>
                <ArrowBackIcon />
            </IconButton>
        </Tooltip>
        <Box sx={{ mx: 4, mt: 2 }}>
            <Typography variant='h5'>理想の自分をイメージしてみる</Typography>
            <Typography variant='subtitle1' sx={{ mt: 2}}>
                あなたが頑張っている習慣からそれらを達成した姿をイメージしてみましょう！
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', my: 2, maxHeight: 55}}>
                <TextField
                    fullWidth
                    variant='outlined'
                    label='条件があれば絞る'
                    sx={{
                        mr: 2,
                        '& .MuiOutlinedInput-root': { height: 50 } // 高さを統一
                    }}
                    value={search}
                    onChange={handleSearch}
                    />
                <Button onClick={handleAIModel} variant='contained'
                sx={{ height: 50 }} >
                    イメージ
                </Button>
            </Box>
            <Paper elevation={4} sx={{mt: 6, mb: 4, p: 2, minHeight: 200}}>
                <Typography variant='body2'>
                    AIからの回答
                </Typography>
                <Box>
                    {response} 
                </Box>
                {isGenerating && <Box sx={{width: "30px", height: "30px"}}><Lottie animationData={penAnimation} loop={true} /></Box>}
            </Paper>
        </Box>
        
    </div>
  )
}

export default Model