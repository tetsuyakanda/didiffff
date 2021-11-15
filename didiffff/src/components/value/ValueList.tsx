import React, { useContext } from 'react';

import styled from '@emotion/styled';

import { TokenWithTrace } from 'ddapi/token';

import { SelectedToken } from 'App';
import MyPanel from 'components/atoms/MyPanel';
import Status from 'components/atoms/Status';
import Value from './Value';

type Props = {
  selectedToken: TokenWithTrace;
};

const Values = styled.div({
  display: 'flex',
});

const ValueList1 = ({ selectedToken }: Props) => {
  if (selectedToken.value1) {
    const values = (
      <>
        {selectedToken.value1.map((v) => (
          <Value key={v.id} value={v.value} />
        ))}
      </>
    );
    return <MyPanel>{values}</MyPanel>;
  } else {
    return <MyPanel>no value</MyPanel>;
  }
};

const ValueList2 = ({ selectedToken }: Props) => {
  if (selectedToken.value2) {
    const values = (
      <>
        {selectedToken.value2.map((v) => (
          <Value key={v.id} value={v.value} />
        ))}
      </>
    );
    return <MyPanel>{values}</MyPanel>;
  } else {
    return <MyPanel>no value</MyPanel>;
  }
};

const ValueList = () => {
  const { selectedToken } = useContext(SelectedToken);

  if (selectedToken) {
    const newStatus = selectedToken.diffStatus();
    const result = (
      <>
        <div>Token: {selectedToken.image} </div>
        <div>
          Status: <Status tokenType={newStatus}>{newStatus}</Status>
        </div>
        <Values>
          <ValueList1 selectedToken={selectedToken} />
          <ValueList2 selectedToken={selectedToken} />
        </Values>
      </>
    );
    return <MyPanel>{result}</MyPanel>;
  } else {
    return <MyPanel>not selected</MyPanel>;
  }
};

export default ValueList;
