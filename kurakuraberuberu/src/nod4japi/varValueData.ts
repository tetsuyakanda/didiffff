import { SourceCodeToken } from './javaLexer';
import { VarInfo, VarListDataModel, VarListJsonData } from './varListData';

/**
 * @param variable is the target variable got from the recorded log.
 * @param tokens are the tokens in the source code.
 * This function computes the token id of the variable whose line number and variable name match with the token in the source.
 */
function computeTokenId(variable: VarInfo, tokens: SourceCodeToken[]): string {
  const { linenum, count, var: varName } = variable;
  const match = tokens.filter((x) => x.startLine === Number(linenum) && x.image === varName);
  if (count > match.length) {
    throw new Error('Impossible');
  }
  const id = match[count - 1].id;
  return id;
}

/**
 * array with index refers the its contents (values, timestamps..)
 */
//type VarValueDataInner = { [varId: string]: ValueListItemData[] | undefined };
export type VarValueDataInner = { [varId: string]: ValueListItemData[] | undefined };

/**
 * @param data is the all variable and value data of the target source file.
 * @param file is the source file.
 * @param tokens are the tokens in the source code.
 * This function appends the value information to each token and return all tokens with values.
 */
export function createVarValueData(data: VarListJsonData, path: string, tokens: SourceCodeToken[]) {
  let result: VarValueDataInner = {};
  const model = new VarListDataModel(data);
  const ds = model.getDataOfFile(path);

  for (const d of ds) {
    const item: ValueListItemData[] = d.valueList.map((x, index) => ({
      id: index.toString(),
      value: x.data,
      timestamp: x.timestamp,
      inst: d.inst.toString(),
    }));
    try {
      const tokenId = computeTokenId(d, tokens);
      result[tokenId] = item;
    } catch (e) {
      // console.log('Cannot compute token id.');
    }
  }
  // console.log(result);
  return result;
}

/**
 * create the set of each data (token ID, token value, token timestamp) for visualization
 */
export interface ValueListItemData {
  id: string;
  value: string;
  timestamp: string;
  inst: string;
}
