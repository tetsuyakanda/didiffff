# didiffff

This is a viewer for execution traces of Java application. This document is under constructing.

## Requirements

  * Node.js
  * Java Runtime Environment (to run NOD4J post processor)

  We have tested with Node16 and Java8.

## How to run

### prepare

First, clone repository and build an internal module.

```sh
$ git clone https://github.com/tetsuyakanda/didiffff
$ cd <CLOENED_ROOT>/kurakuraberuberu
$ npm install
```

### get trace 

see also:
  * ["Trace Recorder Usage" section of NOD4J](https://github.com/k-shimari/nod4j#trace-recorder-usage)
  * ["Usage" section of SELogger](https://github.com/takashi-ishio/selogger/tree/v0.2.3#usage)

### convert 

Run NOD4J post processor (`nod4j.jar`). Note that NOD4J version 0.2.3 has some problem on handling method parameters so use bundled version in this repository (`nod4j-0.2.3-t.jar`) instead.

```sh
$ java -jar nod4j-0.2.3-t.jar /path/to/<PROJECT_SRC> /path/to/<EXECUTION_TRACE>
<CLOENED_ROOT>/didifff/public/assets/proj1
```

Note that NOD4J post processor requires the source code of the execution trace.
Run the post processor before you change the code to get another trace.

see also: ["Post Processor Usage" section of NOD4J](https://github.com/k-shimari/nod4j#post-processor-usage)

### get another trace

Change (or checkout) source code and get its execution trace, then convert with NOD4J post processor.
Fix the output directory to `<CLOENED_ROOT>/didifff/public/assets/proj2`.

### calc diff

```sh
$ cd <CLOENED_ROOT>/didifff
$ npm install
$ npm run load
```

Run `npm install` to get required modules for the viewer.
Next, run `npm run load` to compare and combine two execution traces. The result is output to  `<CLOENED_ROOT>/didifff/public/assets/target.json"`

### launch the viewer

```sh
$ npm run start
```

Access `localhost:8000` on Web browser. You can now investigate the changes in code and execution traces.

## FAQ

### How to pronoun "didifff" ?
The author played on words and did not consider the pronunciation.
However, he is Japanese and he usually pronoun "diff" like "di-fu" so maybe he wanted to name this tool as "di-di-fu-fu".
