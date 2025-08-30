import { Assessment } from '@mui/icons-material'
import { Box, Card, CardContent, CircularProgress, LinearProgress, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React, { useContext } from 'react'
import theme from '../theme/theme'
import { TodoContext } from '@/app/context/TodoContext'
import { AchieveRateByTag } from '../calculate/AchieveRateByTag'

const ViewAchieveByTag = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { todos } = todoContext;

    const setTags = new Set<string>([]);
    todos.map(todo => {
        setTags.add(todo.tag);
    })

    const tagAndRate: Record<string, number> = {}
    for (const tag of setTags) {
        tagAndRate[tag] = AchieveRateByTag(todos, tag);
    }

    console.log(tagAndRate)
  return (
    <div>
        <Card elevation={2}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Assessment sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 32 }} />
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
                      カテゴリ別達成状況
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      各分野での活動量と傾向
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  {Object.keys(tagAndRate).map((tag, index) => {
                    const colors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0"]

                    return (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Paper
                          sx={{
                            p: 3,
                            textAlign: "center",
                            border: "2px solid #e0e0e0",
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            {tag}
                          </Typography>

                          <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
                            <CircularProgress
                              variant="determinate"
                              value={tagAndRate[tag]}
                              size={80}
                              thickness={4}
                              sx={{ color: colors[index] }}
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
                              }}
                            >
                              <Typography variant="h6" component="div">
                                {}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography variant="body2" color="text.secondary">
                            全体の{tagAndRate[tag]}%
                          </Typography>

                          <LinearProgress
                            variant="determinate"
                            value={tagAndRate[tag]}
                            sx={{
                              mt: 2,
                              height: 6,
                              borderRadius: 3,
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: colors[index],
                              },
                            }}
                          />
                        </Paper>
                      </Grid>
                    )
                  })}
                </Grid>
              </CardContent>
            </Card>
    </div>
  )
}

export default ViewAchieveByTag