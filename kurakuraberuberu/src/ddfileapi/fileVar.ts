import * as fs from 'fs';

import { tokenize } from '../nod4japi/javaLexer';
import { ProjectItemFileModel } from '../nod4japi/project';
import { VarListJsonData } from '../nod4japi/varListData';
import { createVarValueData } from '../nod4japi/varValueData';
import { MyToken, omit } from './token';
import { diffFile as diffFileO } from './diffFile';

export function diffFile(
  f1: ProjectItemFileModel,
  f2: ProjectItemFileModel,
  v1: VarListJsonData,
  v2: VarListJsonData,
  path: string[]
) {
  console.log(path, f1.name);
  const filePath = getFilePath(path, f1.name);
  console.log(filePath);

  const tokens1 = tokenize(f1.joinedContent);
  const tokens2 = tokenize(f2.joinedContent);

  const vv1 = createVarValueData(v1, filePath, tokens1);
  const vv2 = createVarValueData(v2, filePath, tokens2);

  const tt1 = tokens1.map(omit);
  const tl1 = groupTokensByLine(tt1);
  const tt2 = tokens2.map(omit);
  const tl2 = groupTokensByLine(tt2);

  const { content: dd } = diffFileO(f1, f2);
  dd.forEach((l) => {
    console.log(l.value);
    // l.lineno1 && console.log(tl1[l.lineno1]);
    // l.lineno2 && console.log(tl2[l.lineno2]);
    if (l.lineno1 && l.lineno1 == 20) {
      const t = tl1[l.lineno1];
      // console.log(t);
      t?.map((ti) => {
        const tx = vv1[ti.id];
        if (tx) {
          console.log(ti);
          console.log(tx);
        }
        return [vv1[ti.id]];
      });
    }
  });

  fs.writeFileSync('tmp/v.json', JSON.stringify(vv1), 'utf8');
  fs.writeFileSync('tmp/t.json', JSON.stringify(tt1), 'utf8');
  fs.writeFileSync('tmp/l.json', JSON.stringify(tl2), 'utf8');
}

/**
 * This function returns the source code tokens grouped by line.
 */
function groupTokensByLine(tokens: MyToken[]) {
  return tokens.reduce((obj, value) => {
    const key = value.startLine!;
    (obj[key] || (obj[key] = [])).push(value);
    return obj;
  }, {} as Partial<Record<number, MyToken[]>>);
}

function createFilePath(dirs: string[], file: string): string {
  return dirs.join('/') + '/' + file;
}

/*
 * This function processes and return the file path for mathcing the file path of trace (varinfo.json)
 * we expect that the target system is under maven style directory structure (or simply under src directory)
 */
function getFilePath(dirs: string[], file: string): string {
  const srcDirPrefix = ['src', 'source', 'sources', 'test', 'tests'];
  const mvnDirPrefiix = ['src/main/java', 'src/test/java', 'test/main/java', 'tests/main/java'];

  const startPoint = dirs.findIndex((d) => srcDirPrefix.includes(d));
  if (startPoint != -1) {
    const srcDirs = dirs.slice(startPoint);
    if (srcDirs.length >= 3 && mvnDirPrefiix.includes(srcDirs.slice(0, 3).join('/'))) {
      return createFilePath(srcDirs.slice(3), file);
    } else {
      return createFilePath(srcDirs.slice(1), file);
    }
  } else {
    return createFilePath(dirs, file);
  }
}
