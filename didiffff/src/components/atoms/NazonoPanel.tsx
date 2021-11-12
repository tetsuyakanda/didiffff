import React from 'react';

import { Paper } from '@mui/material';

interface Props {
  text: string | JSX.Element;
}

const NazonoPanel = ({ text }: Props) => (
  <Paper sx={{ padding: '10px', margin: '10px' }}>{text}</Paper>
);

export default NazonoPanel;
