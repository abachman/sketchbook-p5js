#!/usr/bin/env node

const { exec } = require("node:child_process")
const { version } = require("../package.json")

const { Command } = require("commander")
const program = new Command()

const { copyFiles } = require("./init.js")

program
  .name("p5js-sketchook")
  .description("CLI to some JavaScript string utilities")
  .version(version)

program
  .command("init")
  .description("Start a new p5.js sketchbook project")
  .action(async () => {
    await copyFiles()
    // process.exit(0)
  })

program.parseAsync().then(() => {
  process.exit(0)
})
