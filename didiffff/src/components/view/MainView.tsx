import React from 'react';

import { Drawer, Container } from '@mui/material';
import styled from '@emotion/styled';
import usePromise from 'react-promise-suspense';

import AppHeader from 'components/organisms/AppHeader';
import FileTree from 'components/fileTree/FileTree';
import NazonoView from 'components/organisms/NazonoView';
import { fetchTargetInfo, ProjectDiffDirectoryItem } from 'ddapi/directory';
import PrintJson from 'components/organisms/ProntJson';
import ValueList from 'components/value/ValueList';
import NazonoPanel from 'components/atoms/NazonoPanel';

const MyDrawer = styled(Drawer)({
  width: '600px',
  flexShrink: 0,
});

const Root = styled.div({
  display: 'flex',
  height: '100%',
});

const MainView = () => {
  const root: ProjectDiffDirectoryItem = usePromise(fetchTargetInfo, []);
  return (
    <Root>
      <MyDrawer variant="permanent">
        <AppHeader />
        <div>
          <NazonoPanel text="File Tree" />
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
