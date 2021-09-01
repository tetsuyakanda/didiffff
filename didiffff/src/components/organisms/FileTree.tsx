import React from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';

import { ProjectDiffItem } from 'kurakuraberuberu';

import { ProjectDiffDirectoryItem } from 'ddapi/directory';
import FileTreeItem from './FileTreeItem';

interface ProjectTreeItemProps {
  content: ProjectDiffItem;
  nodeId: string;
  path: string[];
}

const ProjectTreeItem = (props: ProjectTreeItemProps) => {
  const { content, nodeId, path } = props;

  if (content.type === 'dir') {
    const children = content.children.map((c, i) => {
      const id = `${nodeId}-${i}`;
      const nPath = [...path, c.name];
      return <ProjectTreeItem content={c} nodeId={id} key={id} path={nPath} />;
    });

    return (
      <TreeItem nodeId={nodeId} label={content.name}>
        {children}
      </TreeItem>
    );
  } else return <FileTreeItem nodeId={nodeId} content={content} path={path} />;
};

interface FileTreeProps {
  root: ProjectDiffDirectoryItem;
}

const FileTree = (props: FileTreeProps) => {
  const root = props.root;
  return (
    <TreeView defaultCollapseIcon="⊟" defaultExpandIcon="⊞">
      <ProjectTreeItem content={root} nodeId="0" path={[root.name]} />
    </TreeView>
  );
};

export default FileTree;
