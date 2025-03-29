import { Button, Link, TextField, Typography } from '@mui/material'
import { login } from './actions'

export default function LoginPage() {
  return (
    <form>
      <Typography>Eメールアドレス</Typography>
      <TextField id="email" type='email' required />
      <Typography>パスワード</Typography>
      <TextField id="email" type="password" required />
      
      {/* ✅Server Actionsでログイン、サインアップ */}
      <Button type="submit" formAction={login}>Log in</Button>
      <Link href="/signup" underline='hover'>アカウントを持っていない方</Link>
      
    </form>
  )
}