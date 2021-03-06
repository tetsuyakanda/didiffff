import React, { useContext } from 'react';

import { TreeItem } from '@mui/lab';

import { ProjectDiffFileItem } from 'ddapi/file';

import { SelectedFile } from 'App';
import DiffMark from './DiffMark';

interface FileTreeProps {
  content: ProjectDiffFileItem;
  nodeId: string;
  path: string[];
}

// this Item represents a file
const FileTreeItem = ({ content, nodeId, path }: FileTreeProps) => {
  const { selectFile } = useContext(SelectedFile);
  const onClick = () => selectFile(path);
  const label = (
    <>
      <DiffMark diffInText={content.diffStatusText} diffInTrace={content.diffStatusTrace} />
      <span>{content.name}</span>
    </>
  );
  return <TreeItem nodeId={nodeId} label={label} onClick={onClick} />;
};

export default FileTreeItem;
