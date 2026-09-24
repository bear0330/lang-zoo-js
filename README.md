# LangZoo.js

Portable polyglot runtimes for Node.js. Each package is a generated, dependency-free JavaScript binding made with [APEBind](https://github.com/nuwainfo/apebind) that carries its language runtime as an [Actually Portable Executable](https://github.com/jart/cosmopolitan).

The repository slug and npm package names use lowercase kebab-case. `LangZoo.js` is the display name for this collection; install and import the individual packages below.

The reviewed YAML schemas and the standalone runtime examples live in [APEBind's language examples](https://github.com/nuwainfo/apebind/tree/master/examples/languages). LangZoo keeps only the generated package archives and its combined demo.

| Runtime | npm package | Generated API |
|---|---|---|
| Janet | `janet-ape` | `run({ code })` |
| Java | `java-ape` | `run({ classPath, mainClass })` |
| Lua | `lua-ape` | `run({ code })` |
| PHP | `php-ape` | `run({ code })` |
| Python | `python-ape` | `run({ code })` |
| Ruby | `ruby-ape` | `run({ code })` |
| Tcl | `tcl-ape` | `run({ file })` |

Java's bundled APE is a runtime, not a compiler. Compile application classes during your build, then pass their class path and main class to `java-ape`.

For example:

```js
import { run as runRuby } from 'ruby-ape';

const result = await runRuby({ code: 'puts 6 * 7' });
console.log(result.stdout.trim()); // 42
```

The checked-in package archives are local artifacts for the demo. After publishing, install an individual runtime in the usual way, such as `npm install ruby-ape`.

## Run the zoo

Try all seven with:

```bash
cd demo
npm install --ignore-scripts --no-audit --no-fund
node run-all.mjs
```

Expected result:

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

No Janet, Java, Lua, PHP, Python, Ruby, or Tcl installation is required by the demo; each npm package carries its own runtime APE.
