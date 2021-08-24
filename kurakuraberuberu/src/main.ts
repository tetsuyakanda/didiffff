import { ProjectItemDirectory } from './nod4japi/project';
import * as fs from 'fs';
import { argv, exit } from 'process';
import { visit } from './ddapi/projectVisitor';

const main = () => {
  if (process.argv.length != 5) {
    console.log(process.argv.length);
    exit(1);
  }
  const f1 = fs.readFileSync(argv[2], 'utf8');
  const ff1 = JSON.parse(f1, receiver) as ProjectItemDirectory;
  const f2 = fs.readFileSync(argv[3], 'utf8');
  const ff2 = JSON.parse(f2, receiver) as ProjectItemDirectory;

  const result = visit(ff1, ff2);
  fs.writeFileSync(argv[4], JSON.stringify(result), 'utf8');
};

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

main();
