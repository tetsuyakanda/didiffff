import React from 'react';

import styled from '@emotion/styled';

import { LineWithValuesModel } from 'ddapi/file';
import { DiffStatusLine } from 'ddapi/diffStatus';
import { TokenWithTrace } from 'ddapi/token';
import Token, { SpaceToken } from 'components/atoms/Token';

interface Props {
  line: LineWithValuesModel;
}

const LineNo = styled.span({
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

const DL = styled.div<LineType>(
  {
    padding: '2px',
    width: '100%',
  },
  (props) => ({
    background:
      props.lineType === 'l1only' ? '#FFD6D6' : props.lineType === 'l2only' ? '#D6FFD6' : 'white',
  })
);

interface TokensProps {
  tokens: TokenWithTrace[];
  lineType: DiffStatusLine;
}

// https://github.com/k-shimari/nod4j/blob/3f8dd202dc68f38a07e92098ef62a165cdaf8821/src/main/frontend/src/app/components/sourcecode/line.tsx#L25
const Tokens = (props: TokensProps) => {
  const { tokens, lineType } = props;
  const result: JSX.Element[] = [];
  let preEndColumn = 0;
  let c = 0;
  for (const token of tokens) {
    const startColumn = token.startColumn!;
    const endColumn = token.endColumn!;
    const delta = startColumn - preEndColumn - 1;
    if (delta > 0) {
      result.push(<SpaceToken length={delta} key={c++} />);
    }
    result.push(<Token token={token} lineType={lineType} key={c++} />);
    preEndColumn = endColumn;
  }
  return <span>{result}</span>;
};

const CodeLine = ({ line }: Props) => {
  const diffStatusLine = line.diffStatusLine();
  const { lineno1, lineno2, tokens } = line;
  return (
    <DL lineType={diffStatusLine}>
      <LineNo>{lineno1}</LineNo>
      <LineNo>{lineno2}</LineNo>
      {tokens ? <Tokens tokens={tokens} lineType={diffStatusLine} /> : ' '}
    </DL>
  );
};

export default CodeLine;
