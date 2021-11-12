import { createTheme } from '@mui/material/styles';
import { purple, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: purple[700],
    },
  },
  typography: {
    fontSize: 12,
  },
});

export default theme;
