import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface modelPageProps {
    switchModelPage: () => void;
    switchCurrentPage: () => void;
}

export const AnalyticsCardPage: React.FC<modelPageProps> = ({ switchModelPage, switchCurrentPage}) => {
  return (
    <div>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Card
                onClick={switchModelPage}
                sx={{
                    maxWidth: 280,
                    maxHeight: "100%",
                    cursor: "pointer",
                    mt: 6,
                    mx: 2,
                    "&:hover": {
                        backgroundColor: "#dcdcdc",
                    },
                }}>
                <CardMedia
                    component='img'
                    image='img/business-3695073_640.jpg'
                    sx={{ width: 350, height: 250, objectFit: "fill" }}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant='h5'
                        component='div'>
                        理想の自分をイメージしてみる
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            color: "text.secondary",
                            whiteSpace: "pre-line",
                        }}>
                        あなたが今頑張っている習慣を達成した理想のあなたをイメージしてみましょう！
                    </Typography>
                </CardContent>
            </Card>
            
            <Card
                onClick={switchCurrentPage}
                sx={{
                    maxWidth: 280,
                    maxHeight: "100%",
                    cursor: "pointer",
                    mt: 6,
                    mx: 2,
                    "&:hover": {
                        backgroundColor: "#dcdcdc",
                    }
                }}>
                <CardMedia
                    component='img'
                    image='img/business-3695073_640.jpg'
                    sx={{ width: 350, height: 250, objectFit: "fill" }}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant='h5'
                        component='div'>
                        今までの道のりを確認する
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            color: "text.secondary",
                            whiteSpace: "pre-line",
                        }}>
                        ここであなたが今まで行ってきた実績を確認できます。
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    </div>
  )
}
