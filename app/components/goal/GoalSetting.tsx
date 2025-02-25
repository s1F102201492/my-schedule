'use client';

import { Add, Delete } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';

interface dialogtype {
    open: boolean;
    onClose: () => void;
}

const GoalSetting: React.FC<dialogtype> = ({ open, onClose }) => {
    const [activeStep, setActiveStep] = useState(0); // 今が何ステップ目か
    const [completed, setCompleted] = useState<{ // kステップ目が完了しているか
        [k: number]: boolean;
    }>({});

    const [firstText, setFirstText] = useState<string>("");
    const inputFirstText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstText(e.target.value);
    }

    const [secondText, setSecondText] = useState<string>("");
    const inputSecondText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondText(e.target.value);
    }

    const [ThirdText, setThirdText] = useState<string>("");
    const inputThirdText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThirdText(e.target.value);
    }

    const [ForthText, setForthText] = useState<string>("");
    const inputForthText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForthText(e.target.value);
    }

    const steps: string[] = [ // ステップの内容
        "なりたい姿を設定",
        "モデル画像の設定",
        "現状の記録",
        "習慣の作成"
    ]


    const stepFormView = () => {
        switch(activeStep) {
            case 0:
                return (
                    <Box sx={{ my: 3 }}>
                        <TextField
                        fullWidth
                        label="なりたい姿"
                        multiline
                        rows={4}
                        value={firstText}
                        onChange={inputFirstText}
                        placeholder="具体的になりたい姿を記述してください"
                        />
                    </Box>
                )
            case 1:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                        モデルとなる画像をアップロード
                        </Typography>
                        <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="model-image-upload"
                        type="file"
                        // onChange={(e) => handleImageUpload(e, "model")}
                        />
                        <label htmlFor="model-image-upload">
                        <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
                            画像をアップロード
                        </Button>
                        </label>
                        {/* {goalState.modelImage && (
                            <Box sx={{ mt: 2 }}>
                            <img
                            src={goalState.modelImage || "/placeholder.svg"}
                            alt="Model"
                            style={{ maxWidth: "100%", maxHeight: 300 }}
                            />
                            </Box>
                        )} */}
                    </Box>
                )
            case 2:
                console.log(3);
                break;
            case 3:
                console.log(4);
                break;
        }
    }



  return (
    <div>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                目標を設定
            </DialogTitle>
            <DialogContent>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {stepFormView()}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                    <Button disabled={activeStep === 0} onClick={() => setActiveStep((prev) => prev - 1)} sx={{ mr: 1 }}>
                        戻る
                    </Button>
                    <Button
                    variant="contained"
                    onClick={() => {
                        if (activeStep === steps.length - 1) {
                        } else {
                        setActiveStep((prev) => prev + 1)
                        }
                    }}
                    >
                    {activeStep === steps.length - 1 ? "保存" : "次へ"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default GoalSetting