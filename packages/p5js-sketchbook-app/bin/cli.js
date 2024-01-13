#!/usr/bin/env node

const { exec } = require("node:child_process")
const { version } = require("../package.json")

const { Command } = require("commander")

const { copyFiles } = require("../src/cli/init.js")
const { build } = require("../src/cli/build.js")
const { download } = require("../src/cli/download.js")

async function run(program) {
  program
    .name("p5js-sketchook")
    .description("Manage your p5.js sketchbook project")
    .version(version)

  program
    .command("init")
    .description("Start a new p5.js sketchbook project")
    .action(async () => {
      await copyFiles()
      process.exit(0)
    })

  program
    .command("build")
    .description("Build your p5.js sketchbook")
    .option("-w, --watch", "Watch mode")
    .action(async (options) => {
      await build({ watch: options.watch })

      if (!options.watch) {
        process.exit(0)
      }
    })

  program
    .command("download <username>")
    .description("Download sketches from p5js.org")
    .action(async (username) => {
      await download({ username })
      process.exit(0)
    })

  await program.parseAsync(process.argv)
}

run(new Command())
