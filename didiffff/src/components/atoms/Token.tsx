import React from 'react';

import { TokenWithTrace } from 'ddapi/token';
import { DiffStatusLine, DiffStatusToken } from 'ddapi/diffStatus';
import { styled } from '@material-ui/core';

type TokenType = {
  tokenType: DiffStatusToken;
};

const TokenWithValue = styled(({ tokenType, ...other }: TokenType) => <span {...other} />)({
  background: ({ tokenType }: TokenType) =>
    tokenType === 'diffInContents'
      ? '#6d6db6'
      : tokenType === 'diffInLength'
      ? '#6bd66b'
      : '#939393',
  color: 'white',
  borderStyle: 'solid',
  borderRadius: 3,
  border: '1px',
  borderColor: '#cadcfc',
  padding: '2px 2px',
});

interface TokenProps {
  token: TokenWithTrace;
  lineType: DiffStatusLine;
}

const Token = (props: TokenProps) => {
  const { token, lineType } = props;
  const status = token.diffStatus();
  if (status === 'noTrace') {
    return <span>{token.image}</span>;
  } else {
    // if this line is in DIFF, we cannot compare trace so indicate as "no diff in trace"
    const newStatus = lineType === 'both' ? status : 'noDiff';
    return <TokenWithValue tokenType={newStatus}>{token.image}</TokenWithValue>;
  }
};

interface SpaceTokenProps {
  length: number;
}
export const SpaceToken = ({ length }: SpaceTokenProps) => {
  const space = new TokenWithTrace({
    image: ' '.repeat(length),
  });
  return <Token token={space} lineType={'both'} />;
};

export default Token;
