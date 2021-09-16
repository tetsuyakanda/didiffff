import React, { useContext } from 'react';

import { SelectedFile } from 'App';
import NazonoPanel from 'components/atoms/NazonoPanel';
import { ProjectDiffDirectoryItem } from 'ddapi/directory';
import CodeLine from 'components/code/CodeLine';

interface PrintJsonProps {
  root: ProjectDiffDirectoryItem;
}

const PrintJson = (props: PrintJsonProps) => {
  const { selectedFile } = useContext(SelectedFile);
  const root = props.root;

  console.log(selectedFile);

  if (selectedFile[0] === '') {
    return <NazonoPanel text={'not selected'} />;
  } else {
    const targFile = root.findFile(selectedFile);
    if (!targFile) {
      return <NazonoPanel text={'not found'} />;
    } else {
      const lines = targFile.content;
      const codeLines = (
        <pre>
          <code>
            {lines.map((l) => (
              <CodeLine line={l} key={l.lineno1 + '-' + l.lineno2} />
            ))}
          </code>
        </pre>
      );
      return <NazonoPanel text={codeLines} />;
    }
  }
};

export default PrintJson;