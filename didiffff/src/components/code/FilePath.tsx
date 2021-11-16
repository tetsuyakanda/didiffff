import React, { useContext } from 'react';

import { SelectedFile } from 'App';
import MyPanel from 'components/atoms/MyPanel';

const FilePath = () => {
  const { selectedFile } = useContext(SelectedFile);
  return <MyPanel>{selectedFile.join('/') || 'not selected'}</MyPanel>;
};

export default FilePath;
