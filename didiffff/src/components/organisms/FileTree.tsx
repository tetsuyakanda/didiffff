import React, { Suspense } from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';
import usePromise from 'react-promise-suspense';

import { ProjectDItem } from 'kurakuraberuberu';

import { fetchTargetInfo } from 'ddapi/api';
import FileTreeItem from './FileTreeItem';

interface ProjectTreeProps {
  content: ProjectDItem;
  nodeId: string;
  path: string;
}

const ProjectTreeItem = (props: ProjectTreeProps) => {
  const { content, nodeId, path } = props;

  if (content.type === 'dir') {
    const children = content.children.map((c, i) => {
      const id = `${nodeId}-${i}`;
      const nPath = `${path}/${c.name}`;
      return <ProjectTreeItem content={c} nodeId={id} key={id} path={nPath} />;
    });

    return (
      <TreeItem nodeId={nodeId} label={content.name}>
        {children}
      </TreeItem>
    );
  } else return <FileTreeItem nodeId={nodeId} content={content} path={path} />;
};

const ProjectTree = () => {
  const root: ProjectDItem = usePromise(fetchTargetInfo, []);

  return (
    <TreeView defaultCollapseIcon="⊟" defaultExpandIcon="⊞">
      <ProjectTreeItem content={root} nodeId="0" path={root.name} />
    </TreeView>
  );
};

const FileTree = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <ProjectTree />
  </Suspense>
);

export default FileTree;
