import React from 'react';

import { Paper } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const MyPaper = styled(Paper)({
  padding: '20px',
  margin: '20px',
});

interface Props {
  text: string | JSX.Element;
}

const NazonoPanel = ({ text }: Props) => <MyPaper>{text}</MyPaper>;

export default NazonoPanel;
