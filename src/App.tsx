import React from 'react';
import logo from './logo.svg';

import {
  CssBaseline,
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Drawer,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import theme from './theme';

const MyPaper = styled(Paper)({
  padding: '20px',
  margin: '20px',
});

const MyAppBar = styled(AppBar)({
  zIndex: theme.zIndex.drawer + 1,
});

const MyDrawer = styled(Drawer)({
  width: '200px',
  flexShrink: 0,
});

const Root = styled('div')({
  display: 'flex',
});

function App() {
  return (
    <Root className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyAppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className="title">
              dIDifFFf
            </Typography>
          </Toolbar>
        </MyAppBar>
        <MyDrawer variant="permanent">
          <Toolbar />
          <div>
            <MyPaper>File Tree</MyPaper>
          </div>
        </MyDrawer>
        <main>
          <Toolbar />
          <MyPaper className="App-header">
            <p>Source Code</p>
          </MyPaper>{' '}
          <MyPaper className="App-header">
            <p>Source Code</p>
          </MyPaper>
        </main>
      </ThemeProvider>
    </Root>
  );
}

export default App;
