"use client";

import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import PulseLoading from "../parts/PulseLoading";
import DeleteIcon from "@mui/icons-material/Delete";
import { taglist } from "../tags";
import RecomTaskList from "../parts/RecomTaskList";
import FullScreenLoading from "../parts/fullScreenLoading";
import Image from "next/image";

interface TaskProps {
    title: string;
    description: string;
    startdate: string;
    enddate: string;
    interval: number;
    tag: string;
}

interface PageSwitchProps {
    boolRecomPage: boolean;
    handleBoolRecomPage: () => void;
}

const GPTRecommend: React.FC<PageSwitchProps> = ({ handleBoolRecomPage }) => {
    const [text, setText] = useState<string>("");
    const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const [img, setImg] = useState<string>("");
    const handleSetImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImg(reader.result as string); // Base64 データをセット
        };
        reader.readAsDataURL(file);

        e.target.value = ""; // inputのリセット
    };

    const resetImg = () => {
        setImg("");
    };

    // タグの選択
    const tags = taglist;
    const [tag, setTag] = useState<string>("");
    const handleTagSelect = (e: SelectChangeEvent) => {
        // 選択
        setTag(e.target.value as string);
    };

    const levelList = ["低い", "まあまあ", "高い"];
    const [level, setLevel] = useState<string>("低い");
    const handleLevel = (e: SelectChangeEvent) => {
        setLevel(e.target.value);
    };

    const [isGenerating, setIsGenerating] = useState<boolean>(false); // AIが回答を生成している途中であることを示す値
    const [response, setResponse] = useState<TaskProps[]>([]); // AIからの回答
    console.log(response.length);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (text === "") {
            alert("プロンプトを入力してください。");
            return;
        }

        if (tag === "") {
            alert("タグを選択してください。");
            return;
        }

        setIsGenerating(true);
        setResponse([]);

        try {
            const res = await fetch("/api/chatgpt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "recommend",
                    prompt: text,
                    img,
                    tag,
                    level,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("APIエラー:", data);
                setIsGenerating(false);
                alert("APIリクエストに失敗しました。");
                return;
            }

            console.log(data.result);
            // stringを配列に変換
            const arrayResult = JSON.parse(data.result);
            console.log(arrayResult);

            setResponse(arrayResult);
        } catch (error) {
            console.error("エラー:", error);
            alert("エラーが発生しました。");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            <Box sx={{ mx: 4, mt: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Typography variant='h5'>おすすめの習慣を提案</Typography>
                    <Button onClick={() => handleBoolRecomPage()}>
                        自分でタスクを追加する
                    </Button>
                </Box>
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
                        style={{ display: "none" }}
                        accept='image/*'
                        id='img-upload'
                        onChange={handleSetImg}
                    />
                    <Box sx={{ display: "flex", mt: 1 }}>
                        <label htmlFor='img-upload'>
                            <Button
                                variant='outlined'
                                component='span'
                                startIcon={<ImageIcon />}>
                                画像をアップロード
                            </Button>
                            <Tooltip title='アップロードされた画像を削除'>
                                <IconButton
                                    aria-label='delete'
                                    onClick={resetImg}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            {img && (
                                <Image
                                    alt='delete'
                                    src={img}
                                    width={200}
                                    height={100}
                                />
                            )}
                        </label>
                    </Box>
                    <Box>
                        <Select
                            id='tag'
                            value={tag}
                            label='タグ'
                            onChange={handleTagSelect}
                            required>
                            {tags.map((elem) => (
                                <MenuItem
                                    value={elem}
                                    key={elem}>
                                    {elem}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <Select
                            value={level}
                            label='難易度'
                            onChange={handleLevel}
                            required>
                            {levelList.map((elem) => (
                                <MenuItem
                                    value={elem}
                                    key={elem}>
                                    {elem}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Box>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                    sx={{ mt: 4, height: 40, width: 180 }}
                    disabled={isGenerating}>
                    おすすめの習慣を見る
                </Button>
                <Box sx={{ mt: 4 }}>
                    {!isGenerating && response.length > 0 ? (
                        <RecomTaskList
                            taskList={response}
                            purpose={text}
                        />
                    ) : (
                        <PulseLoading loading={isGenerating} />
                    )}
                </Box>
            </Box>

            <FullScreenLoading open={isGenerating} />
        </div>
    );
};

export default GPTRecommend;
