import React, { useContext } from 'react';

import styled from '@emotion/styled';

import { ProjectDiffDirectoryItem } from 'ddapi/directory';

import { SelectedFile } from 'App';
import MyPanel from 'components/atoms/MyPanel';
import CodeLine from 'components/code/CodeLine';

const Code = styled.code({
  fontFamily: "'DejaVu Mono', monospace",
});

interface PrintJsonProps {
  root: ProjectDiffDirectoryItem;
}

const PrintJson = (props: PrintJsonProps) => {
  const { selectedFile } = useContext(SelectedFile);
  const root = props.root;

  console.log(selectedFile);

  if (selectedFile[0] === '') {
    return <MyPanel>not selected</MyPanel>;
  } else {
    const targFile = root.findFile(selectedFile);
    if (!targFile) {
      return <MyPanel>not found</MyPanel>;
    } else {
      const lines = targFile.content;
      const codeLines = (
        <pre>
          <Code>
            {lines.map((l) => (
              <CodeLine line={l} key={l.lineno1 + '-' + l.lineno2} />
            ))}
          </Code>
        </pre>
      );
      return <MyPanel>{codeLines}</MyPanel>;
    }
  }
};

export default PrintJson;
