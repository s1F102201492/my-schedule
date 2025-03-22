'use client';

import { Box, Button, Chip, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import PulseLoading from '../parts/PulseLoading';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface modelPageProps {
    setRecommendPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const AIrecommend:React.FC<modelPageProps> = ({setRecommendPage}) => {
    const [text, setText] = useState<string>('');
    const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const [img, setImg] = useState<string>('');
    const handleSetImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = () => {
            setImg(reader.result as string); // Base64 データをセット
        };
        reader.readAsDataURL(file);

        e.target.value = ''; // inputのリセット
    };

    const resetImg = () => {
        setImg('');
    }

    const [isGenerating, setIsGenerating] = useState<boolean>(false); // AIが回答を生成している途中であることを示す値
    const [response, setResponse] = useState<string>(''); // AIからの回答
    const [finalres, setFinalres] = useState<string[]>([]); // 習慣リスト

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
    
        if (text === '') {
            alert('プロンプトを入力してください。');
            return;
        }
        
        setIsGenerating(true);
        setResponse('');
        setFinalres([]);
    
        try {
            const res = await fetch('/api/chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: "recommend", prompt: text, img }),
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                console.error('APIエラー:', data);
                setIsGenerating(false);
                alert('APIリクエストに失敗しました。');
                return;
            }
    
            setResponse(data.result);
            setFinalres(data.result.split(/\s?-\s?/).filter((res: string) => res !== ''));
        } catch (error) {
            console.error('エラー:', error);
            alert('エラーが発生しました。');
        } finally {
            setIsGenerating(false);
        }
    };
    

    // `response`の更新後に`finalres`を更新
    useEffect(() => {
        if (response) {
            const splitres = response.split(/\s?-\s?/).filter((res) => res !== '');
            setFinalres(splitres);
        }
    }, [response]);

    return (
        <div>
            <Tooltip title="戻る">
                <IconButton onClick={() => setRecommendPage(false)}
                    sx={{ ml: 2, mt: 2}}>
                    <ArrowBackIcon />
                </IconButton>
            </Tooltip>
            <Box sx={{ ml: 4, mt:2 }}>
                <Typography variant='h5'>おすすめの習慣を提案</Typography>
                    
                <Box sx={{ mt: 3 }}>
                    <Typography variant='subtitle1'>
                        あなたが憧れている姿やなりたいものについて教えてください！
                    </Typography>
                    <TextField
                        sx={{ mt: 1 }}
                        fullWidth
                        rows={4}
                        multiline
                        required
                        value={text}
                        onChange={inputText}
                    />
                </Box>
                <Box sx={{ mt: 3 }}>
                     <Typography variant='subtitle1'>モデルとなる画像を貼りましょう！</Typography>
                    <input type='file' style={{ display: 'none' }} accept='image/*' id='img-upload' onChange={handleSetImg} />
                    <Box sx={{ display: "flex", mt: 1 }}>
                        <label htmlFor='img-upload'>
                            <Button variant='outlined' component='span' startIcon={<ImageIcon />}>
                                画像をアップロード
                            </Button>
                            <Tooltip title='アップロードされた画像を削除'>
                                <IconButton
                                    aria-label='delete'
                                    onClick={resetImg}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            {img && <img src={img} width="200" height="100"/>}
                        </label>
                        
                    </Box>
                </Box>
                <Button variant='contained' onClick={handleSubmit} sx={{ mt: 4, height: 40, width: 180 }}>
                    おすすめの習慣を見る
                </Button>
                <Box sx={{ mt: 2 }}>
                    {isGenerating ? <PulseLoading loading={isGenerating} /> : finalres.map((res, index) => <Chip key={index} label={res} />)}
                </Box>
            </Box>
        </div>
    );
};

export default AIrecommend;
