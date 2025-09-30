import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface modelPageProps {
    switchModelPage: () => void;
    switchCurrentPage: () => void;
}

export const AnalyticsCardPage: React.FC<modelPageProps> = ({ switchModelPage, switchCurrentPage}) => {
  return (
    <div>
        {/* PC用 */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Card
                    onClick={switchModelPage}
                    sx={{
                        maxWidth: 280,
                        maxHeight: "100%",
                        cursor: "pointer",
                        mx: 2,
                        "&:hover": {
                            backgroundColor: "#dcdcdc",
                        },
                    }}>
                    <CardMedia
                        component='img'
                        image='img/business-3695073_640.jpg'
                        sx={{ width: 400, height: 250, objectFit: "fill" }}
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
                        mx: 2,
                        "&:hover": {
                            backgroundColor: "#dcdcdc",
                        }
                    }}>
                    <CardMedia
                        component='img'
                        image='img/data_img.jpg'
                        sx={{ width: 400, height: 250, objectFit: "fill" }}
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
        </Box>

        {/* モバイル用 */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Card
                    onClick={switchModelPage}
                    sx={{
                        maxWidth: "100%",
                        height: 400,
                        cursor: "pointer",
                        mb: 3,
                        mx: 2,
                        "&:hover": {
                            backgroundColor: "#dcdcdc",
                        },
                    }}>
                    <CardMedia
                        component='img'
                        image='img/business-3695073_640.jpg'
                        sx={{ width: "100%", height: 230, objectFit: "fill" }}
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
                        maxWidth: "100%",
                        height: 400,
                        cursor: "pointer",
                        mx: 2,
                        "&:hover": {
                            backgroundColor: "#dcdcdc",
                        }
                    }}>
                    <CardMedia
                        component='img'
                        image='img/data_img.jpg'
                        sx={{ width: "100%", height: 230, objectFit: "fill" }}
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
        </Box>
    </div>
  )
}
