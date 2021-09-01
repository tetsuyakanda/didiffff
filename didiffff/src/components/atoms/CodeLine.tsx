import React from 'react';

import { styled } from '@material-ui/core';
import { LineWithValuesModel } from 'ddapi/file';
import { DiffStatusLine } from 'ddapi/diffStatus';

interface Props {
  line: LineWithValuesModel;
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
  lineType: DiffStatusLine;
};

const DL = styled(({ lineType, ...other }: LineType) => <span {...other} />)({
  background: ({ lineType }: LineType) =>
    lineType === 'l1only' ? '#FFD6D6' : lineType === 'l2only' ? '#D6FFD6' : 'white',
});

const CodeLine = ({ line }: Props) => {
  const { lineno1, lineno2, value, diffStatusLine } = line;
  return (
    <div>
      <LineNo>{lineno1}</LineNo>
      <LineNo>{lineno2}</LineNo>
      <DL lineType={diffStatusLine}>{value}</DL>
    </div>
  );
};

export default CodeLine;
