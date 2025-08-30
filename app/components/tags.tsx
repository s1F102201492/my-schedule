import { JSX } from "react";
import { Psychology, Refresh, PsychologyAlt, Surfing, StarBorder, MedicalInformation, DirectionsRun, AutoAwesome, Mode, CurrencyYen, Group, Bedtime } from "@mui/icons-material";

export const taglist = [
    "健康",
    "運動",
    "美容",
    "マインド",
    "仕事・学習",
    "お金・節約",
    "人間関係",
    "睡眠",
    "趣味・クリエイティブ",
    "その他",
];

export const viewIcon: Record<string, JSX.Element> = {
    "健康": <MedicalInformation />,
    "運動": <DirectionsRun />,
    "美容": <AutoAwesome />,
    "マインド": <PsychologyAlt />,
    "仕事・学習": <Mode />,
    "お金・節約": <CurrencyYen />,
    "人間関係": <Group />,
    "睡眠": <Bedtime />,
    "趣味・クリエイティブ": <Surfing />,
    "その他": <StarBorder />,
  }
