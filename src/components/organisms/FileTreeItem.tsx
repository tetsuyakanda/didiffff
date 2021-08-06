import React, { useContext } from 'react';

import { SelectedFile } from 'App';
import { ProjectItemFile } from 'nod4japi/project';
import NazonoTreeItem from 'components/atoms/NazonoTreeItem';

interface FileTreeProps {
  content: ProjectItemFile;
  nodeId: string;
}

const FileTreeItem = ({ content, nodeId }: FileTreeProps) => {
  const { selectedFile, selectFile } = useContext(SelectedFile);
  const o = (a: string) => {
    selectFile(a);
  };
  return <NazonoTreeItem nodeId={nodeId} label={content.name} onClick={() => o(content.name)} />;
};

export default FileTreeItem;
