"use client";

import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { LoadingModel } from "../../Models/models";

/**
 * パルスアニメーションを使用する軽量なローディングコンポーネント
 * 主にボタン内や小さな領域での読み込み待ちに使用します。
 * * @component
 * @param {LoadingModel} props - ローディング表示フラグ(loading)
 */
const PulseLoading: React.FC<LoadingModel> = ({ loading }) => {
    return (
        <div>
            <PulseLoader
                loading={loading}
                color='#dcdcdc'
            />
        </div>
    );
};

export default PulseLoading;
