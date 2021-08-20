import { ILexingResult, IToken } from 'chevrotain';
const JavaLexer = require('java-parser/src/lexer');

/**
 * @param text is the source code in the file.
 * Returns the tokenized source code and the concatted comments inforamtion.
 */
export function tokenize(text: string): SourceCodeToken[] {
  let lexResult: ILexingResult = JavaLexer.tokenize(text);
  let tokens: IToken[] = lexResult.tokens.concat(lexResult.groups.comments);
  tokens.sort((a, b) => compare(a, b, 'startOffset'));
  return tokens.map((x, index) => ({
    id: (index + 1).toString(),
    ...x,
  }));
}

function compare<T, K extends keyof T>(value1: T, value2: T, key: K): number {
  return value1[key] < value2[key] ? -1 : 1;
}

/*
 * Define the interface of the token in the source code, which contains rich information of the token.
 */
interface SourceCodeToken extends IToken {
  id: string;
}
