import { Button, TextField, Typography } from '@mui/material'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form>
      <Typography>Eメールアドレス</Typography>
      <TextField type='email' required />
      <Typography>パスワード</Typography>
      <TextField type="password" required />
      
      {/* ✅Server Actionsでログイン、サインアップ */}
      <Button type="submit" formAction={login}>Log in</Button>
      <Button type="submit" formAction={signup}>Sign up</Button>
    </form>
  )
}