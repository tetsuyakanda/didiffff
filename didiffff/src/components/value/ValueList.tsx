import React, { useContext } from 'react';

import styled from '@emotion/styled';

import NazonoPanel from 'components/atoms/NazonoPanel';
import { SelectedToken } from 'App';
import { TokenWithTrace } from 'ddapi/token';
import Value from './Value';
import Status from 'components/atoms/Status';

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
    return <NazonoPanel text={values}></NazonoPanel>;
  } else {
    return <NazonoPanel text={'no value'}></NazonoPanel>;
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
    return <NazonoPanel text={values}></NazonoPanel>;
  } else {
    return <NazonoPanel text={'no value'}></NazonoPanel>;
  }
};

const ValueList = () => {
  const { selectedToken } = useContext(SelectedToken);

  if (selectedToken) {
    const result = (
      <>
        <div>Token: {selectedToken.image} </div>
        <div>
          Status:{' '}
          <Status tokenType={selectedToken.diffStatus()}>{selectedToken.diffStatus()}</Status>
        </div>
        <Values>
          <ValueList1 selectedToken={selectedToken} />
          <ValueList2 selectedToken={selectedToken} />
        </Values>
      </>
    );
    return <NazonoPanel text={result}></NazonoPanel>;
  } else {
    return <NazonoPanel text={'not selected'}></NazonoPanel>;
  }
};

export default ValueList;
