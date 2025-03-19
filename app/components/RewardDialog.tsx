import medalAnimation from "@/public/animations/Animation - 1742351524507.json";
import { Dialog } from "@mui/material";
import React from 'react'

interface rewardProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RewardDialog:React.FC<rewardProps> = ({open, setOpen}) => {
  return (
    <div>
        <Dialog open={open} onClose={() => setOpen(false)}>

        </Dialog>
    </div>
  )
}

export default RewardDialog