import { Button, Link, TextField, Typography } from '@mui/material'
import { login } from './action'

export default function LoginPage() {
  return (
    <form>
      <Typography>Eメールアドレス</Typography>
      <TextField id="email" name='email' type='email' required />
      <Typography>パスワード</Typography>
      <TextField id="password" name='password' type="password" required />
      
      {/* ✅Server Actionsでログイン、サインアップ */}
      <Button type="submit" formAction={login}>Log in</Button>
      <Link href="/signup" underline='hover'>アカウントを持っていない方</Link>
      
    </form>
  )
}