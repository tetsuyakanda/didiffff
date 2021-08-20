import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import theme from 'theme';

const MyAppBar = styled(AppBar)({
  zIndex: theme.zIndex.drawer + 1,
});

const AppHeader: React.FC = () => (
  <MyAppBar position="fixed">
    <Toolbar>
      <Typography variant="h6">dIDifFFf</Typography>
    </Toolbar>
  </MyAppBar>
);

export default AppHeader;
