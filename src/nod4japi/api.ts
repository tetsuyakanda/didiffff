import { ProjectItemDirectory, ProjectModel } from './project';
import { VarListJsonData } from './varListData';

export interface ProjectInfo {
  name: string;
}

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
 * set the absolute path to the projects
 */
function pathBase(projectName: string) {
  return `/assets/${projectName}`;
}

/**
 * parse the json file, which contains the directory structure and its source code information, and return the model of the project.
 */
export async function fetchFileInfo(projectName: string): Promise<ProjectModel | undefined> {
  const fileInfoPath = pathBase(projectName) + '/fileinfo.json';
  console.log(fileInfoPath);
  const s: string = await getAssetFile(fileInfoPath);
  const projectDir = JSON.parse(s, receiver) as ProjectItemDirectory;
  if (projectDir) {
    return new ProjectModel(projectDir);
  } else {
    return undefined;
  }
}

/**
 * parse and return the json, which contains the values of variable information
 */
async function fetchVarInfo(projectName: string): Promise<VarListJsonData> {
  const varInfoPath = pathBase(projectName) + '/varinfo.json';
  const s: string = await getAssetFile(varInfoPath);
  const json = JSON.parse(s, receiver) as VarListJsonData;
  return json;
}
