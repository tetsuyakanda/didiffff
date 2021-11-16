import React, { useContext } from 'react';

import { TokenWithTrace } from 'ddapi/token';

import { SelectedToken } from 'App';
import Status from 'components/atoms/Status';

interface TokenProps {
  token: TokenWithTrace;
}

const ClickableToken = (props: TokenProps) => {
  const { token } = props;
  const { selectToken } = useContext(SelectedToken);
  const status = token.diffStatus;
  if (status === 'noTrace') {
    return <span>{token.image}</span>;
  } else {
    const onClick = () => selectToken(token);
    return (
      <Status tokenType={status} onClick={onClick}>
        {token.image}
      </Status>
    );
  }
};

interface SpaceTokenProps {
  length: number;
}
export const SpaceToken = ({ length }: SpaceTokenProps) => {
  const space = new TokenWithTrace(
    {
      image: ' '.repeat(length),
    },
    'both'
  );
  return <ClickableToken token={space} />;
};

export default ClickableToken;
