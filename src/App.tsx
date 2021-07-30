import React from 'react';

import { CssBaseline, ThemeProvider, Toolbar, Paper, Drawer } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import AppHeader from 'components/organisms/AppHeader';
import FileTree from 'components/organisms/FileTree';

import theme from 'theme';

const MyPaper = styled(Paper)({
  padding: '20px',
  margin: '20px',
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
        <AppHeader />
        <MyDrawer variant="permanent">
          <Toolbar />
          <div>
            <MyPaper>File Tree</MyPaper>
          </div>
          <FileTree />
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
