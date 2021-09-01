import React from 'react';

import { Toolbar, Paper, Drawer, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import usePromise from 'react-promise-suspense';

import AppHeader from 'components/organisms/AppHeader';
import FileTree from 'components/organisms/FileTree';
import NazonoView from 'components/organisms/NazonoView';
import { fetchTargetInfo, ProjectDiffDirectoryItem } from 'ddapi/directory';
import PrintJson from 'components/organisms/ProntJson';

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

const MainView = () => {
  const root: ProjectDiffDirectoryItem = usePromise(fetchTargetInfo, []);
  return (
    <Root>
      <AppHeader />
      <MyDrawer variant="permanent">
        <Toolbar />
        <div>
          <MyPaper>File Tree</MyPaper>
        </div>
        <FileTree root={root} />
      </MyDrawer>
      <main>
        <Toolbar />
        <Container maxWidth="sm">
          <NazonoView />
          <MyPaper>
            <p>Source Code</p>
          </MyPaper>
          <PrintJson root={root} />
        </Container>
      </main>
    </Root>
  );
};

export default MainView;
