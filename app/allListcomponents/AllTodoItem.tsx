import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import Detail from "../components/Detail";
import Grid from "@mui/material/Grid2";
import { CheckRate } from "../hooks/calculate/CheckRate";
import { TodoModel } from "../Models/models";

/**
 * タスク一覧画面における個別のタスクカードコンポーネント
 * * 主な機能:
 * - 達成率を円グラフ（CircularProgress）で視覚的に表示
 * - タスクの基本情報（タイトル、期間、継続日数）の表示
 * - クリック時に詳細ダイアログ（Detailコンポーネント）を開く
 * * @component
 * @param {TodoModel} todo - 表示するタスクデータ
 */
const AllTodoItem = ({ todo }: {todo: TodoModel}) => {
    // 詳細ダイアログの開閉
    const [detailOpen, setDetailOpen] = useState<boolean>(false);
    const handleDetailOpen = () => setDetailOpen(true);
    const handleDetailClose = () => {
        setDetailOpen(false);
    };

    const checkrate = CheckRate(todo); // 達成率を計算
    const slashstart = todo.startdate.replace(/-/g, "/");
    const slashend = todo.enddate.replace(/-/g, "/");

    return (
        <div>
            <Grid size={{ xs: 'auto' }}>
                <Box
                    onClick={handleDetailOpen}
                    sx={{ 
                        cursor: "pointer",
                        height: '100%',
                     }}>
                    <Card sx={{ width: 230, height: 350 }}>
                        <CardContent
                            sx={{
                                flexGrow: 1,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: 2,
                                }}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        display: "inline-flex",
                                    }}>
                                    <CircularProgress
                                        variant='determinate'
                                        value={checkrate}
                                        size={100}
                                    />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: "absolute",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                        <Typography
                                            variant='caption'
                                            component='div'
                                            color='text.secondary'>
                                            {`${checkrate}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Typography
                                    variant='h6'
                                    component='div'
                                    gutterBottom
                                    sx={{
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        'WebkitBoxOrient': 'vertical',
                                        'WebkitLineClamp': '1', 
                                        }}>
                                        
                                    {todo.title}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    gutterBottom>
                                    開始日: {slashstart.replace(/T\S+/, "")}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    gutterBottom>
                                    終了日: {slashend.replace(/T\S+/, "")}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    gutterBottom>
                                    期間: {todo.interval}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    gutterBottom>
                                    {todo.continuedays}日達成
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>

            {/* Dialog を使って Detail コンポーネントを表示 */}
            <Detail
                todo={todo}
                onClose={handleDetailClose}
                detailOpen={detailOpen}
                setDetailOpen={setDetailOpen}
            />
        </div>
    );
};

export default AllTodoItem;
