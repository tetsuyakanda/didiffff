import { ProjectItemBase, ProjectItemFile } from '../nod4japi/project';
import { diffArrays } from 'diff';

/**
 * ファイル間のdiffをとって格納
 */
export function diffFile(f1: ProjectItemFile, f2: ProjectItemFile): ProjectDiffFile {
  const c1 = f1.content;
  const c2 = f2.content;
  const d = diffArrays(c1, c2);

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

  return { type: 'file', content: result, name: f1.name };
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
