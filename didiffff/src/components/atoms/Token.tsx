import React, { useContext } from 'react';

import { TokenWithTrace } from 'ddapi/token';
import { DiffStatusLine, DiffStatusToken } from 'ddapi/diffStatus';
import styled from '@emotion/styled';
import { SelectedToken } from 'App';

type TokenType = {
  tokenType: DiffStatusToken;
  onClick: () => void;
};

const TokenWithValue = styled.span<TokenType>(
  {
    color: 'white',
    borderStyle: 'solid',
    borderRadius: 3,
    border: '1px',
    borderColor: '#cadcfc',
    padding: '2px 2px',
  },
  (props) => ({
    background: myColor(props.tokenType),
  })
);

const myColor = (tokenType: DiffStatusToken) => {
  switch (tokenType) {
    case 'diffInLength':
      return '#6bd66b';
    case 'sameLengthObject':
      return '#c7c7e6';
    case 'diffInContents':
      return '#6d6db6';
    default:
      return '#939393';
  }
};

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
