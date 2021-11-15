import React from 'react';

import { Grid } from '@mui/material';
import usePromise from 'react-promise-suspense';

import { fetchTargetInfo, ProjectDiffDirectoryItem } from 'ddapi/directory';

import ValueList from 'components/value/ValueList';
import FileTreeView from './FileTreeView';
import SourceCodeView from './SourceCodeView';

const MainView = () => {
  const root: ProjectDiffDirectoryItem = usePromise(fetchTargetInfo, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <FileTreeView root={root} />
      </Grid>
      <Grid item xs={6}>
        <SourceCodeView root={root} />
      </Grid>
      <Grid item xs={3}>
        <ValueList />
      </Grid>
    </Grid>
  );
};

export default MainView;
