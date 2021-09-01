import { ProjectDiffDirectory } from 'kurakuraberuberu';
import { ProjectDiffFileItem } from './file';

/**
 * Handle escaping double quotes of string, if the value is string.
 */
function receiver(key: any, value: any): any {
  if (typeof value === 'string') {
    return value.replace(/\\\"/g, '"');
  } else {
    return value;
  }
}

/**
 * return the text of varinfo.json or fileinfo.json which is specified the path
 */
function getAssetFile(path: string): Promise<string> {
  return fetch(path).then((res) => {
    return res.text();
  });
}

/**
 * parse and return the json, which contains the values of variable information
 */
export async function fetchTargetInfo(projectName: string): Promise<ProjectDiffDirectoryItem> {
  const varInfoPath = '/assets/target.json';
  const s: string = await getAssetFile(varInfoPath);
  const json = JSON.parse(s, receiver) as ProjectDiffDirectory;
  return new ProjectDiffDirectoryItem(json);
}

export class ProjectDiffDirectoryItem implements ProjectDiffDirectory {
  get type() {
    return this._dir.type;
  }

  get name() {
    return this._dir.name;
  }

  get children() {
    return this._dir.children.map((i) =>
      i.type === 'file' ? new ProjectDiffFileItem(i) : new ProjectDiffDirectoryItem(i)
    );
  }

  findFile(path: string[]): ProjectDiffFileItem | undefined {
    return this.findFile2(path.slice(1));
  }

  findFile2(path: string[]): ProjectDiffFileItem | undefined {
    if (path.length === 1) {
      return this.children.find(
        (i): i is ProjectDiffFileItem => i.type === 'file' && i.name === path[0]
      );
    } else {
      const targDir = this.children.find(
        (i): i is ProjectDiffDirectoryItem => i.type === 'dir' && i.name === path[0]
      );
      return targDir?.findFile2(path.slice(1));
    }
  }

  private _dir: ProjectDiffDirectory;
  constructor(dir: ProjectDiffDirectory) {
    this._dir = dir;
  }
}
