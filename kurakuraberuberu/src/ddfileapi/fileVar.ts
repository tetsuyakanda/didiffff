import * as fs from 'fs';

import { SourceCodeToken, tokenize } from '../nod4japi/javaLexer';
import { ProjectItemFileModel } from '../nod4japi/project';
import { VarListJsonData } from '../nod4japi/varListData';
import { createVarValueData, ValueListItemData, VarValueDataInner } from '../nod4japi/varValueData';
import { createTokenWithValues, MyToken, spaceToken } from './token';
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

  const tl1 = groupTokensByLine(tokens1);
  const tl2 = groupTokensByLine(tokens2);

  const { content: dd } = diffFileO(f1, f2);
  const r: TemporalLine[] = dd.map((l) => {
    const tokens1 = l.lineno1 ? findValues(tl1[l.lineno1], vv1) : undefined;
    const tokens2 = l.lineno2 ? findValues(tl2[l.lineno2], vv2) : undefined;
    return { ...l, tokens1, tokens2 };
  });
  const rr: FLine[] = r.map((x) => {
    console.log(x.value);
    const m = mergeTokens(x);
    console.log(m?.map((mm) => mm.image));
    return { value: x.value, lineno1: x.lineno1, lineno2: x.lineno2, tokens: m };
  });

  fs.writeFileSync('tmp/r.json', JSON.stringify(rr), 'utf8');
}

function mergeTokens(xline: TemporalLine) {
  if (!xline.tokens2 && !xline.tokens1) {
    return [];
  } else if (!xline.tokens2) {
    return xline.tokens1?.map((t) => createTokenWithValues(t.token, t.value, undefined));
  } else if (!xline.tokens1) {
    return xline.tokens2?.map((t) => createTokenWithValues(t.token, undefined, t.value));
  } else {
    return mergeTokens2(xline.tokens1, xline.tokens2);
  }
}

function mergeTokens2(tokens1: TemporalToken[], tokens2: TemporalToken[]) {
  const result: MyToken[] = [];
  for (let i = 0; i < tokens1.length; i++) {
    const tv = createTokenWithValues(tokens1[i].token, tokens1[i].value, tokens2[i].value);
    result.push(tv);
  }
  return result;
}

function findValues(t: SourceCodeToken[] | undefined, vv: VarValueDataInner) {
  const tokens = t?.map((ti) => {
    const tv = vv[ti.id];
    return { token: ti, value: tv } as TemporalToken;
  });
  return tokens;
}

interface TemporalToken {
  token: SourceCodeToken;
  value?: ValueListItemData[];
}

interface TemporalLine {
  value: string;
  lineno1?: number;
  tokens1?: TemporalToken[];
  lineno2?: number;
  tokens2?: TemporalToken[];
}

interface FLine {
  value: string;
  lineno1?: number;
  lineno2?: number;
  tokens?: MyToken[];
}

/**
 * This function returns the source code tokens grouped by line.
 */
function groupTokensByLine(tokens: SourceCodeToken[]) {
  return tokens.reduce((obj, value) => {
    const key = value.startLine!;
    (obj[key] || (obj[key] = [])).push(value);
    return obj;
  }, {} as Partial<Record<number, SourceCodeToken[]>>);
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
