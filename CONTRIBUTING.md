# Contributing to MFCAuto

## Filing Bugs
Issues are always welcome, particularly any crashes or model state consistency issues. Just keep in mind a few things:

- MFCAuto does not circumvent any region blocks a model may have. If you're running your code in a location that's blocked by a model, she will never be seen as online.
- For crashes, a stack trace and a brief description of what happened is usually enough.
- For model state issues, if you've ruled out region blocks, then I'll often need a packet log to debug the problem.

### Generating a packet log for debugging
Starting in v5.1.0 you can easily generate a full packet log by adding a single line to your code:

```javascript
const mfc = require("MFCAuto");

// Add a line like this right after importing MFCAuto. It will
// cause a very complete log to be written to the given filename.
mfc.setLogLevel(mfc.LogLevel.Trace, "mfcauto.log", null);
```

Please note that this will be a full record of your interaction with MFC. **If you're logging in with a real account, this will contain your account details and password.** If you're sending or receiving sensitive chat, this will contain that too.

Also, this log file can become large very quickly. You probably do not want to leave this level of logging turned on permanently.

## Contributing Code
Code contributions are welcome as well. However please follow these few guidelines:

- Unless your change is trivial, it's best to start by opening an Issue and discussing the work there.
- MFCAuto is written in [TypeScript](http://www.typescriptlang.org/) and compiled. You should never be directly editing any files under `/lib`. Those are all generated from the code under `/src/main`. Your code *must* build cleanly to be accepted.
- There are fairly extensive tests. Make sure those are passing for your change and add to them as appropriate.

### Prereqs
To work with MFCAuto you must have:
- [git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/) and npm

It's not required but I do most of my coding with [Visual Studio Code](https://code.visualstudio.com/) and there are some useful pre-configured debugging tasks in `/.vscode`.

### Enlisting
```bash
git clone https://github.com/Damianonymous/MFCAuto.git
cd ./MFCAuto
npm install
```

### Building
This will lint and compile sources from `/src/main` into `/lib`

```bash
npm run build
```

### Running tests
Mocha tests are in `/src/test/test.js`. Running them all takes about 4 minutes to complete.

```bash
npm run test
```

Some of the tests may also time out occasionally as they are running live again MFC and CamYou and are susceptible to current site conditions and traffic levels.

To run a quicker subset of those tests, about 15 seconds worth, use:

```bash
npm run testfast
```
