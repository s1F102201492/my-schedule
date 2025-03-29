import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { signup } from '../login/actions'

const page = () => {
  return (
    <div>
        <Typography>Eメールアドレス</Typography>
        <TextField id="email" type='email' required />
        <Typography>パスワード</Typography>
        <TextField id="email" type="password" required />

        <Button type="submit" formAction={signup}>Sign up</Button>
    </div>
  )
}

export default page