import { Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Dialog, Divider, Typography } from '@mui/material';
import React, { useState } from 'react'
import Detail from '../components/Detail';
import Grid from "@mui/material/Grid2";
import { CheckRate } from '../components/CheckRate';

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    color: string;
    // intervalには数字か配列（曜日を格納する）
  };
  
interface TodoItemProps {
    todo: TodoProps;
};

const AllTodoItem:React.FC<TodoItemProps> = ({ todo }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => { //閉じたらすべてリセット
      setOpen(false);
    }
    const checkrate = CheckRate(todo);

  return (
    <div>
        <Grid size={{xs:12, sm:6, md:4}}>
            <Box onClick={handleClickOpen} sx={{ cursor: "pointer" }}>
            <Card sx={{ minWidth: 275, height: "100%" }} >
              <CardContent
                sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress variant="determinate" value={checkrate} size={100} />
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
                      }}
                    >
                      <Typography variant="caption" component="div" color="text.secondary">
                        {`${checkrate}%`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    {todo.title}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    開始日: {todo.startdate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    終了日: {todo.enddate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    期間: {todo.interval}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {todo.continuedays}日達成
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            </Box>
          </Grid>

        {/* Dialog を使って Detail コンポーネントを表示 */}
        <Dialog fullWidth open={open} onClose={handleClose}>
            <Detail todo={todo} onClose={handleClose} />
        </Dialog>
    </div>
  )
}

export default AllTodoItem