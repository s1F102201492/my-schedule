import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Lottie from "lottie-react";
import penAnimation from "@/public/animations/Animation - 1742629439123.json";
import { taglist } from "../tags";
import { SwitchAnalyticsPageProps } from "../../Models/models";
import { useChatGPT } from "@/app/hooks/ai/useChatGPT";

const Model: React.FC<SwitchAnalyticsPageProps> = ({ switchPage }) => {
    // タグの選択
    const tags = taglist;
    const [tag, setTag] = useState<string>("絞らない");
    const handleTagSelect = (e: SelectChangeEvent) => {
        // 選択
        setTag(e.target.value as string);
    };

    const { response, isGenerating, generateResponse } = useChatGPT();

    const handleAIModel = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        await generateResponse({ type: "model", tag });
    };

    return (
        <div>
            <Tooltip title='戻る'>
                <IconButton
                    onClick={() => switchPage()}
                    sx={{ ml: 2, mt: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
            </Tooltip>
            <Box sx={{ mx: 4, mt: 2 }}>
                <Typography variant='h5'>
                    理想の自分をイメージしてみる
                </Typography>
                <Typography
                    variant='subtitle1'
                    sx={{ mt: 2 }}>
                    あなたが頑張っている習慣からそれらを達成した姿をイメージしてみましょう！
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        my: 2,
                        maxHeight: 50,
                    }}>
                    <FormControl>
                        <InputLabel id='tag-select'>タグで絞る</InputLabel>
                        <Select
                            defaultValue='絞らない'
                            sx={{ width: 200, height: 50, mr: 4 }}
                            labelId='tag-select'
                            id='tag-select'
                            value={tag}
                            label='タグを選択'
                            onChange={handleTagSelect}
                            MenuProps={{ PaperProps: { height: 300 } }}>
                            <MenuItem
                                key='なし'
                                value='絞らない'
                                sx={{ height: 40 }}>
                                絞らない
                            </MenuItem>
                            {tags.map((tag) => (
                                <MenuItem
                                    key={tag}
                                    value={tag}
                                    sx={{ height: 40 }}>
                                    {tag}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        onClick={handleAIModel}
                        variant='contained'
                        sx={{ height: 50 }}>
                        イメージ
                    </Button>
                </Box>
                <Paper
                    elevation={4}
                    sx={{ mt: 6, mb: 4, p: 2, minHeight: 200 }}>
                    <Typography variant='body2'>AIからの回答</Typography>
                    <Box>{response}</Box>
                    {isGenerating && (
                        <Box sx={{ width: "30px", height: "30px" }}>
                            <Lottie
                                animationData={penAnimation}
                                loop={true}
                            />
                        </Box>
                    )}
                </Paper>
            </Box>
        </div>
    );
};

export default Model;
