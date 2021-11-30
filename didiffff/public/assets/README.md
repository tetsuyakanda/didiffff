# Assets

Put your execution traces (`fileinfo.json` and `varinfo.json`) here.

## Default settings

Put the first execution trace under the directory `proj1` and the second execution trace under the directory `proj1`.

Running `npm run load` will process those files and produce `target.json` here.

## Edit path

In current version, the viewer doesn't require original execution traces so you can process files under the other directory.
Edit `package.json` like this.

```json
  "scripts": {
    "load": ...,
    "myLoad": "kurakuraberuberu FIRST_fileinfo.json SECOND_filoeinfo.json FIRST_varinfo.json SECOND_varinfo.json ./public/assets/target.json",
    "start": ...
  },
```
