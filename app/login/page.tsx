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
      <Button formAction={login}>Log in</Button>
      <Button formAction={signup}>Sign up</Button>
    </form>
  )
}