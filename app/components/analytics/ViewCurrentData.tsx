import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from 'react'
import theme from "../theme/theme";
import { ContributionGraph } from "./ContributionGraph";
import FadeLoading from "../parts/FadeLoading";
import { GPTAnalyticsModel } from "@/app/Models/models";
import { Psychology, Refresh } from "@mui/icons-material";
import { viewIcon } from "../tags";

interface SwitchPageProps {
  switchCurrentPage: () => void;
}

const getGPTReview = async () => {
  const res = await fetch("/api/chatgpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "analytics"
    })
  });

  if (!res.ok) {
    console.error("APIエラー");
    alert("APIリクエストに失敗しました。");
    return;
}

  const data = await res.json();
  
  return data;
}

export const ViewCurrentData: React.FC<SwitchPageProps> = ({ switchCurrentPage }) => {

  const [GPTLoading, setGPTLoading] = useState<boolean>(false);
  const [GPTReview, setGPTReview] = useState<GPTAnalyticsModel[]>([]);

  const mockStats = {
    totalTasks: 156,
    completedTasks: 134,
    streakDays: 12,
    categories: {
      学習: 45,
      健康: 38,
      キャリア: 32,
      人間関係: 19,
    },
  }
  

  const setFunc_GPTReview = async () => {
    try {
      setGPTLoading(true);
      
      const reviews = await getGPTReview();

      const setData = JSON.parse(reviews.result);

      setGPTReview(setData);

    } catch (error) {
      console.error(error)
      alert("ChatGPTからの分析を取得できませんでした。もう一度読み込んでください。");

    } finally {
      setGPTLoading(false);

    }
  }

  useEffect(() => {
    setFunc_GPTReview();
  }, [])

  return (
    <div>
      <Tooltip title='戻る'>
        <IconButton
            onClick={() => switchCurrentPage()}
            sx={{ ml: 2, mt: 2 }}>
            <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ mx: 4, mt: 2 }}>
          <Typography variant='h5'>
              あなたの今までの実績
          </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
          <Stack spacing={4}>
            {/* 統計サマリー */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                    {mockStats.completedTasks}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    完了タスク数
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#f44336" }}>
                    70%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    達成率
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#ff9800" }}>
                    {mockStats.streakDays}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    連続達成日数
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#2196f3" }}>
                    {Object.keys(mockStats.categories).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    アクティブカテゴリ
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <ContributionGraph />

            <Card elevation={2}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Psychology sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 32 }} />
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
                        AI傾向分析
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        あなたの行動パターンから導き出された洞察
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    onClick={() => setFunc_GPTReview()}
                    variant="outlined"
                    startIcon={<Refresh />}
                  >
                    再分析
                  </Button>
                </Box>

                {GPTLoading 
                ? <FadeLoading loading={GPTLoading} /> 
                : <Grid container spacing={3}>
                {GPTReview.map((analysis, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <Paper
                      sx={{
                        p: 3,
                        height: "100%",
                        border: "2px solid #e0e0e0",
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", mb: 2 }}>
                        <Box sx={{ mr: 2, color: theme.palette.primary.main }} >
                          {viewIcon[analysis.tag]}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>
                          {analysis.tag}
                        </Typography>
                        
                      </Box>

                      <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                        <strong>洞察:</strong> {analysis.past}
                      </Typography>

                      <Typography variant="body2" sx={{ lineHeight: 1.6, color: "text.secondary" }}>
                        <strong>推奨:</strong> {analysis.next}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>}
                
              </CardContent>
            </Card>
            
        </Stack>
      </Container>
    </div>
  )
}
