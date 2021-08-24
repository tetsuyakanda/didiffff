import { ProjectDItem } from 'kurakuraberuberu';

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
export async function fetchTargetInfo(projectName: string): Promise<ProjectDItem> {
  const varInfoPath = '/assets/target.json';
  const s: string = await getAssetFile(varInfoPath);
  const json = JSON.parse(s, receiver) as ProjectDItem;
  return json;
}
