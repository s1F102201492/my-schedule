import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Detail from '../components/Detail';
import Grid from '@mui/material/Grid2';
import { CheckRate } from '../components/calculate/CheckRate';

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    purpose: string;
    tag: string;
    // intervalには数字か配列（曜日を格納する）
}

interface TodoItemProps {
    todo: TodoProps;
}

const AllTodoItem: React.FC<TodoItemProps> = ({ todo }) => {

    // 詳細ダイアログの開閉
    const [detailOpen, setDetailOpen] = useState<boolean>(false);
    const handleDetailOpen = () => setDetailOpen(true);
    const handleDetailClose = () => {
        setDetailOpen(false);
    };

    const checkrate = CheckRate(todo);
    const slashstart = todo.startdate.replace(/-/g, '/');
    const slashend = todo.enddate.replace(/-/g, '/');

    return (
        <div>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                    onClick={handleDetailOpen}
                    sx={{ cursor: 'pointer' }}>
                    <Card sx={{ minWidth: 200, height: '100%' }}>
                        <CardContent
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2,
                                }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        display: 'inline-flex',
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
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
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
                                    gutterBottom>
                                    {todo.title}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    gutterBottom>
                                    開始日: {slashstart.replace(/T\S+/, '')}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    gutterBottom>
                                    終了日: {slashend.replace(/T\S+/, '')}
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
