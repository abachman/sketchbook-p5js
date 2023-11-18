# yet another p5js sketchbook

this is a [p5.js](https://p5js.org) sketchbook that lets me write code in vim and see it running in firefox. 

i don't love big `node_modules/` folders or giant bundle.js files, but i do like interesting tooling and tight feedback loops. my `node_modules/` is sitting at 16MB, but 1/3 is unminified p5.js and half is the esbuild binary.

my goals: 

- p5.js running in [global mode](https://p5js.org/reference/#/p5/p5) so example code is easy to copy paste
- live reload, [this is provided by esbuild](https://esbuild.github.io/api/#live-reload)
- sketch files don't have to concern themselves with extraneous details, only the sketch
- modern js bundling so shared code can be shared easily with `import` and `export`, also provided by esbuild

## using this sketchbook

```console
$ git clone 
$ cd sketchbook-p5js
$ npm install 
$ npm run watch

> p5js-esbuild@1.0.0 watch
> esbuild src/index.js --bundle --outfile=public/bundle.js --watch --target=chrome58,firefox57 --servedir=public


 > Local:   http://127.0.0.1:8000/
 > Network: http://192.168.1.29:8000/
 > Network: http://192.168.122.1:8000/

[watch] build finished, watching for changes...
``` 

then click the link esbuild spits out
