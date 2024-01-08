#!/usr/bin/env node

const esbuild = require("esbuild")
const bookmarkletPlugin = require("esbuild-plugin-bookmarklet")
const path = require("node:path")
const process = require("node:process")

esbuild.build({
  entryPoints: [path.resolve('../src/bookmarklet.js', __dirname)], // points to normal javascript
  bundle: true,
  minify: true,
  outfile: 'public/bookmarklet.js', // where to save bookmarklet javascript
  write: false,
  format: 'iife',
  plugins: [bookmarkletPlugin],
  target: ["chrome58", "firefox57", "safari11", "edge16"]
})
