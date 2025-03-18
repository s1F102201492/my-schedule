'use client';

import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import { Box, Button } from "@mui/material";

interface confettiProps {
    showConfetti: boolean,
    setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Confetti:React.FC<confettiProps> = ({ showConfetti, setShowConfetti }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const confettiComplete = () => {
    setShowConfetti(false);
  };

  return (
    <Box sx={{ zIndex: 10, flexBasis: "8.33%", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ReactConfetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={150}
          recycle={false}
          colors={["#FF0000", "#FF9800", "#FFEB3B", "#4CAF50", "#2196F3", "#9C27B0"]} // 赤, オレンジ, 黄, 緑, 青, 紫
          opacity={0.9}
          gravity={0.3}
          initialVelocityY={20}
          confettiSource={{ x: dimensions.width / 2, y: dimensions.height, w: 0, h: 0 }}
          tweenDuration={3000}
          onConfettiComplete={confettiComplete}
        />

    </Box>
  );
};

export default Confetti;
