"use client";

import React, { useContext, useState } from "react";
import Model from "../../components/analytics/Model";
import { TodoContext } from "../../context/TodoContext";
import { AuthContext } from "../../context/AuthContext";
import { ViewCurrentData } from "@/app/components/analytics/ViewCurrentData";
import { AnalyticsCardPage } from "@/app/components/analytics/AnalyticsCardPage";

const Page = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            "AuthContext is undefined. Make sure to use AuthProvider.",
        );
    }

    // 理想の自分ページの開閉を管理
    const [modelPage, setModelPage] = useState<boolean>(false);
    const switchModelPage = () => {
        setModelPage(!modelPage);
    };

    // 現在地の自分を知るページの開閉を管理
    const [viewCurrentPage, setViewCurrentPage] = useState(false);
    const switchCurrentPage = () => {
        setViewCurrentPage(!viewCurrentPage)
    }

    return (
        <div>

            { modelPage && !viewCurrentPage
                ? <Model switchPage={switchModelPage} />
                    : !modelPage && viewCurrentPage
                        ? <ViewCurrentData switchPage={switchCurrentPage} />
                    : <AnalyticsCardPage
                setModelPage={setModelPage}
                setViewCurrentPage={setViewCurrentPage}
                />
            }
        </div>
    );
};

export default Page;
