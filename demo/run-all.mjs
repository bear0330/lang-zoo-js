import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { run as runJanet } from 'janet-ape';
import { run as runJava } from 'java-ape';
import { run as runLua } from 'lua-ape';
import { run as runPHP } from 'php-ape';
import { run as runPython } from 'python-ape';
import { run as runRuby } from 'ruby-ape';
import { run as runTcl } from 'tcl-ape';


// Answer.java, compiled ahead of time for this packaging demonstration:
//
// class Answer {
//     public static void main(String[] args) {
//         System.out.println(6 * 7);
//     }
// }
//
// java.com is a Java runtime, not a source-code interpreter or compiler. This
// precompiled class is therefore only a small demo that the bundled runtime can
// execute without a system Java installation.
const ANSWER_CLASS = Buffer.from(
  'yv66vgAAAEEAGwoAAgADBwAEDAAFAAYBABBqYXZhL2xhbmcvT2JqZWN0AQAGPGluaXQ+AQADKClWCQAIAAkHAAoMAAsADAEAEGphdmEvbGFuZy9TeXN0ZW0BAANvdXQBABVMamF2YS9pby9QcmludFN0cmVhbTsKAA4ADwcAEAwAEQASAQATamF2YS9pby9QcmludFN0cmVhbQEAB3ByaW50bG4BAAQoSSlWBwAUAQAGQW5zd2VyAQAEQ29kZQEAD0xpbmVOdW1iZXJUYWJsZQEABG1haW4BABYoW0xqYXZhL2xhbmcvU3RyaW5nOylWAQAKU291cmNlRmlsZQEAC0Fuc3dlci5qYXZhACAAEwACAAAAAAACAAAABQAGAAEAFQAAAB0AAQABAAAABSq3AAGxAAAAAQAWAAAABgABAAAAAQAJABcAGAABABUAAAAlAAIAAQAAAAmyAAcQKrYADbEAAAABABYAAAAKAAIAAAADAAgABAABABkAAAACABo=',
  'base64',
);

const results = {};

results.janet = (await runJanet({ code: '(print (* 6 7))' })).stdout.trim();
results.lua = (await runLua({ code: 'print(6 * 7)', ignoreEnvironment: true })).stdout.trim();
results.php = (await runPHP({ code: 'echo 6 * 7;', noConfiguration: true })).stdout.trim();
results.python = (await runPython({ code: 'print(6 * 7)', isolated: true })).stdout.trim();
results.ruby = (await runRuby({ code: 'puts 6 * 7' })).stdout.trim();

const javaDirectory = await mkdtemp(join(tmpdir(), 'java-ape-example-'));

try {
  await writeFile(join(javaDirectory, 'Answer.class'), ANSWER_CLASS);

  results.java = (await runJava({
    classPath: javaDirectory,
    mainClass: 'Answer',
  })).stdout.trim();
} finally {
  await rm(javaDirectory, { recursive: true, force: true });
}

const directory = await mkdtemp(join(tmpdir(), 'tcl-ape-example-'));
const script = join(directory, 'answer.tcl');

try {
  await writeFile(script, 'puts [expr {6 * 7}]\n', 'utf8');

  results.tcl = (await runTcl({ file: script })).stdout.trim();
} finally {
  await rm(directory, { recursive: true, force: true });
}

console.log(results);
