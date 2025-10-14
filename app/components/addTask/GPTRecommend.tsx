"use client";

import {
    Box,
    Button,
    IconButton,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import AssignmentAddIcon from '@mui/icons-material/Assignment';
import PulseLoading from "../common/PulseLoading";
import DeleteIcon from "@mui/icons-material/Delete";
import { taglist } from "../tags";
import RecomTaskList from "../addTask/RecomTaskList";
import FullScreenLoading from "../common/fullScreenLoading";
import Image from "next/image";
import { AddTaskPageSwitchProps } from "../../Models/models";
import { useChatGPT } from "@/app/hooks/ai/useChatGPT";

// このコンポーネントはおすすめの習慣を提案するページのコンポーネントです。

const GPTRecommend: React.FC<AddTaskPageSwitchProps> = ({ handleBoolRecomPage }) => {
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
    const handleTagSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 選択
        setTag(e.target.value as string);
    };

    const levelList = ["低い", "まあまあ", "高い"];
    const [level, setLevel] = useState<string>("");
    const handleLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(e.target.value);
    };

    const { responseArray, isGenerating, generateResponse } = useChatGPT();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (text === "" || tag === "" || level === "") {
            alert("すべての項目を入力してください。");
            return;
        }

        await generateResponse({
            type: "recommend",
            prompt: text,
            img,
            tag,
            level,
        });
    };

    return (
        <div>
            <Box sx={{ mx: 4, mt: 4, mb: 16 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Typography variant='h5'>おすすめの習慣を提案</Typography>

                    {/* PC用タイトル */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button onClick={() => handleBoolRecomPage()}>
                            自分でタスクを追加する
                        </Button>
                    </Box>

                    {/* モバイル用タイトル */}
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <Tooltip title='自分でタスクを追加する'>
                            <IconButton onClick={() => handleBoolRecomPage()}>
                                <AssignmentAddIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    
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
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            select
                            value={tag}
                            label='タグを選択'
                            onChange={handleTagSelect}
                            fullWidth
                            required>
                            {tags.map((elem) => (
                                <MenuItem
                                    value={elem}
                                    key={elem}>
                                    {elem}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box>
                        <TextField
                            select
                            sx={{ mt: 2 }}
                            value={level}
                            label='難易度を選択'
                            onChange={handleLevel}
                            fullWidth
                            required>
                            {levelList.map((elem) => (
                                <MenuItem
                                    value={elem}
                                    key={elem}>
                                    {elem}
                                </MenuItem>
                            ))}
                        </TextField>
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
                    {!isGenerating && responseArray.length > 0 ? (
                        <RecomTaskList
                            taskList={responseArray}
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
