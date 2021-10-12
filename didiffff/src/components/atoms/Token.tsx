import React, { useContext } from 'react';

import { TokenWithTrace } from 'ddapi/token';
import { DiffStatusLine, DiffStatusToken } from 'ddapi/diffStatus';
import { styled } from '@material-ui/core';
import { SelectedToken } from 'App';

type TokenType = {
  tokenType: DiffStatusToken;
  onClick: () => void;
};

const TokenWithValue = styled(({ tokenType, onClick, ...other }: TokenType) => (
  <span onClick={onClick} {...other} />
))({
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
  const { selectToken } = useContext(SelectedToken);
  const status = token.diffStatus();
  if (status === 'noTrace') {
    return <span>{token.image}</span>;
  } else {
    // we cannot compare traces if this line is in DIFF part so indicate as "no diff in trace"
    const newStatus = lineType === 'both' ? status : 'noDiff';
    const onClick = () => selectToken(token);
    return (
      <TokenWithValue tokenType={newStatus} onClick={onClick}>
        {token.image}
      </TokenWithValue>
    );
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
