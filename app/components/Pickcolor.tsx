'use client';

import React, { useState } from 'react'

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

const Pickcolor: React.FC<PickcolorProps> = ({selectColor, setSelectColor}) => {
    

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">色</h1>
      <div className="grid grid-cols-4 gap-2">
        {colorsArray.map((color) => (
          <button
            key={color}
            className="w-12 h-12 rounded-lg border-2"
            style={{ backgroundColor: color, borderColor: selectColor === color ? "#000" : "#fff" }}
            onClick={() => setSelectColor(color)}
          />
        ))}
      </div>
      <div className="w-4 h-4 rounded-lg border-2" style={{ backgroundColor: selectColor }}>
      </div>
    </div>
  )
}

export default Pickcolor