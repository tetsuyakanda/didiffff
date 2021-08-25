import React, { Suspense, useState } from 'react';

import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import theme from 'theme';
import MainView from 'components/view/MainView';

type SelectedFileContext = {
  selectedFile: string[];
  selectFile: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SelectedFile = React.createContext<SelectedFileContext>({} as SelectedFileContext);

const Root = styled('div')({
  display: 'flex',
});

function App() {
  const [selectedFile, selectFile] = useState(['']);
  const value = { selectedFile, selectFile };

  return (
    <Root className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SelectedFile.Provider value={value}>
          <Suspense fallback={<p>Loading...</p>}>
            <MainView />
          </Suspense>
        </SelectedFile.Provider>
      </ThemeProvider>
    </Root>
  );
}

export default App;
