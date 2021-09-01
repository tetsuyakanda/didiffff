import { ProjectDiffFile, LineWithValues, TokenWithValues } from 'kurakuraberuberu';
import { DiffStatusLine } from './diffStatus';
import { TokenWithTrace } from './token';

export class ProjectDiffFileItem implements ProjectDiffFile {
  _file: ProjectDiffFile;

  constructor(file: ProjectDiffFile) {
    this._file = file;
  }

  get type() {
    return this._file.type;
  }

  get content() {
    return this._file.content;
  }

  get name() {
    return this._file.name;
  }

  get lines() {
    return this._file.content.map((l) => new LineWithValuesModel(l));
  }

  diffStatusTrace() {}

  diffStatusText() {}
}

export class LineWithValuesModel implements LineWithValues {
  _line: LineWithValues;
  tokens: TokenWithValues[] | undefined;

  constructor(line: LineWithValues) {
    this._line = line;
    this.tokens = line.tokens?.map((t) => new TokenWithTrace(t));
  }

  get value() {
    return this._line.value;
  }

  get lineno1() {
    return this._line.lineno1;
  }

  get lineno2() {
    return this._line.lineno2;
  }

  get diffStatusLine(): DiffStatusLine {
    return !this.lineno1 ? 'l2only' : !this.lineno2 ? 'l1only' : 'both';
  }
}
