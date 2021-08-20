import React from 'react';

import { TreeItem } from '@material-ui/lab';

interface NazoTreeProps {
  label: string;
  nodeId: string;
  onClick: () => void;
}

const NazonoTreeItem = ({ label, nodeId, onClick }: NazoTreeProps) => (
  <TreeItem nodeId={nodeId} label={label} onClick={onClick} />
);

export default NazonoTreeItem;
