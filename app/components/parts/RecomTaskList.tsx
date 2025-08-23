import { Box, Button, Card, CardContent, Checkbox, Chip, Container, Divider, List, ListItem, ListItemText, Paper, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { CheckCircle, RadioButtonUnchecked, Edit, Delete, Schedule, Assignment } from "@mui/icons-material"
import React, { useState } from 'react'

interface TaskProps {
    title: string, 
    description: string,
    startdate: string,
    enddate: string,
    interval: number,
    tag: string
}

interface taskListProps {
    taskList: TaskProps[]
}


// GPTがおすすめしているタスクを表示するコンポーネント
const RecomTaskList: React.FC<taskListProps> = ({ taskList }) => {

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



  return (
    <div>
        <Container maxWidth="md" sx={{ py: 4 }}>
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
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} component="span">
                                    {task.description}
                                </Typography>
                                <Chip label={task.tag} size="small" variant="outlined" />
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
                py: 2
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
            <Button variant='contained' sx={{ display: 'flex', justifyContent:'flex-end'}}>追加する</Button>
        </Paper>
    </div>
  )
}

export default RecomTaskList