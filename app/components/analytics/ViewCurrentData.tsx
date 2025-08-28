import {
  Box,
  Card,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from 'react'
import theme from "../theme/theme";
import { ContributionGraph } from "./ContributionGraph";

interface SwitchPageProps {
  switchCurrentPage: () => void;
}

export const ViewCurrentData: React.FC<SwitchPageProps> = ({ switchCurrentPage }) => {

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
  
  const mockTrendAnalysis = [
    {
      period: "過去7日間",
      insight:
        "平日の朝の時間帯（7-9時）に最も高い生産性を示しています。特に学習系タスクの完了率が95%と非常に高い水準です。",
      recommendation: "この時間帯をより活用し、重要度の高いタスクを集中的に配置することをお勧めします。",
      score: 92,
    },
    {
      period: "過去30日間",
      insight:
        "週末の健康管理タスクの完了率が平日と比較して40%低下しています。一方で、キャリア関連のタスクは安定した進捗を維持。",
      recommendation: "週末の健康管理ルーティンを見直し、より実行しやすい小さなタスクに分割することを提案します。",
      score: 78,
    },
    {
      period: "過去90日間",
      insight:
        "長期的な視点で見ると、月初めの目標設定が明確な月ほど全体的な達成率が高い傾向があります。特に2月は85%の高達成率。",
      recommendation: "月初めの目標設定プロセスを標準化し、SMART目標の設定を継続することで更なる向上が期待できます。",
      score: 85,
    },
  ]

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
        </Stack>
      </Container>
    </div>
  )
}
