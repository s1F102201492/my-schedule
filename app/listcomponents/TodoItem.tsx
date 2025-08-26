import React, { useContext, useState } from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemText,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoContext } from "../context/TodoContext";
import { CountContinueDays } from "../components/calculate/CountContinueDays";

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    // intervalには数字か配列（曜日を格納する）
}

interface TodoItemProps {
    todo: TodoProps;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { toggleChecked, toggleDelete } = todoContext;
    const todayslash = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "/");

    const todayDayscnt = CountContinueDays(todo.checkedDates);

    const handleCheck = async () => {
        await toggleChecked(todo.id, todayslash);
    };

    // 削除の警告フォームオープン
    const [warning, setWarning] = useState<boolean>(false);
    const handleWarning = () => {
        setWarning(!warning);
    };

    const handleDelete = async () => {
        await toggleDelete(todo.id, todayslash);
    };

    return (
        <div>
            <ListItem>
                <Checkbox
                    checked={!!todo.checkedDates[todayslash]}
                    onChange={handleCheck}
                />
                <ListItemText primary={todo.title} />
                {todayDayscnt + 1}日目
                <Tooltip title='削除'>
                    <IconButton
                        aria-label='delete'
                        onClick={handleWarning}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </ListItem>
            <Dialog
                open={warning}
                onClose={handleWarning}
                fullWidth>
                <DialogTitle>今日のタスクを削除しますか？</DialogTitle>
                <DialogContent sx={{ whiteSpace: "pre-wrap" }}>
                    {`タスク名：${todo.title}\n`}
                    ※タスクを行う日が1日もない場合は習慣自体が削除されます。
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWarning}>戻る</Button>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={handleDelete}>
                        削除
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TodoItem;
