import React, { useContext } from 'react';

import { SelectedFile } from 'App';
import NazonoPanel from 'components/atoms/NazonoPanel';
import { ProjectDDirectoryItem } from 'ddapi/api';

interface PrintJsonProps {
  root: ProjectDDirectoryItem;
}

const PrintJson = (props: PrintJsonProps) => {
  const { selectedFile } = useContext(SelectedFile);
  const root = props.root;

  console.log(selectedFile);

  if (selectedFile[0] === '') {
    return <NazonoPanel text={'not selected'} />;
  } else {
    const targFile = root.findFile(selectedFile);
    if (!targFile) {
      return <NazonoPanel text={'not found'} />;
    } else {
      const k = JSON.stringify(targFile);
      return <NazonoPanel text={k} />;
    }
  }
};

export default PrintJson;
