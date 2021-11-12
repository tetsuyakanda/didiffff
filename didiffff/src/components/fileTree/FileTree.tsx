import React from 'react';
import { TreeView, TreeItem } from '@mui/lab';

import { ProjectDiffItemModel } from 'ddapi/api';
import { ProjectDiffDirectoryItem } from 'ddapi/directory';
import FileTreeItem from './FileTreeItem';
import DiffMark from './DiffMark';

interface ProjectTreeItemProps {
  content: ProjectDiffItemModel;
  nodeId: string;
  path: string[];
}

// actually, this Item represents a directory
const ProjectTreeItem = (props: ProjectTreeItemProps) => {
  const { content, nodeId, path } = props;

  if (content.type === 'dir') {
    const children = content.children.map((c, i) => {
      const id = `${nodeId}-${i}`;
      const nPath = [...path, c.name];
      return <ProjectTreeItem content={c} nodeId={id} key={id} path={nPath} />;
    });

    const label = (
      <>
        <DiffMark diffInText={content.diffStatusText} diffInTrace={content.diffStatusTrace} />
        <span>{content.name}</span>
      </>
    );

    return (
      <TreeItem nodeId={nodeId} label={label}>
        {children}
      </TreeItem>
    );
  } else return <FileTreeItem nodeId={nodeId} content={content} path={path} />;
};

interface FileTreeProps {
  root: ProjectDiffDirectoryItem;
}

/*
 * Tree View
 */
const FileTree = (props: FileTreeProps) => {
  const root = props.root;
  return (
    <TreeView defaultCollapseIcon="⊟" defaultExpandIcon="⊞">
      <ProjectTreeItem content={root} nodeId="0" path={[root.name]} />
    </TreeView>
  );
};

export default React.memo(FileTree);
