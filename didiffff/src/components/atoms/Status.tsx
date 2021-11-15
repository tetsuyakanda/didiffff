import React from 'react';

import styled from '@emotion/styled';

import { DiffStatusToken } from 'ddapi/diffStatus';

type TokenType = {
  tokenType: DiffStatusToken;
  // onClick?: () => void;
};

const Status = styled.span<TokenType>(
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

export default Status;
