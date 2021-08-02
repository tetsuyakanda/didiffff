import React, { Suspense, useEffect, useState } from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';
import usePromise from 'react-promise-suspense';
import { fetchFileInfo } from 'nod4japi/api';
import { ProjectModel } from 'nod4japi/project';

const FileTreeHontai = () => {
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
    <div>
      <div onClick={update}>a</div>
      <TreeView defaultCollapseIcon="⊟" defaultExpandIcon="⊞">
        <TreeItem nodeId="1" label={project._rootDir.name}>
          <TreeItem nodeId="2" label="Calendar2" />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="Material-UI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>
    </div>
  );
};

const FileTree = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <FileTreeHontai />
  </Suspense>
);

export default FileTree;
