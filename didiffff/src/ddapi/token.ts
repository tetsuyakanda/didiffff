import { TokenWithValues, ValueListItemData } from 'kurakuraberuberu';
import { DiffStatusToken } from './diffStatus';

export class TokenWithTrace implements TokenWithValues {
  _token: TokenWithValues;
  constructor(token: TokenWithValues) {
    this._token = token;
  }
  get image() {
    return this._token.image;
  }
  get startColumn() {
    return this._token.startColumn;
  }
  get endColumn() {
    return this._token.endColumn;
  }
  get value1() {
    return this._token.value1;
  }
  get value2() {
    return this._token.value2;
  }

  diffStatus() {
    return diffStatusToken(this._token.value1, this._token.value2);
  }
}

function diffStatusToken(
  value1?: ValueListItemData[],
  value2?: ValueListItemData[]
): DiffStatusToken {
  if (!value1 && !value2) return 'noTrace';
  if (!value1 || !value2 || value1.length !== value2.length) {
    return 'diffInLength';
  } else {
    return diffValues(value1, value2) ? 'diffInContents' : 'noDiff';
  }
}

function valueList(value: ValueListItemData[]) {
  return value.map((v) => v.value);
}

function diffValues(value1: ValueListItemData[], value2: ValueListItemData[]): boolean {
  const vv1 = valueList(value1);
  const vv2 = valueList(value2);
  for (let i = 0; i < vv1.length; i++) {
    if (vv1[i] !== vv2[i]) {
      return true;
    }
  }
  return false;
}
