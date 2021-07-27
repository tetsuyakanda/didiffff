import React from 'react';
import logo from './logo.svg';

import { CssBaseline, ThemeProvider, AppBar, Toolbar, Typography, Paper } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import theme from './theme';

const MyPaper = styled(Paper)({
  padding: '20px',
  margin: '20px',
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="title">
              dIDifFFf
            </Typography>
          </Toolbar>
        </AppBar>
        <MyPaper className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reloadoooo.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </MyPaper>
      </ThemeProvider>
    </div>
  );
}

export default App;
