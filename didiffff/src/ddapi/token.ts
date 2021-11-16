import { TokenWithValues, ValueListItemData } from 'kurakuraberuberu';
import { DiffStatusLine, DiffStatusToken } from './diffStatus';

export class TokenWithTrace implements TokenWithValues {
  _token: TokenWithValues;
  diffStatus: DiffStatusToken;

  constructor(token: TokenWithValues, diffStatusLine: DiffStatusLine) {
    this._token = token;
    this.diffStatus = diffStatusToken(diffStatusLine, this._token.value1, this._token.value2);
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
}

function diffStatusToken(
  diffStatusLine: DiffStatusLine,
  value1?: ValueListItemData[],
  value2?: ValueListItemData[]
): DiffStatusToken {
  if (!value1 && !value2) return 'noTrace';
  // we cannot compare traces if this line is in DIFF part so indicate as "no diff in trace
  if (!value1) return diffStatusLine === 'both' ? 'diffInLength' : 't2only';
  if (!value2) return diffStatusLine === 'both' ? 'diffInLength' : 't1only';
  // now we have two execution traces. compare them.
  if (value1.length !== value2.length) return 'diffInLength';
  if (value1.some(mightBeObject) || value2.some(mightBeObject)) {
    return 'sameLengthObject';
  } else {
    return diffValues(value1, value2) ? 'diffInContents' : 'noDiff';
  }
}

function valueList(value: ValueListItemData[]) {
  return value.map((v) => v.value);
}

/**
 * it might be object (... but not String)
 * @param value
 * @returns
 */
function mightBeObject(value: ValueListItemData) {
  return value.value.indexOf('@') >= 0 && value.value.indexOf('"') === -1;
}

function diffValues(value1: ValueListItemData[], value2: ValueListItemData[]): boolean {
  const vv1 = flatten(valueList(value1));
  const vv2 = flatten(valueList(value2));
  for (let i = 0; i < vv1.length; i++) {
    if (vv1[i] !== vv2[i]) {
      return true;
    }
  }
  return false;
}

function flatten(valueList: string[]) {
  const isString = (v: string) => v.startsWith('java.lang.String@');
  const result = valueList.map((v) => {
    if (isString(v)) {
      return v.substring(v.indexOf('"'), v.length);
    } else {
      return v;
    }
  });
  return result;
}
