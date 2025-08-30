import { Psychology, Refresh } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FadeLoading from '../parts/FadeLoading'
import Grid from "@mui/material/Grid2";
import theme from '../theme/theme';
import { viewIcon } from '../tags';
import { GPTAnalyticsModel } from '@/app/Models/models';

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

const AITrends = () => {

  const [GPTLoading, setGPTLoading] = useState<boolean>(false);
  const [GPTReview, setGPTReview] = useState<GPTAnalyticsModel[]>([]);

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
    </div>
  )
}

export default AITrends