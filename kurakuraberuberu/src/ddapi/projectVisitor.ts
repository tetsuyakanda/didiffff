import {
  ProjectItem,
  ProjectItemBase,
  ProjectItemDirectory,
  ProjectItemFile,
} from '../nod4japi/project';
import { diffFile, ProjectDiffFile } from './file';

export function visit(d1: ProjectItemDirectory, d2: ProjectItemDirectory) {
  const r = compareDir(d1, d2);
  return r;
}

// ディレクトリの内容を（ファイル名ベースで）比較
function compareDir(d1: ProjectItemDirectory, d2: ProjectItemDirectory): ProjectDItem {
  const [d1files, d1dirs] = fdPart(d1.children);
  const [d2files, d2dirs] = fdPart(d2.children);
  const files = compareFiles(d1files, d2files);
  const dirs = compareDirs(d1dirs, d2dirs);
  return {
    type: 'dir',
    name: d1.name,
    children: dirs.concat(files),
  };
}

// ディレクトリリストを比較して、同名ディレクトリなら処理を続行
function compareDirs(ds1: ProjectItemDirectory[], ds2: ProjectItemDirectory[]) {
  const { i1only, i2only, both } = andOr(ds1, ds2);
  // ToDo: 片方にしか存在しないディレクトリの処理
  return both.map(([d1, d2]) => compareDir(d1, d2));
}

// ファイルリストを比較して、同名ファイルのdiffをとる
function compareFiles(fs1: ProjectItemFile[], fs2: ProjectItemFile[]) {
  const { i1only, i2only, both } = andOr(fs1, fs2);
  // ToDo: 片方にしか存在しないファイルの処理
  return both.map(([f1, f2]) => diffFile(f1, f2));
}

interface andOrResult<T extends ProjectItemBase> {
  i1only: T[];
  i2only: T[];
  both: [T, T][];
}

// ベン図をかく
function andOr<T extends ProjectItemBase>(i1: T[], i2: T[]): andOrResult<T> {
  const i1names = i1.map((i) => i.name);
  const i2names = i2.map((i) => i.name);
  const i1only = i1.filter((i) => !i2names.includes(i.name));
  const i2only = i2.filter((i) => !i1names.includes(i.name));
  // 同名アイテムはペアにする
  const both = i1names
    .filter((i) => i2names.includes(i))
    .map((name) => {
      const ia1 = getItem(name, i1);
      const ia2 = getItem(name, i2);
      return [ia1, ia2] as [T, T];
    });
  return { i1only, i2only, both };
}

function getItem<T extends ProjectItemBase>(name: string, i: T[]) {
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

interface ProjectDDirectory extends ProjectItemBase {
  type: 'dir';
  children: ProjectDItem[];
}

export type ProjectDItem = ProjectDiffFile | ProjectDDirectory;
