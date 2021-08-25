import React from 'react';

import { styled } from '@material-ui/core';
import { Line } from 'kurakuraberuberu';
import { isPropertySignature } from 'typescript';

interface Props {
  line: Line;
}

const LineNo = styled('span')({
  display: 'inline-block',
  color: 'gray',
  textAlign: 'right',
  fontSize: '10px',
  width: '12px',
  margin: '0px 8px',
});

type LineType = {
  lineType: 'l1only' | 'l2only' | 'both';
};

const DL = styled(({ lineType, ...other }: LineType) => <span {...other} />)({
  background: ({ lineType }: LineType) =>
    lineType === 'l1only' ? '#FFD6D6' : lineType === 'l2only' ? '#D6FFD6' : 'white',
});

const CodeLine = ({ line }: Props) => {
  const { lineno1, lineno2, value } = line;
  const lineType = !lineno1 ? 'l2only' : !lineno2 ? 'l1only' : 'both';
  return (
    <div>
      <LineNo>{lineno1}</LineNo>
      <LineNo>{lineno2}</LineNo>
      <DL lineType={lineType}>{value}</DL>
    </div>
  );
};

export default CodeLine;
