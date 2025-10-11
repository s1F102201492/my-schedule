"use client";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid2,
    LinearProgress,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import Edit from "./Edit";
import Delete from "./Delete";
import CheckIcon from "@mui/icons-material/Check";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CheckRate } from "../hooks/calculate/CheckRate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { TodoModel, TodoItemProps } from "../Models/models";

const Detail: React.FC<TodoItemProps> = ({ todo, onClose, detailOpen }) => {
    // 編集フォームの管理
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const handleEditOpen = () => {
        setEditOpen(true);
    };

    // 削除フォームの管理
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const descriptionnull = (description: string | null) => {
        if (description === "") {
            //詳細が書かれている場合はtrue,ない場合はfalse
            return true;
        } else {
            return false;
        }
    };

    const intervaltype = (interval: number | string[]) => {
        if (typeof interval === "number") {
            //日数はtrue,曜日はfalse
            return true;
        } else {
            return false;
        }
    };

    const slashstart = todo.startdate.split("T")[0].replace(/-/g, "/");
    const slashend = todo.enddate.split("T")[0].replace(/-/g, "/");

    return (
        <div>
            <Dialog
                fullWidth
                open={detailOpen}
                onClose={onClose}>
                {/* フォーム全体をフォームタグで囲む */}
                <DialogTitle sx={{ m: 1 }}></DialogTitle>
                <DialogContent>
                    <Grid2 size={{ xs: 12 }}>
                        <Typography
                            variant='h4'
                            component='h1'
                            gutterBottom>
                            {todo.title}
                        </Typography>
                        <Typography
                            variant='body1'
                            color='text.secondary'
                            gutterBottom
                            sx={{ whiteSpace: "pre-line" }}>
                            {descriptionnull(todo.description)
                                ? "詳細なし"
                                : "詳細\n" + todo.description}
                        </Typography>
                    </Grid2>

                    {/* 期間情報 */}
                    <Grid2
                        container
                        spacing={2}>
                        <Grid2
                            size={{ xs: 12, sm: 6 }}
                            sx={{ mt: 2, mb: 1 }}>
                            <Typography
                                variant='subtitle2'
                                color='text.secondary'>
                                開始日
                            </Typography>
                            <Typography
                                variant='body1'
                                gutterBottom>
                                {slashstart}
                            </Typography>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, sm: 6 }}
                            sx={{ mt: 2, mb: 1 }}>
                            <Typography
                                variant='subtitle2'
                                color='text.secondary'>
                                終了日
                            </Typography>
                            <Typography
                                variant='body1'
                                gutterBottom>
                                {slashend}
                            </Typography>
                        </Grid2>
                    </Grid2>

                    {/* 間隔 */}
                    <Grid2
                        size={{ xs: 12, sm: 6 }}
                        sx={{ mt: 2, mb: 1 }}>
                        <Typography
                            variant='subtitle2'
                            color='text.secondary'>
                            間隔
                        </Typography>
                        <Typography
                            variant='body1'
                            gutterBottom>
                            {intervaltype(todo.interval)
                                ? `${todo.interval}日ごと`
                                : `曜日：${todo.interval}`}
                        </Typography>
                    </Grid2>

                    <Grid2
                        size={{ xs: 12, sm: 6 }}
                        sx={{ mt: 3, mb: 1 }}>
                        <Typography
                            variant='subtitle2'
                            color='text.secondary'>
                            目的
                        </Typography>
                        <Typography
                            variant='body1'
                            gutterBottom>
                            {todo.purpose}
                        </Typography>
                    </Grid2>

                    <Box sx={{ my: 4 }}>
                        <Grid2 size={{ xs: 12 }}>
                            <Typography
                                variant='subtitle2'
                                color='text.secondary'>
                                達成率
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                }}>
                                <LinearProgress
                                    variant='determinate'
                                    value={CheckRate(todo)}
                                    sx={{
                                        flexGrow: 1,
                                        height: 10,
                                        borderRadius: 5,
                                    }}
                                />
                                <Typography variant='body2'>
                                    {CheckRate(todo)}%
                                </Typography>
                            </Box>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12 }}
                            sx={{ mt: 3 }}>
                            <Typography
                                variant='subtitle2'
                                color='text.secondary'>
                                タグ
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <LocalOfferOutlinedIcon sx={{ mr: 2 }} />
                                {todo.tag}
                            </Box>
                        </Grid2>
                    </Box>

                    <Grid2 size={{ xs: 12 }}>
                        <Typography
                            variant='h6'
                            gutterBottom>
                            達成状況
                        </Typography>
                        <Grid2
                            container
                            spacing={2}>
                            {Object.entries(todo.checkedDates).map(
                                (date, key) => (
                                    <Grid2
                                        size={{ xs: 6, sm: 4 }}
                                        key={key}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                            display: 'block'
                                                        
                                                    }}>
                                                    <Typography
                                                        variant='body1'
                                                        sx={{ width: 90 }}>
                                                        {date[0]}
                                                    </Typography>
                                                    <Chip
                                                        sx={{ mt: 1 }}
                                                        icon={
                                                            date[1] ? (
                                                                <CheckIcon />
                                                            ) : (
                                                                <HighlightOffIcon />
                                                            )
                                                        }
                                                        label={
                                                            date[1]
                                                                ? "達成"
                                                                : "未達成"
                                                        }
                                                        color={
                                                            date[1]
                                                                ? "success"
                                                                : "error"
                                                        }
                                                        size='small'
                                                    />
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                ),
                            )}
                        </Grid2>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={onClose}>
                        閉じる
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<EditIcon />}
                        onClick={handleEditOpen}>
                        編集
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteOpen}>
                        削除
                    </Button>
                </DialogActions>
                <Edit
                    id={todo.id}
                    todo={todo}
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                />
                <Delete
                    onetodo={todo}
                    deleteOpen={deleteOpen}
                    setDeleteOpen={setDeleteOpen}
                />
            </Dialog>
        </div>
    );
};

export default Detail;
