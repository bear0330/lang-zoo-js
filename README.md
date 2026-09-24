# LangZoo.js

**Run seven programming languages from Node.js without installing their runtimes.**

LangZoo.js is a small demo of [APEBind](https://github.com/nuwainfo/apebind): seven generated JavaScript packages that bundle their own language runtimes as [Actually Portable Executables (APEs)](https://github.com/jart/cosmopolitan). No separate Janet, Java, Lua, PHP, Python, Ruby, or Tcl installation is needed to run the demo.

## Try all seven

```bash
cd demo
npm install --ignore-scripts --no-audit --no-fund
node run-all.mjs
```

Expected output:

```text
{
  janet: '42',
  java: '42',
  lua: '42',
  php: '42',
  python: '42',
  ruby: '42',
  tcl: '42'
}
```

Each language runs through its own bundled runtime. The JavaScript packages are bindings to those runtimes, **not reimplementations of the languages in JavaScript**.

## What calling a runtime looks like

```js
import { run as runPython } from 'python-ape';

const result = await runPython({ code: 'print(6 * 7)', isolated: true });
console.log(result.stdout.trim()); // 42
```

The demo installs the **checked-in local package archives**, so you can run it without waiting for the packages to be published to the npm registry. Once an individual package is published, it can be installed in the usual way (for example, `npm install python-ape`).

## The seven packages

| Runtime | Package | Generated API |
|---|---|---|
| Janet | `janet-ape` | `run({ code })` |
| Java | `java-ape` | `run({ classPath, mainClass })` |
| Lua | `lua-ape` | `run({ code })` |
| PHP | `php-ape` | `run({ code })` |
| Python | `python-ape` | `run({ code })` |
| Ruby | `ruby-ape` | `run({ code })` |
| Tcl | `tcl-ape` | `run({ file })` |

Java's bundled APE is a **runtime, not a compiler**: compile your application classes as part of your build, then pass their class path and main class to `java-ape`. The Tcl demo executes a script file rather than inline code.

## What this demonstrates

[APEBind](https://github.com/nuwainfo/apebind) generates JavaScript bindings for portable command-line programs. LangZoo.js uses it to package seven different language runtimes behind familiar Node.js APIs, with each package carrying the executable it invokes.

The reviewed YAML schemas and standalone runtime examples live in [APEBind's language examples](https://github.com/nuwainfo/apebind/tree/master/examples/languages). This repository contains the generated package archives and the combined seven-language demo.

**Scope:** This is a packaging and binding demo, not a sandbox for untrusted code or a promise that every third-party language package is bundled. Platform compatibility depends on the bundled runtime and target environment.

`LangZoo.js` is the collection's display name; the repository slug and individual npm package names use lowercase kebab-case.
