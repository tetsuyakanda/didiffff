import React, { Suspense, useState } from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';
import usePromise from 'react-promise-suspense';
import { fetchFileInfo } from 'nod4japi/api';
import { ProjectItemModel, ProjectModel } from 'nod4japi/project';

interface ProjectTreeProps {
  content: ProjectItemModel;
  nodeId: string;
}

const ProjectTreeItem = (props: ProjectTreeProps) => {
  const { content, nodeId } = props;

  if (content.type === 'dir') {
    const children = content.children.map((c, i) => {
      const id = `${nodeId}-${i}`;
      return <ProjectTreeItem content={c} nodeId={id} key={id} />;
    });

    return (
      <TreeItem nodeId={nodeId} label={content.name}>
        {children}
      </TreeItem>
    );
  } else return <TreeItem nodeId={nodeId} label={content.name} />;
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
      <ProjectTreeItem content={project._rootDir} nodeId="0" />
    </TreeView>
  );
};

const FileTree = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <ProjectTree />
  </Suspense>
);

export default FileTree;
