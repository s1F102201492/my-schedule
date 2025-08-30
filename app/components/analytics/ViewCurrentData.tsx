import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from 'react'
import theme from "../theme/theme";
import { ContributionGraph } from "./ContributionGraph";
import ViewAchieveByTag from "./ViewAchieveByTag";
import ViewUserAchieve from "./ViewUserAchieve";

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
            
            <ViewUserAchieve />

            <ContributionGraph />

            
            
            <ViewAchieveByTag />

        </Stack>
      </Container>
    </div>
  )
}
