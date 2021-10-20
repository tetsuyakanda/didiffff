import React, { useContext } from 'react';

import NazonoPanel from 'components/atoms/NazonoPanel';
import { SelectedToken } from 'App';
import { TokenWithTrace } from 'ddapi/token';

type Props = {
  selectedToken: TokenWithTrace;
};

const ValueList1 = ({ selectedToken }: Props) => {
  if (selectedToken.value1) {
    const values = (
      <>
        {selectedToken.value1.map((v) => (
          <div key={v.id}>{v.value}</div>
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
          <div key={v.id}>{v.value}</div>
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
        {/* <div>Status: {selectedToken.diffStatus()}</div> */}
        <ValueList1 selectedToken={selectedToken} />
        <ValueList2 selectedToken={selectedToken} />
      </>
    );
    return <NazonoPanel text={result}></NazonoPanel>;
  } else {
    return <NazonoPanel text={'not selected'}></NazonoPanel>;
  }
};

export default ValueList;
