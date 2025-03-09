'use client';

import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import PulseLoading from '../PulseLoading';

const GoalSetting = () => {
    const [text, setText] = useState<string>('');
    const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const [img, setImg] = useState<string>('');
    const handleSetImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        setImg(imageUrl);
    };

    const [isComplete, setIsComplete] = useState<boolean>(true); // AIの回答生成が完了したことを示す値
    const [isGenerating, setIsGenerating] = useState<boolean>(false); // AIが回答を生成している途中であることを示す値
    const [response, setResponse] = useState<string>(''); // AIからの回答
    const [finalres, setFinalres] = useState<string[]>([]); // 習慣リスト

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (text === '') {
            alert('プロンプトを入力してください。');
            return;
        }

        setResponse(''); // 初期化
        setFinalres([]); // 初期化
        setIsComplete(false); // ストリーミング開始
        setIsGenerating(true); // 応答生成開始

        // プロンプト設定
        const SystemPrompt: string = `あなたはおすすめの習慣を提案してください。アプリの利用者は自分が憧れている姿やなりたいもの、目標をテキストで書きます。なのであなたはその内容を分析し利用者がなりたい姿やなりたいもの、目標を達成できるような習慣を５つ考えてください。習慣名だけを挙げてください。番号や点や記号などは書かずに箇条書き(最初はハイフン)で書いてください。憧れている姿、なりたいもの、目標: ${text}`;

        const res = await fetch('/api/chatgpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: SystemPrompt }),
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
            let done = false;
            let incompleteChunk = '';

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                const chunk = decoder.decode(value, { stream: true });

                incompleteChunk += chunk;
                const lines = incompleteChunk
                    .split('\n')
                    .filter((line) => line.startsWith('data: '));

                for (const line of lines) {
                    const jsonString = line.replace('data: ', '').trim();

                    if (jsonString === '[DONE]') {
                        setIsComplete(true);
                        setIsGenerating(false);
                        break;
                    }

                    try {
                        const parsedChunk = JSON.parse(jsonString);
                        const content = parsedChunk.choices[0]?.delta?.content;
                        if (content) {
                            setResponse((prev) => prev + content);
                        }
                    } catch (error) {
                        console.error('Error parsing JSON (ignoring incomplete chunk):', error);
                        continue;
                    }
                }

                incompleteChunk = incompleteChunk.split('\n').slice(-1)[0];
            }
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
                    <Box sx={{ mt: 1 }}>
                        <label htmlFor='img-upload'>
                            <Button variant='outlined' component='span' startIcon={<ImageIcon />}>
                                画像をアップロード
                            </Button>
                            {img && <img src={img} />}
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
