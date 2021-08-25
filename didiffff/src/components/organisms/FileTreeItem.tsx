import React, { useContext } from 'react';

import { ProjectDiffFile } from 'kurakuraberuberu';

import { SelectedFile } from 'App';
import NazonoTreeItem from 'components/atoms/NazonoTreeItem';

interface FileTreeProps {
  content: ProjectDiffFile;
  nodeId: string;
  path: string[];
}

const FileTreeItem = ({ content, nodeId, path }: FileTreeProps) => {
  const { selectFile } = useContext(SelectedFile);
  const handleClick = () => selectFile(path);
  return <NazonoTreeItem nodeId={nodeId} label={content.name} onClick={() => handleClick()} />;
};

export default FileTreeItem;
