import { ProjectItemBase, ProjectItemFile } from '../nod4japi/project';
import { ArrayChange, diffArrays } from 'diff';

export function diffFile(f1: ProjectItemFile, f2: ProjectItemFile) {
  console.log(f1.name);
  console.log(f2.name);
  const c1 = f1.content;
  const c2 = f2.content;
  const d = diffArrays(c1, c2);
  console.log(d);
  const result1: Line[] = [];
  const result2: Line[] = [];
  for (const dd of d) {
    if (!dd.added) {
      dd.value.forEach((text) => {
        const line: Line = { value: text, changed: dd.removed || false };
        result1.push(line);
      });
    }
    if (!dd.removed) {
      dd.value.forEach((text) => {
        const line: Line = { value: text, changed: dd.added || false };
        result2.push(line);
      });
    }
  }
  console.log(result1);
  console.log(result2);
}

export interface ProjectDiffFile extends ProjectItemBase {
  type: 'file';
  content1: Line[];
  content2: Line[];
}

interface Line {
  value: string;
  changed: boolean;
}
