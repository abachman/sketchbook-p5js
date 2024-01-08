// Original Author: Eric Rees
// https://github.com/reesericci/esbuild-plugin-bookmarklet
//
// GNU GENERAL PUBLIC LICENSE, Version 3, 29 June 2007
// https://github.com/reesericci/esbuild-plugin-bookmarklet/blob/e6bad068707f92fb5ea165f3f869026643044778/LICENSE

const process = require("node:process")

/* 
 * import * as esbuild from "esbuild";
 * import bookmarkletPlugin from "esbuild-plugin-bookmarklet" 
 * 
 * esbuild.build({
 *   entryPoints: ['index.js'], // points to normal javascript
 *   bundle: true,
 *   minify: true,
 *   outfile: 'bookmarklet.js', // where to save bookmarklet javascript
 *   write: false,
 *   format: 'iife',
 *   plugins: [bookmarkletPlugin],
 *   target: ["chrome58", "firefox57", "safari11", "edge16"]
 * })
 */
const bookmarklet = {
  name: 'bookmarklet',
  setup(build) {
    const options = build.initialOptions
    if(options.write == true) {
      throw new Error("`write` must be set to false for this plugin to work correctly.")
    }

    if(options.format != "iife") {
      throw new Error("`format` must be set to iife for this plugin to work correctly.")
    } 

    if(options.minify != true) {
      throw new Error("`minify` must be set to true for your bookmarklet to work as expected.")
    }

    build.onEnd(async (result) => {
      if(result.outputFiles == null) {
        throw new Error("Unable to access outputFiles. This is likely due to `write` being set to true.")
      }
      const encoder = new TextEncoder()
      const js = result.outputFiles.find(f => f.path.match(/\.js$/))
      const modified = encodeURI("javascript:void " + js.text)
      js.contents = encoder.encode(modified)
      console.log(js.text)
    })

    build.onDispose(() => {
	    process.exit(0)
    })
  },
}

module.exports = bookmarklet;
