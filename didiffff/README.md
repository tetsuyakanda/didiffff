# didiffff viewer component

## How to run

```sh
npm run start
```

For details, see [didiffff document](../README.md).

## Viewer

### File Tree View

[Screenshot of File Tree View](./doc/filetreeview.png)

Directories and files have two indicators.

The first (green) one represents there are differences in code and the second (purple) one represents there are differences in execution traces.

### Source Code View

[Screenshot of Source Code View](./doc/sourcecodeview.png)

This view shows the source code of selected file.
Added and deleted lines are highlighted.

Variable tokens which have at least one value list are highlighted as following category.

Mainly you can check "Diff in length" and "Diff in conents" to investigate how the code changes affects the execution.

#### No diff in trace

![nodiff](./doc/nodiff.png)

The type is a primitive or String, and they have exactly the same contents.

#### Trace 1 only and Trace 2 only

![nodiff](./doc/t1only.png)
![nodiff](./doc/t2only.png)

The variable is included in an "added" or a "deleted" line.
You can still check the value list by clicking it, but no comparison results are available.

#### Same Length Object

![nodiff](./doc/samelengthobject.png)

The type is not a primitive nor String, and the length of two value lists is the same.
The tool cannot compare the contents.

#### Diff in Length

![nodiff](./doc/diffinlength.png)

The length of two value lists is different. There might be changes in execution path or the number of repetitions is changed.

#### Diff in Contents

![nodiff](./doc/diffincontents.png)

The type is a primitive or String, and the length of two value lists is the same, but they have different contents.

### Value List View

[Screenshot of Value List View](./doc/valuelitsview.png)

This view shows the following information.

- Token name
- Category
- Value lists
