import React, { useContext } from 'react';

import { SelectedFile } from 'App';
import { ProjectItemFile } from 'nod4japi/project';
import NazonoTreeItem from 'components/atoms/NazonoTreeItem';

interface FileTreeProps {
  content: ProjectItemFile;
  nodeId: string;
  path: string;
}

const FileTreeItem = ({ content, nodeId, path }: FileTreeProps) => {
  const { selectFile } = useContext(SelectedFile);
  const handleClick = () => selectFile(path);
  return <NazonoTreeItem nodeId={nodeId} label={content.name} onClick={() => handleClick()} />;
};

export default FileTreeItem;
