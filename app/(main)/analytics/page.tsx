'use client';

import React, { useContext, useState } from 'react';
import Header from '../../components/Header';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import AIrecommend from '../../components/addTask/GPTRecommend';
import Model from '../../components/analytics/Model';
import { TodoContext } from '../../context/TodoContext';
import { AuthContext } from '../../context/AuthContext';
import FadeLoading from '../../components/parts/FadeLoading';
import NullUser from '../../components/NullUser';

const page = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { loading } = todoContext;

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            'AuthContext is undefined. Make sure to use AuthProvider.',
        );
    }

    const { loginUser } = authContext;

    // 理想の自分ページの開閉を管理
    const [modelPage, setModelPage] = useState<boolean>(false);
    const handleModelPage = () => {
        setModelPage(true);
    }

    return (
        <div>
            <Header />
            
            {loginUser ? (
                <>
                <Typography variant="h4" sx={{ m: 4 }}>
                    {loginUser.username} さん！ようこそ！
                </Typography>
                {loading ? (
                    <FadeLoading loading={loading} />
                ) : (
                    <>
                    {modelPage ?
                        (<Model setModelPage={setModelPage}/>):
                        <Box sx={{ display:"flex", justifyContent:"space-evenly"}}>
                            <Card onClick={handleModelPage}
                            sx={{ maxWidth: 280, maxHeight: '100%',
                                cursor: 'pointer', mt: 6, mx: 2
                                }} >
                                <CardMedia
                                component="img"
                                image='img/business-3695073_640.jpg'
                                sx={{ width: 350, height: 250, objectFit: "fill" }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        理想の自分をイメージしてみる
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace:"pre-line" }}>
                                    {`あなたが今頑張っている習慣を
                                    達成した理想のあなたをイメージしてみましょう！`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                        }
                    </>
                )}
                </>
            ) : (
                <NullUser />
            )}
        </div>
    );
};

export default page;
