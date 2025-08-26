import { Box, Button, Checkbox, Chip, Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material"
import React, { useContext, useState } from 'react'
import CreateCheckedDates from '../calculate/CreateCheckedDates'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { TodoContext } from '@/app/context/TodoContext';
import FullScreenLoading from './fullScreenLoading';

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ja')
dayjs.tz.setDefault('Asia/Tokyo')

interface TaskProps {
    title: string, 
    description: string,
    startdate: string,
    enddate: string,
    interval: number,
    tag: string
}

interface taskListProps {
    taskList: TaskProps[],
    purpose: string
}

const addTodo = async (
    title: string,
    description: string,
    continuedays: number,
    checkedDates: Record<string, boolean>,
    startdate: string,
    enddate: string,
    interval: number | string[],
    purpose: string,
    tag: string,
    userId: string
) => {
    const res = await fetch('/api/todo', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            continuedays,
            checkedDates,
            startdate,
            enddate,
            interval,
            purpose,
            tag,
            userId
        }),
        headers: {
            'Content-type': 'application/json',
        },
    });

    return res.json();
};

// GPTがおすすめしているタスクを表示するコンポーネント
const RecomTaskList: React.FC<taskListProps> = ({ taskList, purpose }) => {

    const router = useRouter();

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { fetchAllTodos } = todoContext;

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { loginUser } = authContext;

    // タスクを追加している際のローディングを管理
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    // 選択されたタスクを格納(タスクのタイトルだけ、タイトルで識別)
    const [selectedTask, setSelectedTask] = useState<string[]>([]);
    const handleTaskSelect = (title: string) => {
        if (!selectedTask?.includes(title)) {
            // 選択されたタスクを追加
            setSelectedTask((prev) => {
                const newValue = [...prev, title]
                return newValue;
            })
        } else {
            // 選択されたタスクを削除
            setSelectedTask((prev) => {
                return prev.filter((selectedTaskTitle) => {
                    return selectedTaskTitle !== title;
                })
            })
        }
    }

    const addRecommendTask = async () => {
        try {
            setSubmitLoading(true);

            const addTasks: (TaskProps | undefined)[] = selectedTask.map((taskTitle) => {
                return taskList.find(task => task.title === taskTitle);
            });

            addTasks.map(async (addTask) => {
                if (addTask == undefined) {
                    return;
                }

                const checkdates: Record<string, boolean> = CreateCheckedDates(
                    dayjs(addTask.startdate),
                    dayjs(addTask.enddate),
                    addTask.interval,
                    null
                ); // 日付: falseの辞書を作成

                await addTodo(
                    addTask.title,
                    addTask.description,
                    0,
                    checkdates,
                    addTask.startdate,
                    addTask.enddate,
                    addTask.interval,
                    purpose,
                    addTask.tag,
                    loginUser!.id

                )
            })

            await fetchAllTodos();
            router.push('/list');
            router.refresh();
        } catch {
            alert("エラーが発生しました。もう一度やり直してください。")
        } finally {
            setSubmitLoading(false);
        }
            
    }

  return (
    <div>
        <Typography variant='h5'>おすすめの習慣</Typography>
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <List>
                {taskList.map((task, index) => (
                    <ListItem
                        onClick={() => handleTaskSelect(task.title)}
                        sx={{
                        py: 2,
                        px: 3,
                        '&:hover': {
                        bgcolor: '#dcdcdc',
                        },
                        'cursor': 'pointer'
                        }}
                        key={task.title}
                    >
                        <Checkbox
                        checked={selectedTask?.includes(task.title)}
                        icon={<RadioButtonUnchecked />}
                        checkedIcon={<CheckCircle />}
                        sx={{ mr: 2 }}
                        />

                        <ListItemText
                        key={index}
                        primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <Typography
                                variant="h6"
                            >
                                {task.title}
                            </Typography>
                            </Box>
                        }
                        secondary={
                            <Box component="span">
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} component="span">
                                    {task.description}
                                </Typography>
                                <Chip label={task.tag} size="small" variant="outlined" component="span" />
                            </Box>
                        }
                        />
                    </ListItem>

                ))}
            </List>
        </Container>
        <Paper
            sx={{
                flexWrap: 'wrap',
                listStyle: 'none',
                py: 2,
                mb: 20
            }}
            component="ul"
            >
            <Typography variant='h6' sx={{ px: 2 }}>選択中のタスク（選択するとタスクが表示されます）</Typography>
            <Box sx={{ mx: 2, my: 1}}>
                {selectedTask.map((taskTitle) => {
                return (
                    <Chip
                    key={taskTitle}
                    label={taskTitle}
                    sx={{my: 0.5, mx: 0.5}}
                    />
                    );
                })}
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" type="submit"
                sx={{mr: 2}} onClick={addRecommendTask} disabled={submitLoading}>
                    追加する
                </Button>
            </Box>
        </Paper>

        <FullScreenLoading open={submitLoading} />
    </div>
  )
}

export default RecomTaskList