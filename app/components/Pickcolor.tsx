'use client';

import React, { useState } from 'react';
import styled from 'styled-components';


interface PickcolorProps {
    selectColor: string;
    setSelectColor: React.Dispatch<React.SetStateAction<string>>;
}

const colorsArray: string[] = [
    "#FF0000", "#FF7F00", "#FFFF00", "#7FFF00",
    "#00FF00", "#00FF7F", "#00FFFF", "#007FFF",
    "#0000FF", "#7F00FF", "#FF00FF", "#FF007F",
    "#800000", "#808000", "#008080", "#800080"
  ];

// スタイリング定義
const ColorButton = styled.button<{ color: string }>`
  width: 35px;
  height: 35px;
  border-radius: 50%; /* 丸いボタン */
  border: 2px solid #000;
  background-color: ${(props) => props.color}; /* 選択された色 */
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Palette = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 10;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Pickcolor: React.FC<PickcolorProps> = ({ selectColor, setSelectColor }) => {
  const [showPalette, setShowPalette] = useState(false);

  return (
    <Container>
      色
      <ColorButton type='button' color={selectColor} onClick={() => setShowPalette(!showPalette)} />
      {showPalette && (
        <Palette>
          {colorsArray.map((color) => (
            <ColorButton
              type='button'
              key={color}
              color={color}
              onClick={() => {
                setSelectColor(color);
                setShowPalette(false); // 選択後にパレットを閉じる
              }}
            />
          ))}
        </Palette>
      )}
    </Container>
  );
};

export default Pickcolor