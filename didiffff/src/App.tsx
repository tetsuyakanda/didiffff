import React, { Suspense, useState } from 'react';

import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import theme from 'theme';
import MainView from 'components/view/MainView';
import { TokenWithTrace } from 'ddapi/token';

type SelectedFileContext = {
  selectedFile: string[];
  selectFile: React.Dispatch<React.SetStateAction<string[]>>;
};

type SelectedTokenContext = {
  selectedToken: TokenWithTrace;
  selectToken: React.Dispatch<React.SetStateAction<TokenWithTrace>>;
};

export const SelectedFile = React.createContext<SelectedFileContext>({} as SelectedFileContext);
export const SelectedToken = React.createContext<SelectedTokenContext>({} as SelectedTokenContext);

const Root = styled('div')({
  display: 'flex',
});

function App() {
  const [selectedFile, selectFile] = useState(['']);
  const valueF = { selectedFile, selectFile };
  const [selectedToken, selectToken] = useState({} as TokenWithTrace);
  const valueT = { selectedToken, selectToken };

  return (
    <Root className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SelectedFile.Provider value={valueF}>
          <Suspense fallback={<p>Loading...</p>}>
            <SelectedToken.Provider value={valueT}>
              <MainView />
            </SelectedToken.Provider>
          </Suspense>
        </SelectedFile.Provider>
      </ThemeProvider>
    </Root>
  );
}

export default App;
