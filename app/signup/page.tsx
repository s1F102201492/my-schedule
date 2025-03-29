import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { signup } from './action'

const page = () => {
  return (
    <div>
      <form>
        <Typography>Eメールアドレス</Typography>
        <TextField id="email" name="email" type='email' required />
        <Typography>パスワード</Typography>
        <TextField id="password" name="password" type="password" required />

        <Button type="submit" formAction={signup}>Sign up</Button>
      </form>
    </div>
  )
}

export default page