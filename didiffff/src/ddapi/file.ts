import { ProjectDiffFile, LineWithValues } from 'kurakuraberuberu';
import { DiffStatusLine, DiffStatusText, DiffStatusTrace } from './diffStatus';
import { TokenWithTrace } from './token';

export class ProjectDiffFileItem implements ProjectDiffFile {
  _file: ProjectDiffFile;
  content: LineWithValuesModel[];

  constructor(file: ProjectDiffFile) {
    this._file = file;
    this.content = file.content.map((l) => new LineWithValuesModel(l));
    console.log('new file');
  }

  get type() {
    return this._file.type;
  }

  get name() {
    return this._file.name;
  }

  diffStatusTrace(): DiffStatusTrace {
    const ds = this.content.flatMap((l) => l.tokens).map((t) => t?.diffStatus());
    if (ds.some((ts) => ts === 'diffInLength' || ts === 'diffInContents')) {
      return 'diff';
    } else if (ds.some((ts) => ts === 'noDiff')) {
      return 'noDiff';
    } else {
      return 'noTrace';
    }
  }

  diffStatusText(): DiffStatusText {
    return this.content.some((l) => l.diffStatusLine() !== 'both');
  }
}

export class LineWithValuesModel implements LineWithValues {
  _line: LineWithValues;
  tokens: TokenWithTrace[] | undefined;

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

  diffStatusLine(): DiffStatusLine {
    return !this.lineno1 ? 'l2only' : !this.lineno2 ? 'l1only' : 'both';
  }
}
