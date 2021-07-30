import React from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';
import { fetchFileInfo } from 'nod4japi/api';

const FileTree = () => {
  const zz = fetchFileInfo('proj1');
  zz.then((result) => {
    if (!result) {
      throw new Error('Unknown project');
    }
    console.log(result);
  });

  return (
    <TreeView defaultCollapseIcon="⊟" defaultExpandIcon="⊞">
      <TreeItem nodeId="1" label="ABC">
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
  );
};

export default FileTree;
