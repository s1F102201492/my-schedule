'use client'

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const Header = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            My schedule
        </Typography>
          <Stack direction="row" spacing={6} sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Box>
              <Button variant="contained">Text</Button>
            </Box>
            <Box>
              <Typography>Right</Typography>
            </Box>
            <Box>
              <Typography>Right</Typography>
            </Box>
            <Box>
              <Typography>Right</Typography>
            </Box>
          </Stack>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;