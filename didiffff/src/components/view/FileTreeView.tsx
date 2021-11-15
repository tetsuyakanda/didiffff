import React from 'react';

import { ProjectDiffDirectoryItem } from 'ddapi/directory';

import MyPanel from 'components/atoms/MyPanel';
import AppHeader from 'components/view/AppHeader';
import FileTree from '../fileTree/FileTree';

interface FileTreeViewProps {
  root: ProjectDiffDirectoryItem;
}

const FileTreeView = (props: FileTreeViewProps) => (
  <>
    <AppHeader />
    <MyPanel>File Tree</MyPanel>
    <FileTree root={props.root} />
  </>
);

export default FileTreeView;
