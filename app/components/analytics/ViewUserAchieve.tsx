import React, { useContext } from 'react'
import Grid from "@mui/material/Grid2";
import { Card, Typography } from '@mui/material';
import { TodoContext } from '@/app/context/TodoContext';
import { CalcAchieveCount } from '@/app/hooks/calculate/CalcAchieveCount';
import { CalcAchieveDay } from '@/app/hooks/calculate/CalcAchieveDay';
import theme from '../theme/theme';
import { CalcMultiCount } from '@/app/hooks/calculate/CalcMultiCount';


const ViewUserAchieve = () => {

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { todos } = todoContext;

  return (
    <div>
        <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                    {CalcAchieveCount(todos)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    完了チェック数
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#f44336" }}>
                  {CalcAchieveDay(todos)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    現在の連続達成日数
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#ff9800" }}>
                    {CalcMultiCount(todos)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    1日の最大チェック数
                  </Typography>
                </Card>
              </Grid> 
            </Grid>
    </div>
  )
}

export default ViewUserAchieve