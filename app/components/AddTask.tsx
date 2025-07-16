import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl } from '@mui/material';
import React from 'react'

interface FormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    locate: string;
}

const AddTask:React.FC<FormProps> = ({ open, setOpen, locate }) => {
    // ここでTodoテーブルに追加する全てのカラムのStateをここで管理
    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {

    }

    return (
        <div>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        
                        <FormControl fullWidth sx={{my: 4}}>
                            
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default AddTask