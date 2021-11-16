import React, { Suspense, useState } from 'react';

import { CssBaseline, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import styled from '@emotion/styled';
import '@fontsource/dejavu-mono';

import theme from 'theme';
import MainView from 'components/view/MainView';
import { TokenWithTrace } from 'ddapi/token';
import { DiffStatusToken } from 'ddapi/diffStatus';
import { TokenWithValues } from 'kurakuraberuberu';

// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }

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

const Root = styled.div({
  display: 'flex',
});

const nullToken: TokenWithTrace = {
  _token: {} as TokenWithValues,
  image: '',
  startColumn: undefined,
  endColumn: undefined,
  value1: undefined,
  value2: undefined,
  diffStatus: 'noDiff',
};

function App() {
  const [selectedFile, selectFile] = useState(['']);
  const valueF = { selectedFile, selectFile };
  const [selectedToken, selectToken] = useState(nullToken);
  const valueT = { selectedToken, selectToken };

  return (
    <Root className="App">
      <StyledEngineProvider injectFirst>
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
      </StyledEngineProvider>
    </Root>
  );
}

export default App;
