# didiffff

This is a viewer for execution traces of Java application. This document is under constructing.

## Requirements

* Node.js
* Java Runtime Environment (to run NOD4J post processor)

  We have tested with Node16 and Java8.

## How to launch the viewer

(To understand how to get execution trace from your Java application, see also [SELogger repository](https://github.com/takashi-ishio/selogger/) and [NOD4J repository](https://github.com/k-shimari/nod4j).)

Tutorial with demo project is available on [sampleproject directory](./sample/)

### Prepare

First, clone repository and build an internal module.
After that, get required modules for the viewer.

```sh
git clone https://github.com/tetsuyakanda/didiffff
cd <CLOENED_ROOT>/kurakuraberuberu
npm install
cd <CLOENED_ROOT>/didifff
npm install
```

You also need NOD4J trace recorder `selogger-0.2.3.jar` and NOD4J post processor `nod4j-0.2.3-t.jar`.
Download trace recorder from [SELogger repository](https://github.com/takashi-ishio/selogger/releases/tag/v0.2.3).
Post processor is available on [NOD4J repository](https://github.com/k-shimari/nod4j).

 (2011/11/26) Note that NOD4J version 0.2.3 has some problem on handling method parameters so use bundled version in this repository (`nod4j-0.2.3-t.jar`) instead.

### Getting trace

If you already know how to get a execution trace with SELogger and NOD4J, please prepare two execution traces before and after the code changes.

Then, put them into the directory `<CLOENED_ROOT>/didifff/public/assets/proj1` (the trace BEFORE code changes) and `<CLOENED_ROOT>/didifff/public/assets/proj2` (the trace AFTER code changes).

You can [skip reading this section](#Calc-diff-of-two-execution-traces).

#### Getting a first trace

Run the target Java application with SELogger.

for example:

```sh
java -jar -javaagent:/path/to/selogger-0.2.3.jar=output=/path/to/<EXECUTION_TRACE_OUT> <YOUR_APP.jar>
```

see also:

* ["Trace Recorder Usage" section of NOD4J](https://github.com/k-shimari/nod4j#trace-recorder-usage)
* ["Usage" section of SELogger](https://github.com/takashi-ishio/selogger/tree/v0.2.3#usage)

#### Convert

Run NOD4J post processor (`nod4j.jar`).

```sh
java -jar nod4j-0.2.3-t.jar /path/to/<PROJECT_SRC> /path/to/<EXECUTION_TRACE> <CLOENED_ROOT>/didifff/public/assets/proj1
```

You can find `fileinfo.json` and `varinfo.json` under `<CLOENED_ROOT>/didifff/public/assets/proj1`.

Since NOD4J post processor requires the source code of the execution trace, you must run the post processor before you change the code to get another trace.

see also: ["Post Processor Usage" section of NOD4J](https://github.com/k-shimari/nod4j#post-processor-usage)

#### Getting another trace

Change (or checkout) source code and get its execution trace, then convert with NOD4J post processor.
Fix the output directory to `<CLOENED_ROOT>/didifff/public/assets/proj2`.

### Calc diff of two execution traces

```sh
cd <CLOENED_ROOT>/didifff
npm run load
```

Run `npm run load` to compare and combine two execution traces.
The result is output to  `<CLOENED_ROOT>/didifff/public/assets/target.json`

### Launch the viewer

```sh
npm run start
```

Access `localhost:3000` on Web browser. You can now investigate the changes in code and execution traces.

## Viewer details

see [README.md of didiffff/didiffff](./didiffff/README.md)

## FAQ

### How to pronoun "didifff" ?

The author played on words and did not consider the pronunciation.
However, he is Japanese and he usually pronoun "diff" like "di-fu" so maybe he wanted to name this tool as "di-di-fu-fu".
