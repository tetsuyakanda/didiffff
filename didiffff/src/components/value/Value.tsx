import React from 'react';

import styled from '@emotion/styled';

type Props = {
  value: string;
};

const DivValue = styled.div({
  borderStyle: 'solid none',
  borderWidth: 'thin',
  borderColor: '#CCCCCC',
});

const Value = ({ value }: Props) => {
  return <DivValue>{value}</DivValue>;
};

export default Value;
