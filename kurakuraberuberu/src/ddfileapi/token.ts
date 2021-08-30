import { SourceCodeToken } from '../nod4japi/javaLexer';

// not extending IToken to omit unused fields when exporting to json
export interface MyToken {
  id: string;
  image: string;
  startLine: number | undefined;
  startColumn: number | undefined;
}

export function omit(token: SourceCodeToken): MyToken {
  const { id, image, startLine, startColumn } = token;
  return { id, image, startLine, startColumn };
}

function createTokenWithValues(token: SourceCodeToken) {
  return 0;
}
