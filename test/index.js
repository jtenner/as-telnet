const glob = require("glob");
const fs = require("fs");
const path = require("path");
const diff = require("diff");
const loader = require("@assemblyscript/loader");
const inputFiles = glob.sync("test/*.input");
const createSnap = process.argv.includes("--create");


loader.instantiate(fs.readFileSync("./build/untouched.wasm"), {}).then(e => {
  inputFiles.forEach((file) => {
    e.exports.reset();
    let output;
    const contents = fs.readFileSync(file, "utf8");
    process.stdout.write(`File: ${file}\n`);
    const lines = contents
      .split(/\n/g)
      .map(line => line.trim())
      .filter(Boolean)
      .filter((line) => !line.startsWith("#"));
    const snapfile =
      path.join(path.dirname(file), path.basename(file, ".input")) + ".snap";
    lines.forEach((line) => {
      const buffer = [];
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "%") {
          buffer.push(parseInt(line.slice(i + 1, i + 3), 16));
          i += 2;
        } else {
          buffer.push(line.charCodeAt(i));
        }
      }
      let array = e.exports.__newArray(e.exports.get_array_type(), buffer);
      e.exports.__pin(array);
      e.exports.input_bytes(array);
      e.exports.__unpin(array);
    });

    output = e.exports.__getString(e.exports.get_output());

    if (createSnap) {
      console.log(output);
      fs.writeFileSync(snapfile, output);
    } else {
      const snapfileContents = fs.readFileSync(snapfile, "utf8");
      if (snapfileContents !== output) {
        const changes = diff.diffLines(snapfileContents, output);

        for (let i = 0; i < changes.length; i++) {
          const change = changes[i];
          const lineStart = change.added
            ? "\n+ "
            : change.removed
            ? "\n- "
            : "\n  ";
          process.stdout.write(
            `${lineStart}${change.value.split("\n").join(lineStart)}`,
          );
        }
        process.stdout.write("\n");
        process.exit(1);
      } else {
        process.stdout.write(`[Success]\n\n`);
      }
    }
  });
});