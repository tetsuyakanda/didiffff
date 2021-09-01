import React, { useContext } from 'react';

import { TreeItem } from '@material-ui/lab';

import { SelectedFile } from 'App';
import { ProjectDiffFileItem } from 'ddapi/file';
import DiffMark from './DiffMark';

interface FileTreeProps {
  content: ProjectDiffFileItem;
  nodeId: string;
  path: string[];
}

const FileTreeItem = ({ content, nodeId, path }: FileTreeProps) => {
  const { selectFile } = useContext(SelectedFile);
  const onClick = () => selectFile(path);
  const label = (
    <div>
      <DiffMark diffInText={content.diffStatusText()} diffInTrace={content.diffStatusTrace()} />
      <span>{content.name}</span>
    </div>
  );
  return <TreeItem nodeId={nodeId} label={label} onClick={onClick} />;
};

export default FileTreeItem;
