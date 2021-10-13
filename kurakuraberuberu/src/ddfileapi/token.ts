import { SourceCodeToken } from '../nod4japi/javaLexer';
import { ValueListItemData } from '../nod4japi/varValueData';

function flatten(value?: ValueListItemData[]) {
  const isString = (v: ValueListItemData) => v.value.startsWith('java.lang.String@');
  const result = value?.map((v) => {
    if (isString(v)) {
      const vv = v.value;
      v.value = vv.substring(vv.indexOf('"'), vv.length);
    }
    return v;
  });
  return result;
}

// not extending IToken to omit unused fields when exporting to json
export interface TokenWithValues {
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
): TokenWithValues {
  const { image, startColumn, endColumn } = token;
  return { image, startColumn, endColumn, value1: flatten(value1), value2: flatten(value2) };
}
