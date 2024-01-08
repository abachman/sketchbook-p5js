const path = require("node:path");
const fs = require("node:fs/promises");
const process = require("node:process");

const local = path.resolve("../", __dirname);
const cwd = process.cwd();

// copy files from templates/ to cwd public/
// warn if files already exist, and ask to overwrite
// if files don't exist, copy them
async function copyFiles() {
  const { Chalk } = await import("chalk");
  const chalk = new Chalk({ level: 2 });

  const templates = path.resolve(path.join(local, "../templates"))
  console.log('looking for files in', templates)

  const files = await fs.readdir(templates);

  for (const file of files) {
    const src = path.join(templates, file);
    const dest = path.join(cwd, `public/${file}`);

    let exists = true;
    try {
      await fs.access(dest, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      exists = false;
      console.log(`${dest} does not exist`);
    }

    const shortDest = dest.slice(cwd.length + 1)
    const shortSrc = src.slice(templates.length + 1)

    if (exists) {
      process.stdout.write(`  ${chalk.bold.green(shortDest)} exists, overwrite? (y/N) `);

      const answer = await new Promise((resolve) => {
        process.stdin.once("data", (data) => {
          resolve(data.toString().trim());
        });
      })

      if (answer === "y") {
        await fs.copyFile(src, dest);
        console.log(`  ${chalk.bold.green(shortDest)} overwritten`);
      }
    } else {
      console.log(`  ${chalk.bold.green(shortDest)} created`);
      await fs.copyFile(src, dest)
    }
  }

  console.log('done');
  return Promise.resolve();
}

module.exports = {
  copyFiles,
};
