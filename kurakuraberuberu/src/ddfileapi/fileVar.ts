import * as fs from 'fs';

import { SourceCodeToken, tokenize } from '../nod4japi/javaLexer';
import { ProjectItemBase, ProjectItemFileModel } from '../nod4japi/project';
import { VarListJsonData } from '../nod4japi/varListData';
import { createVarValueData, ValueListItemData, VarValueDataInner } from '../nod4japi/varValueData';
import { createTokenWithValues, TokenWithValues } from './token';
import { diffFile } from './diffFile';

export function createDiffData(
  f1: ProjectItemFileModel,
  f2: ProjectItemFileModel,
  v1: VarListJsonData,
  v2: VarListJsonData,
  path: string[]
): ProjectDiffFile {
  const tokens1 = tokenize(f1.joinedContent);
  const tokens2 = tokenize(f2.joinedContent);

  const filePath = getFilePath(path, f1.name);
  const vv1 = createVarValueData(v1, filePath, tokens1);
  const vv2 = createVarValueData(v2, filePath, tokens2);

  const tl1 = groupTokensByLine(tokens1);
  const tl2 = groupTokensByLine(tokens2);

  // first, get unix diff of source code
  const diff = diffFile(f1, f2);

  const result: LineWithValues[] = diff.map((line) => {
    const tokens1 = line.lineno1 ? findValues(tl1[line.lineno1], vv1) : undefined;
    const tokens2 = line.lineno2 ? findValues(tl2[line.lineno2], vv2) : undefined;
    return { ...line, tokens: mergeTokens(tokens1, tokens2) };
  });

  // f1.name and f2.name might be same...
  return { type: 'file', content: result, name: f1.name };
}

// check if we have two token list...
function mergeTokens(tokens1?: TemporalToken[], tokens2?: TemporalToken[]) {
  if (!tokens2 && !tokens1) {
    return [];
  } else if (!tokens2) {
    return tokens1?.map((t) => createTokenWithValues(t.token, t.value, undefined));
  } else if (!tokens1) {
    return tokens2?.map((t) => createTokenWithValues(t.token, undefined, t.value));
  } else {
    return mergeTokens2(tokens1, tokens2);
  }
}

// concat two token list
function mergeTokens2(tokens1: TemporalToken[], tokens2: TemporalToken[]) {
  const result: TokenWithValues[] = [];
  for (let i = 0; i < tokens1.length; i++) {
    const tv = createTokenWithValues(tokens1[i].token, tokens1[i].value, tokens2[i].value);
    result.push(tv);
  }
  return result;
}

// find value data of specified token
function findValues(t: SourceCodeToken[] | undefined, vv: VarValueDataInner) {
  const tokens = t?.map((ti) => ({ token: ti, value: vv[ti.id] } as TemporalToken));
  return tokens;
}

interface TemporalToken {
  token: SourceCodeToken;
  value?: ValueListItemData[];
}

export interface LineWithValues {
  value: string;
  lineno1?: number;
  lineno2?: number;
  tokens?: TokenWithValues[];
}

export interface ProjectDiffFile extends ProjectItemBase {
  type: 'file';
  content: LineWithValues[];
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
