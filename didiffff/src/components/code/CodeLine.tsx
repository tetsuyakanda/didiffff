import React from 'react';

import { styled } from '@material-ui/core';
import { LineWithValuesModel } from 'ddapi/file';
import { DiffStatusLine } from 'ddapi/diffStatus';
import { TokenWithTrace } from 'ddapi/token';
import Token, { SpaceToken } from 'components/atoms/Token';

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
  padding: '2px',
});

interface TokensProps {
  tokens: TokenWithTrace[];
  lineType: DiffStatusLine;
}

// https://github.com/k-shimari/nod4j/blob/3f8dd202dc68f38a07e92098ef62a165cdaf8821/src/main/frontend/src/app/components/sourcecode/line.tsx#L25
const Tokens = (props: TokensProps) => {
  const { tokens, lineType } = props;
  const result: JSX.Element[] = [];
  let preEndColumn = 0;
  for (const token of tokens) {
    const startColumn = token.startColumn!;
    const endColumn = token.endColumn!;
    const delta = startColumn - preEndColumn - 1;
    if (delta > 0) {
      result.push(<SpaceToken length={delta} />);
    }
    result.push(<Token token={token} lineType={lineType} />);
    preEndColumn = endColumn;
  }
  return <span>{result}</span>;
};

const CodeLine = ({ line }: Props) => {
  const diffStatusLine = line.diffStatusLine();
  const { lineno1, lineno2, tokens } = line;
  return (
    <div>
      <LineNo>{lineno1}</LineNo>
      <LineNo>{lineno2}</LineNo>
      <DL lineType={diffStatusLine}>
        {tokens && <Tokens tokens={tokens} lineType={diffStatusLine} />}
      </DL>
    </div>
  );
};

export default CodeLine;
