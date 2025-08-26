"use client";

import Header from "@/app/components/Header";
import GPTRecommend from "@/app/components/addTask/GPTRecommend";
import SelfAddForm from "@/app/components/addTask/SelfAddForm";
import React, { useState } from "react";

const Page = () => {
    const [boolRecomPage, setBoolRecomPage] = useState(true);
    const handleBoolRecomPage = () => {
        setBoolRecomPage(!boolRecomPage);
    };

    return (
        <div>
            <Header />

            {boolRecomPage ? (
                <GPTRecommend
                    boolRecomPage={boolRecomPage}
                    handleBoolRecomPage={handleBoolRecomPage}
                />
            ) : (
                <SelfAddForm
                    boolRecomPage={boolRecomPage}
                    handleBoolRecomPage={handleBoolRecomPage}
                />
            )}
        </div>
    );
};

export default Page;
