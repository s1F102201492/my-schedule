"use client";

import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

interface loadingType {
    loading: boolean;
}

const PulseLoading: React.FC<loadingType> = ({ loading }) => {
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
