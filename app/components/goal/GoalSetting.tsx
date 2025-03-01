'use client';

import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';

const GoalSetting = () => {
    const [text, setText] = useState<string>("");
    const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const [img, setImg] = useState<string>("");
    const handleSetImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        console.log(file)
        if (!file) {
            return ;
        } else {
            const imageUrl = URL.createObjectURL(file);
            setImg(imageUrl);
        }
    }

  return (
    <div>
     <Box sx={{ m: 4 }}>
      <Typography variant='h5'>
        おすすめの習慣を提案
      </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant='subtitle1'>
            テキスト
          </Typography>
          <TextField
          sx={{ mt: 1 }}
          fullWidth
          rows={4}
          multiline
          required
          value={text}
          onChange={inputText}
           />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant='subtitle1'>
            画像をアップロード
          </Typography>
          <input
          type="file"
          style={{ display: "none" }}
          accept='image/*'
          id='img-upload'
          onChange={handleSetImg} />
          <Box sx={{ mt: 1}}>
            <label htmlFor='img-upload'>
              <Button variant="outlined" component="span" startIcon={<ImageIcon />}>   
                  画像をアップロード
              </Button>
              {img && <img src={img} />}
            </label>
          </Box>
        </Box>
     </Box>
    </div>
  )
}

export default GoalSetting