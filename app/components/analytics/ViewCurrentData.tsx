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
import React, { useEffect, useState } from 'react'
import theme from "../theme/theme";
import { ContributionGraph } from "./ContributionGraph";
import ViewAchieveByTag from "./ViewAchieveByTag";
import ViewUserAchieve from "./ViewUserAchieve";
import FullScreenLoading from "../parts/fullScreenLoading";

interface SwitchPageProps {
  switchCurrentPage: () => void;
}

const getGPTsentence = async () => {
    const res = await fetch("/api/chatgpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "praise"
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

  const [loading, setLoading] = useState(false);
  const [GPTSentence, setGPTSentence] = useState(null);

  const GPTfunc = async () => {
    try {
      setLoading(true);
      
      const sentence = await getGPTsentence();

      setGPTSentence(sentence.result)

    } catch {
      alert("GPTからの出力を読み取れませんでした。もう一度読み込んでください。")
    } finally {
      setLoading(false)
    }
    
  }

  useEffect(() => {

    GPTfunc();

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
            
            <Card elevation={2}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
                        あなたの現状
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography>
                      {GPTSentence}
                    </Typography>
                  </Box>
                </CardContent>
            </Card>

            <ViewUserAchieve />

            <ContributionGraph />

            
            
            <ViewAchieveByTag />

        </Stack>
      </Container>

      {loading && <FullScreenLoading open={loading} />}
    </div>
  )
}
