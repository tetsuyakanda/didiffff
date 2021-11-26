# didiffff simple tutorial with sample project

Here, we use the same example project as [NOD4J debbuging sample](https://github.com/k-shimari/nod4j/wiki/Try-our-viewer-in-a-debugging-sample).

The detail of debugging target is described in [here](https://github.com/k-shimari/nod4j/wiki/Try-our-viewer-in-a-debugging-sample#the-detail-of-debugging-target).

## Requirements

* Node.js
* Java Runtime Environment (to run NOD4J post processor)

  We have tested with Node16 and Java8.

## Prepare

First, clone our repository and build an internal module.
After that, get required modules for the viewer.

```sh
git clone https://github.com/tetsuyakanda/didiffff
cd didiffff/kurakuraberuberu
npm install
cd ../didifff
npm install
```

You also need NOD4J trace recorder and NOD4J post processor.
Download trace recorder from [SELogger repository](https://github.com/takashi-ishio/selogger/).
Post processor is bundled in didiffff repository.
Copy `selogger-0.2.3.jar` and `nod4j-0.2.3-t.jar` to `<CLOENED_ROOT>/sample/`.

## Getting trace (1)

Run the sample project with SELogger.
Settings are already described in `pom.xml` so you can get the execution trace by running `mvn test` command.

```sh
cd <CLOENED_ROOT>/sample/project/
mvn test
```

We can find the execution trace in `<CLOENED_ROOT>/sample/selogger`.

## Convert (1)

```sh
cd <CLOENED_ROOT>/sample/
java -jar nod4j-0.2.3-t.jar ./project/ ./selogger/ ../didifff/public/assets/proj1
```

You can find `fileinfo.json` and `varinfo.json` under `<CLOENED_ROOT>/didifff/public/assets/proj1/`.

## Getting another trace (2)

Next, fix the bug and get a new execution trace.
Change the variable "num1" on line 11 to "num2", then run the sample project with SELogger again.

```sh
cd <CLOENED_ROOT>/sample/project/
mvn test
```

## Convert (2)

Don't forget to change the output path to `proj2` to prevent overwriting.

```sh
cd <CLOENED_ROOT>/sample/
java -jar nod4j-0.2.3-t.jar ./project/ ./selogger/ ../didifff/public/assets/proj2
```

## Calc diff of two execution traces

```sh
cd <CLOENED_ROOT>/didifff
npm run load
```

Run `npm run load` to compare and combine two execution traces.
The result is output to  `<CLOENED_ROOT>/didifff/public/assets/target.json`

(Note: many warning messages "Cannot compute token ID" will be displayed. They are for debugging so you can ignore the messages. We are working on that issue.)

## Launch the viewer

```sh
npm run start
```

Access `localhost:8000` on Web browser. You can now investigate the changes in code and execution traces.

