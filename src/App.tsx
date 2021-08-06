import React, { useState } from 'react';

import { CssBaseline, ThemeProvider, Toolbar, Paper, Drawer } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import AppHeader from 'components/organisms/AppHeader';
import FileTree from 'components/organisms/FileTree';

import theme from 'theme';
import NazonoView from 'components/organisms/NazonoView';

type SelectedFileContext = {
  selectedFile: string;
  selectFile: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectedFile = React.createContext<SelectedFileContext>({} as SelectedFileContext);

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
  const [selectedFile, selectFile] = useState('');
  const value = { selectedFile, selectFile };

  return (
    <Root className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SelectedFile.Provider value={value}>
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
            <NazonoView />
            <MyPaper className="App-header">
              <p>Source Code</p>
            </MyPaper>
          </main>
        </SelectedFile.Provider>
      </ThemeProvider>
    </Root>
  );
}

export default App;
