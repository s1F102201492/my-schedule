import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { AnalyticsPageProps } from '../../Models/models';

/**
 * 分析ページのメインレイアウトコンポーネント
 * ユーザーのタスク達成状況を様々な角度から可視化するダッシュボードを表示します。
 * * 主な機能:
 * - データのロード状態管理
 * - 以下の分析コンポーネントの配置:
 * - `ViewCurrentData`: 現在のストリークや達成数
 * - `ViewAchieveByTag`: タグごとの達成率
 * - `ContributionGraph`: 日別の活動量（草）グラフ
 * - `ViewUserAchieve`: 総合的な達成状況サマリー
 * * @component
 */
export const AnalyticsCardPage: React.FC<AnalyticsPageProps> = ({ setModelPage, setViewCurrentPage}) => {
  return (
    <div>
        {/* PC用 */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Card
                    onClick={() => setModelPage(true)}
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
                    onClick={() => setViewCurrentPage(true)}
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
                    onClick={() => setModelPage(true)}
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
                    onClick={() => setViewCurrentPage(true)}
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
