import React, { Suspense, useState } from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';
import usePromise from 'react-promise-suspense';
import { fetchFileInfo } from 'nod4japi/api';
import { ProjectItemModel, ProjectModel } from 'nod4japi/project';
import FileTreeItem from './FileTreeItem';

interface ProjectTreeProps {
  content: ProjectItemModel;
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
  const initialProject: ProjectModel = usePromise(fetchFileInfo, ['proj1']);

  const [project, setProject] = useState(initialProject);

  function update() {
    const zz = fetchFileInfo('proj2');
    zz.then((result) => {
      if (!result) {
        throw new Error('Unknown project');
      }
      setProject(result);
      console.log('click');
    });
  }

  const root = project._rootDir;

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
