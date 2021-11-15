import React from 'react';

import { ProjectDiffDirectoryItem } from 'ddapi/directory';

import FilePath from 'components/code/FilePath';
import PrintJson from 'components/code/ProntJson';

interface SourceCodeViewProps {
  root: ProjectDiffDirectoryItem;
}

const SourceCodeView = (props: SourceCodeViewProps) => (
  <>
    <FilePath />
    <PrintJson root={props.root} />
  </>
);

export default SourceCodeView;
