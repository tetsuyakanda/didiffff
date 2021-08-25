import React, { useContext } from 'react';

import { SelectedFile } from 'App';
import NazonoPanel from 'components/atoms/NazonoPanel';

const NazonoView = () => {
  const { selectedFile } = useContext(SelectedFile);
  return <NazonoPanel text={selectedFile.join('/') || 'not selected'} />;
};

export default NazonoView;
