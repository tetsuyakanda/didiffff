import React, { useContext } from 'react';

import { TokenWithTrace } from 'ddapi/token';
import { DiffStatusLine } from 'ddapi/diffStatus';
import { SelectedToken } from 'App';
import Status from 'components/atoms/Status';

interface TokenProps {
  token: TokenWithTrace;
  lineType: DiffStatusLine;
}

const ClickableToken = (props: TokenProps) => {
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
      <Status tokenType={newStatus} onClick={onClick}>
        {token.image}
      </Status>
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
  return <ClickableToken token={space} lineType={'both'} />;
};

export default ClickableToken;
