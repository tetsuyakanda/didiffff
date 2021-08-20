import { ProjectItem, ProjectItemDirectory, ProjectItemFile } from './nod4japi/project';
import * as fs from 'fs';
import { argv, exit } from 'process';
import { diffFile } from './ddapi/file';

const main = () => {
  if (process.argv.length != 4) {
    console.log(process.argv.length);
    exit(1);
  }
  const f1 = fs.readFileSync(argv[2], 'utf8');
  const ff1 = JSON.parse(f1, receiver) as ProjectItemDirectory;
  const f2 = fs.readFileSync(argv[3], 'utf8');
  const ff2 = JSON.parse(f2, receiver) as ProjectItemDirectory;

  compareItems(ff1, ff2);

  const s1 = ff1.children[1] as ProjectItemDirectory;
  const ss1 = s1.children[0] as ProjectItemDirectory;
  const sss1 = ss1.children[0] as ProjectItemFile;
  const s2 = ff2.children[1] as ProjectItemDirectory;
  const ss2 = s2.children[0] as ProjectItemDirectory;
  const sss2 = ss2.children[0] as ProjectItemFile;
  diffFile(sss1, sss2);
};

function compareItems(d1: ProjectItemDirectory, d2: ProjectItemDirectory) {
  const d1item = d1.children;
  const d2item = d2.children;
  const [d1files, d1dirs] = fdPart(d1item);
  const [d2files, d2dirs] = fdPart(d2item);
  console.log(d1files);
  console.log(d1dirs);
}

function compareDirs(ds1: ProjectItemDirectory[], ds2: ProjectItemDirectory[]) {}

// https://qiita.com/suin/items/25908e15aeaa7e3a1ae6
// partitioning items to files and directories
function fdPart(items: ProjectItem[]): [ProjectItemFile[], ProjectItemDirectory[]] {
  return items.reduce<[ProjectItemFile[], ProjectItemDirectory[]]>(
    ([f, d], i) => (i.type === 'file' ? [[...f, i], d] : [f, [...d, i]]),
    [[], []]
  );
}

/**
 * Handle escaping double quotes of string, if the value is string.
 */
function receiver(key: any, value: any): any {
  if (typeof value === 'string') {
    return value.replace(/\\\"/g, '"');
  } else {
    return value;
  }
}

main();
