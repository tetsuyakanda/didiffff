import { ProjectItemBase, ProjectItemFile } from '../nod4japi/project';
import { ArrayChange, diffArrays } from 'diff';

export function diffFile(f1: ProjectItemFile, f2: ProjectItemFile) {
  console.log(f1.name);
  console.log(f2.name);
  const c1 = f1.content;
  const c2 = f2.content;
  const d = diffArrays(c1, c2);
  console.log(d);

  // 行単位のdiffをとって、行番号をカウントしながら保存
  const result: Line[] = [];
  let ln1 = 1;
  let ln2 = 1;
  for (const dd of d) {
    const lines = dd.value.map((text) => {
      const line: Line = {
        value: text,
        lineno1: !dd.added ? ln1++ : undefined,
        lineno2: !dd.removed ? ln2++ : undefined,
      };
      return line;
    });
    result.push(...lines);
  }
  //console.log(result);
}

export interface ProjectDiffFile extends ProjectItemBase {
  type: 'file';
  content: Line[];
}

interface Line {
  value: string;
  lineno1?: number;
  lineno2?: number;
}
