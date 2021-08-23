import { ProjectItem, ProjectItemDirectory, ProjectItemFile } from '../nod4japi/project';
import { diffFile } from './file';

export function visit(d1: ProjectItemDirectory, d2: ProjectItemDirectory) {
  compareDir(d1, d2);

  //   const s1 = d1.children[1] as ProjectItemDirectory;
  //   const ss1 = s1.children[0] as ProjectItemDirectory;
  //   const sss1 = ss1.children[0] as ProjectItemFile;
  //   const s2 = d2.children[1] as ProjectItemDirectory;
  //   const ss2 = s2.children[0] as ProjectItemDirectory;
  //   const sss2 = ss2.children[0] as ProjectItemFile;
  //   diffFile(sss1, sss2);
}

function compareDir(i1: ProjectItemDirectory, i2: ProjectItemDirectory) {
  console.log('*** compare item ***');
  console.log(i1);
  console.log(i2);

  const d1item = i1.children;
  const d2item = i2.children;
  const [d1files, d1dirs] = fdPart(d1item);
  const [d2files, d2dirs] = fdPart(d2item);
  compareDirs(d1dirs, d2dirs);
}

function compareDirs(ds1: ProjectItemDirectory[], ds2: ProjectItemDirectory[]) {
  console.log('*** compare dirs ***');
  console.log(ds1);
  console.log(ds2);
  const { i1only, i2only, both } = andOr(ds1, ds2);
  console.log(i1only);
  console.log(i2only);
  console.log(both);
  both.forEach(([i1, i2]) => compareDir(i1, i2));
}

interface andOrResult<T extends ProjectItem> {
  i1only: T[];
  i2only: T[];
  both: [T, T][];
}

function andOr<T extends ProjectItem>(i1: T[], i2: T[]): andOrResult<T> {
  const i1names = i1.map((i) => i.name);
  const i2names = i2.map((i) => i.name);
  const i1only = i1.filter((i) => !i2names.includes(i.name));
  const i2only = i2.filter((i) => !i1names.includes(i.name));
  const bothNames = i1names.filter((i) => i2names.includes(i));
  const both = bothNames.map((name) => {
    const ia1 = getItem(name, i1);
    const ia2 = getItem(name, i2);
    return [ia1, ia2] as [T, T];
  });
  return { i1only, i2only, both };
}

function getItem(name: string, i: ProjectItem[]) {
  for (const ii of i) {
    if (ii.name === name) return ii;
  }
  throw 'そんなはずは';
}

// https://qiita.com/suin/items/25908e15aeaa7e3a1ae6
// partitioning items to files and directories
function fdPart(items: ProjectItem[]): [ProjectItemFile[], ProjectItemDirectory[]] {
  return items.reduce<[ProjectItemFile[], ProjectItemDirectory[]]>(
    ([f, d], i) => (i.type === 'file' ? [[...f, i], d] : [f, [...d, i]]),
    [[], []]
  );
}
