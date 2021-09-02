import React from 'react';

import { TokenWithTrace } from 'ddapi/token';

interface TokenProps {
  token: TokenWithTrace;
}

const Token = ({ token }: TokenProps) => {
  return <span>{token.image}</span>;
};

interface SpaceTokenProps {
  length: number;
}
export const SpaceToken = ({ length }: SpaceTokenProps) => {
  const space = new TokenWithTrace({
    image: ' '.repeat(length),
  });
  return <Token token={space} />;
};

export default Token;
