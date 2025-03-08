'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';

const GoalSetting = () => {
    const [text, setText] = useState<string>('');
    const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const [img, setImg] = useState<string>('');
    const handleSetImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        console.log(file);
        if (!file) {
            return;
        } else {
            const imageUrl = URL.createObjectURL(file);
            setImg(imageUrl);
        }
    };

    const [isComplete, setIsComplete] = useState<boolean>(true); // AIの回答生成が完了したことを示す値
    const [isGenerating, setIsGenerating] = useState<boolean>(false); // AIが回答を生成している途中であることを示す値
    const [response, setResponse] = useState<string[]>([]); // AIからの回答を表す状態変化

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        //ボタンを押すとAIが分析を開始し応答を表示
        e.preventDefault();

        if (text === '') {
            alert('プロンプトを入力してください。');
            return;
        }

        setResponse([]); // 初期化
        setIsComplete(false); // ストリーミング開始
        setIsGenerating(true); // 応答生成開始

        // 最新の prompt を使用して SystemPrompt を定義
        const SystemPrompt: string = `あなたはおすすめの習慣を提案してください。アプリの利用者は自分が憧れている姿やなりたいもの、目標をテキストで書きます。なのであなたはその内容を分析し利用者がなりたい姿やなりたいもの、目標を達成できるような習慣を５つ考えてください。習慣名だけを挙げてください。 憧れている姿、なりたいもの、目標: ${text}`;

        // API呼び出し
        const res = await fetch('/api/chatgpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: SystemPrompt }), // キー名を修正
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
            let done = false;
            let incompleteChunk = ''; // 不完全なチャンクを一時的に保持

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                const chunk = decoder.decode(value, { stream: true });
                // 不完全なチャンクが前のチャンクの最後と繋がる可能性があるため、それを追加
                incompleteChunk += chunk;
                // 'data: ' で始まる行だけを処理
                const lines = incompleteChunk
                    .split('\n')
                    .filter((line) => line.startsWith('data: '));

                for (const line of lines) {
                    const jsonString = line.replace('data: ', '').trim();

                    if (jsonString === '[DONE]') {
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
                            setResponse((prev) => [...prev, content]);
                        }
                    } catch (error) {
                        // JSONが未完了の場合は、次のチャンクで処理を続ける
                        console.error(
                            'Error parsing JSON (ignoring incomplete chunk):',
                            error,
                        );
                        continue;
                    }
                }

                // 最後の行が不完全だった場合、次のチャンクと繋げるため保存
                incompleteChunk = incompleteChunk.split('\n').slice(-1)[0];
            }
        }
        console.log(response);
    };

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
                    <Typography variant='subtitle1'>
                        モデルとなる画像を貼りましょう！
                    </Typography>
                    <input
                        type='file'
                        style={{ display: 'none' }}
                        accept='image/*'
                        id='img-upload'
                        onChange={handleSetImg}
                    />
                    <Box sx={{ mt: 1 }}>
                        <label htmlFor='img-upload'>
                            <Button
                                variant='outlined'
                                component='span'
                                startIcon={<ImageIcon />}>
                                画像をアップロード
                            </Button>
                            {img && <img src={img} />}
                        </label>
                    </Box>
                </Box>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                    sx={{ mt: 4, height: 40, width: 180 }}>
                    おすすめの習慣を見る
                </Button>
                <Box sx={{ mt: 2 }}>{response}</Box>
            </Box>
        </div>
    );
};

export default GoalSetting;
