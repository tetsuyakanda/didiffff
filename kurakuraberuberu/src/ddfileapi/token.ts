import { SourceCodeToken } from '../nod4japi/javaLexer';
import { ValueListItemData } from '../nod4japi/varValueData';

// not extending IToken to omit unused fields when exporting to json
export interface MyToken {
  image: string;
  startColumn?: number;
  endColumn?: number;
  value1?: ValueListItemData[];
  value2?: ValueListItemData[];
}

export function createTokenWithValues(
  token: SourceCodeToken,
  value1?: ValueListItemData[],
  value2?: ValueListItemData[]
): MyToken {
  const { image, startColumn, endColumn } = token;
  return { image, startColumn, endColumn, value1, value2 };
}

export function spaceToken(length: number) {
  return {
    image: ' '.repeat(length),
  };
}
