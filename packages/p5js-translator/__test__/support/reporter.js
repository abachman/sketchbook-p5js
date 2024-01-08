const assert = require("node:assert");
const process = require("node:process");
const path = require("node:path");
const Diff = require("diff");

const COLORS = {
  reset: "\033[0m",
  red: "\033[31m",
  green: "\033[32m",
  yellow: "\033[33m",
  blue: "\033[34m",
};

function c(str, color = "blue") {
  return `${COLORS[color]}${str}${COLORS.reset}`;
}

function red(str) {
  return c(str, "red");
}
function blue(str) {
  return c(str, "blue");
}
function green(str) {
  return c(str, "green");
}

module.exports = async function* customReporter(source) {
  let stack = [];
  let parentStack = [];
  const failures = [];
  const diagnostics = [];

  for await (const event of source) {
    const { data, type } = event;

    switch(type) {
      case 'test:stdout':
      case 'test:stderr':
        yield data.message
        break;
    }

    if (
      type !== "test:start" &&
      type !== "test:pass" &&
      type !== "test:fail" &&
      type !== "test:diagnostic"
    ) {
      continue;
    }

    switch (type) {
      case "test:start":
        stack.push(data);

        let closestParent = parentStack.at(-1);

        while (closestParent && closestParent.nesting >= data.nesting) {
          parentStack.pop();
          closestParent = parentStack.at(-1);
        }

        parentStack.push(data);

        break;
      case "test:pass":
      case "test:fail":
        if (stack.length === 0) break;

        if (stack.length > 1) {
          stack.pop();

          if (stack[0]?.nesting === 0) {
            yield "\n";
          }

          yield* printParentStack(stack);
        }

        stack = [];

        if (data.nesting > 0) {
          yield "".padEnd((data.nesting + 1) * 2);

          if (type === "test:pass") {
            if (data.skip) {
              yield c(`s ${data.name}`, "yellow");
            } else {
              yield c(`✓ ${data.name}`, "green");
            }
          } else {
            yield c(`x ${data.name}`, "red");
            failures.push({
              data,
              parentStack: [...parentStack],
            });
          }
        }

        yield "\n";

        break;
      case "test:diagnostic":
        diagnostics.push(data.message);
        break;
    }
  }

  yield "\n";
  for (const d of diagnostics) {
    yield c(d, "blue");
    yield "\n";
  }
  yield "\n\n";

  for (const [i, { data, parentStack }] of failures.entries()) {
    const { error } = data.details;

    if ("line" in data && "file" in data) {
      yield red(data.file.replace(process.cwd(), ".") + ":" + data.line);
      yield "\n";
    }

    yield* printParentStack(parentStack, `${i + 1}) `, ":");
    yield "\n";

    if ("cause" in error) {
      yield* formattedError(error);
    } else {
      yield c(data.details.error, "red");
    }

    // yield format.indent(formatErrorAndCauses(format, data.details.error), 3);
    yield "\n\n";
  }
};

function* printParentStack(parentStack, prefix = "", suffix = "") {
  const prefixLength = prefix.length;

  for (const [i, parentTest] of parentStack.entries()) {
    if (i !== 0) {
      yield "\n";
    }
    yield "".padEnd((parentTest.nesting + 1) * 2 + (i ? prefixLength : 0));
    if (i === 0 && prefix) {
      yield prefix;
    }
    yield parentTest.name;
  }
  yield suffix + "\n";
}

// if error is https://nodejs.org/docs/latest/api/assert.html#class-assertassertionerror
// print it nicely
function* formattedError(error) {
  const { cause } = error;
  const { operator, actual, expected } = cause;

  if (operator == "==") {
    yield* indent(red("ERROR actual value did not match expected:"));

    const { output, changes, uncolored } = fancyDiff(actual, expected);
    const lineChanges = {}
    for (const change of changes) {
      const { i, col, line } = lineAt(uncolored, change.start)
      if (!lineChanges[i]) lineChanges[i] = ''.padStart(line.length)

      const { added, start, end } = change
      const cchar = added ? '+' : '-'
      const clen = end - start
      lineChanges[i] = [
        lineChanges[i].slice(0, col),
        cchar.repeat(clen),
        lineChanges[i].slice(col + clen, line.length + 1)
      ].join('')
    }

    for (const [i, line] of output.split("\n").entries()) {
      yield line + '\n'
      if (lineChanges[i]) {
        yield cdiff(lineChanges[i]) + '\n'
      }
    }

  } else {
    yield c(error, "red");
  }
  yield "";
}

function* indent(blob, amount = 2) {
  if (blob.indexOf("\n") >= 0) {
    for (const line of blob.split("\n")) {
      yield "".padStart(amount);
      yield line;
      yield "\n";
    }
  } else {
    yield "".padStart(amount);
    yield blob;
    yield "\n";
  }
}

function fancyDiff(actual, expected) {
  const diff = Diff.diffChars(actual, expected);
  let output = "";
  let uncolored = "";
  let idx = 0;
  let changes = [];
  for (const part of diff) {
    // green for additions, red for deletions, plain for common parts
    if (part.added || part.removed) {
      changes.push({
        start: idx,
        end: idx + part.value.length,
        added: part.added,
        removed: part.removed,
        value: part.value
      });
    }
    const color = part.added ? "green" : part.removed ? "red" : "reset";
    idx += part.value.length; // length before applying color codes
    output += c(part.value, color);
    uncolored += part.value
  }
  return { output, changes, uncolored };
}

// open file named in args and parse it
function lineAt(code, pos) {
  const lines = code.toString().split("\n").map((line, i) => {
    return {
      i,
      line,
      size: line.length + 1,
    };
  });

  let line = 0;
  let col = 0;
  let offset = 0;
  let last = null;

  for (const l of lines) {
    if (offset + l.size > pos) {
      col = pos - offset;
      last = l.line;
      break;
    }

    offset += l.size;
    line += 1;
  }

  return { i: line, col, line: last };
}

// replace '  ++  ' with '  \033[32m++\033[0m  '
// replace '  --  ' with '  \033[31m++\033[0m  '
function cdiff(str) {
  return str.replace(/(\s*)(\S+)(\s*)/g, (match, p1, p2, p3) => {
    const cmeth = p2.startsWith('+') ? green : 
      p2.startsWith('-') ? red : (s) => s
    return `${p1}${cmeth(p2)}${p3}`
  })
}
