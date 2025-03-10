'use client';

import { Box, Button, Chip, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import PulseLoading from '../PulseLoading';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const GoalSetting = () => {
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
    
    const [viewTips, setViewTips] = useState<boolean>(false);
    const handleViewTips = () => {
        setViewTips(!viewTips);
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

        // プロンプト設定
        const SystemPrompt: string = `あなたはおすすめの習慣を提案してください。アプリの利用者は自分が憧れている姿やなりたいもの、目標をテキストで書き、画像があれば画像をアップロードします。なのであなたはその内容を分析し利用者がなりたい姿やなりたいもの、目標を達成できるような習慣を５つ考えてください。習慣名だけを挙げてください。番号や点や記号などは書かずに箇条書き(最初はハイフン)で書いてください。憧れている姿、なりたいもの、目標: ${text} ,画像: ${img}`;
    
        try {
            const res = await fetch('/api/chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: SystemPrompt, img }),
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
            <Box sx={{ m: 4 }}>
                    <Typography variant='h5'>おすすめの習慣を提案</Typography>
                    <Tooltip title='よりよい習慣を見つけるためのtips'>
                        <IconButton
                            aria-label='tips'
                            onClick={handleViewTips}
                            sx={{position: "fixed", top: 100, right: 32}}>
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>
                    <Dialog
                        open={viewTips}
                        onClose={handleViewTips}
                        fullWidth>
                        <DialogTitle>よりよい習慣を見つけるためのtips</DialogTitle>
                        <DialogContent>
                        <Typography variant="body1" component='p'>
                            習慣を続けることが目的になってはいけません。
                        </Typography>
                        <Typography variant="body2" component='p'>
                            例えば、「見た目をよくしたい」という目標があったとします。
                            そのために「週3回の筋トレをする」という習慣を設定するのは良いことです。
                        </Typography>
                        <Typography variant="body2" component='p'>
                            しかし、辛くなったときに「なぜ続けるのか？」が分からないと挫折しやすくなります。
                            そこで「なぜ見た目をよくしたいのか？」を深掘りしてみましょう。
                        </Typography>
                        <Typography variant="body2">
                            例:
                            <br />「見た目をよくしたい」→「自信をつけたい」→「モテたい」
                            <br />このように考えると、本当のモチベーションが明確になり、続けやすくなります！
                        </Typography>
                    </DialogContent>

                    </Dialog>
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
                            <Tooltip title='削除'>
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

export default GoalSetting;
