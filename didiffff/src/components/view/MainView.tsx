import React from 'react';

import { Toolbar, Paper, Drawer, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import usePromise from 'react-promise-suspense';

import AppHeader from 'components/organisms/AppHeader';
import FileTree from 'components/fileTree/FileTree';
import NazonoView from 'components/organisms/NazonoView';
import { fetchTargetInfo, ProjectDiffDirectoryItem } from 'ddapi/directory';
import PrintJson from 'components/organisms/ProntJson';
import ValueList from 'components/value/ValueList';

const MyPaper = styled(Paper)({
  padding: '20px',
  margin: '20px',
});

const MyDrawer = styled(Drawer)({
  width: '600px',
  flexShrink: 0,
});

const Root = styled('div')({
  display: 'flex',
  height: '100%',
});

const SView = styled('div')({
  position: 'sticky',
  top: 0,
});

const MainView = () => {
  const root: ProjectDiffDirectoryItem = usePromise(fetchTargetInfo, []);
  return (
    <Root>
      <MyDrawer variant="permanent">
        <AppHeader />
        <Toolbar />
        <div>
          <MyPaper>File Tree</MyPaper>
        </div>
        <FileTree root={root} />
      </MyDrawer>
      <main>
        <Container maxWidth="xl">
          <NazonoView />
          <PrintJson root={root} />
        </Container>
      </main>
      <Drawer variant="permanent" anchor="right">
        <ValueList />
      </Drawer>
    </Root>
  );
};

export default MainView;
