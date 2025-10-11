"use client";

import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { LoadingModel } from "../../Models/models";

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
