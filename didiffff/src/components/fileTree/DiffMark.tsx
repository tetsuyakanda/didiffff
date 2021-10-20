import React from 'react';

import { DiffStatusText, DiffStatusTrace } from 'ddapi/diffStatus';
import { styled } from '@material-ui/core';

interface DiffMarkProps {
  diffInText: DiffStatusText;
  diffInTrace: DiffStatusTrace;
}

// put some notification icon before filename; existence of diff ( text | trace )
const DiffMark = (props: DiffMarkProps) => {
  const { diffInText, diffInTrace } = props;
  return (
    <>
      <Circle color={diffTextColor(diffInText)} />
      <Circle color={diffTraceColor(diffInTrace)} />
    </>
  );
};

type CircleColor = {
  color: string;
};

const Circle = styled(({ color, ...other }: CircleColor) => <span {...other} />)({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: ({ color }: CircleColor) => color,
});

const diffTextColor = (diffInText: DiffStatusText) => {
  return diffInText ? '#6dc96d' : '#ffffff';
};

const diffTraceColor = (diffInTrace: DiffStatusTrace) => {
  switch (diffInTrace) {
    case 'diff':
      return '#c96dc9';
    case 'noDiff':
      return '#f3c9f3';
    case 'noTrace':
      return '#ffffff';
  }
};

export default DiffMark;
