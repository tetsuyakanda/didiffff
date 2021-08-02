import React, { Suspense, useState } from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';
import usePromise from 'react-promise-suspense';
import { fetchFileInfo } from 'nod4japi/api';
import { ProjectItemDirectoryModel, ProjectModel } from 'nod4japi/project';

interface ProjectTreeProps {
  dir: ProjectItemDirectoryModel;
  parentNodeId: string;
}

const ProjectTreeItem = (props: ProjectTreeProps) => {
  const { dir, parentNodeId } = props;
  const children = dir.children;

  return (
    <TreeItem nodeId={parentNodeId} label={dir.name}>
      {children.map((c, i) => {
        const id = `${parentNodeId}-${i}`;
        if (c.type === 'dir') {
          return <ProjectTreeItem dir={c} parentNodeId={id} />;
        } else {
          return <TreeItem nodeId={id} label={c.name} />;
        }
      })}
    </TreeItem>
  );
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

  return (
    <TreeView defaultCollapseIcon="⊟" defaultExpandIcon="⊞">
      <ProjectTreeItem dir={project._rootDir} parentNodeId="0" />
    </TreeView>
  );
};

const FileTree = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <ProjectTree />
  </Suspense>
);

export default FileTree;
