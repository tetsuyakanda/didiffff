import React, { useContext } from 'react';

import { SelectedFile } from 'App';
import NazonoPanel from 'components/atoms/NazonoPanel';

const NazonoView = () => {
  const { selectedFile, selectFile } = useContext(SelectedFile);
  return <NazonoPanel text={selectedFile || 'not selected'} />;
};

export default NazonoView;
