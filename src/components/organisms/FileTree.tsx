import React from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';

import z from 'assets/proj1/fileinfo.json';

const FileTree = () => {
  console.log(z.content);
  return (
    <TreeView defaultCollapseIcon="⊟" defaultExpandIcon="⊞">
      <TreeItem nodeId="1" label={z.name}>
        <TreeItem nodeId="2" label="Calendar" />
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
