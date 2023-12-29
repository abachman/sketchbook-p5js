#!/usr/bin/env node

const https = require("node:https");
const { basename } = require("node:path");
const fs = require("node:fs");

function project(sketch_url) {
  // last part of url is the file name
  const filename = basename(sketch_url);
  // projects URL version of the sketch URL
  return `https://editor.p5js.org/editor/abachman/projects/${filename}`;
}

/***

Built from https://editor.p5js.org/abachman/sketches, in the console:

(() => {
  const $ = document.querySelector.bind(document)
  const l = []
  for (const link of $('.sketches-table__row th[scope=row] a')) {
    l.push([
      link.href,
      link.
      	innerText.
      	replace(/[ ,.!?()'"]/g, '_').
      	toLowerCase()
    ])
	}
  console.log(JSON.stringify(l, null, '  '))
})();

**/

const files = [
  [
    "https://editor.p5js.org/abachman/sketches/iwUNaSfvn",
    "donut_wave",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/1ktdHeWcA",
    "synth_envelope_demo",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/bKVW07Hyu",
    "tube_dancing",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/DsHH0R2_-",
    "workshop_paint",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/9FGH8Q-5w",
    "dla_02",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/xTywu1LX_",
    "dla_01",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/wShgxVCqM",
    "little_trees",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/a2FGWTGix",
    "prime_spiral",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/uXQKwRnFm",
    "glow_chain",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/BTuwWi94v",
    "raycasting_2d",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/WB1zJvgBF",
    "self_portrait__genuary_28",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/SGVnYnKKW",
    "max_headroom_backdrop__genuary_26",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/Oq0lfjUHM",
    "perspective__genuary_25",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/pG3Z7woMh",
    "destroy_packed_circles__genuary_21",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/XpksMwBgx",
    "atan2_pointing",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/A8toulllC",
    "fluid_text__genuary_19",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/BwJHVtn6T",
    "sine_wave_circles__genuary_20",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/dRXT5CdFy",
    "color_wheeling__genuary_17",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/pDSiFxrb2",
    "palette_image",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/98OgeRBjU",
    "circle_packing",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/3OubqYGg2",
    "sand_tracing__genuary_15",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/jI2UD0iiN",
    "this_is_not_a_nft__genuary_14",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/y1FrVDp4g",
    "800x80__genuary_13",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/7aDENmg7o",
    "hidden_circle_tree__genuary_12",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/ZEagdW6aV",
    "hue_map",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/1tAwG0BIj",
    "architects__us_all__genuary_9",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/mFURenje6",
    "pi_rotation",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/82kNk-PDD",
    "continuous_curve__genuary_2022-08",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/2GkDBAVGd",
    "continuous_curve_webgl__genuary_day_8",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/yFWAuwlno",
    "sol_lewitt_walkers__genuary_07",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/jKtcd_X2u",
    "light_painting_-_day_6",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/u-EBIyXf-",
    "destroy_a_square__day_5",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/5fsl7jhoj",
    "an_ant_walking__day_4",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/N1QAqnwMA",
    "flow_field__day_4",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/Eu_KjU34d",
    "arrow_diagrams__day_3",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/dLGvSFQTU",
    "net_wormies",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/Jh16Tfng_",
    "hex_tilings",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/ntB7c49mv",
    "path_follower",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/bryF1F8Kl",
    "arc_paint",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/Pl4Ix_PUK",
    "wandering",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/hUTLm_NuJ",
    "sizzle_box",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/-nNWon9Gx",
    "color_wanderers",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/ktK-1jogR",
    "line_stroke",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/nbXlCs11J",
    "wandering_painters",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/sXrKpxXps",
    "collaborative_pixel_editor__p5_websocket",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/Qkh6eqfOY",
    "drawing_circle",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/zTpbSsaB8",
    "wandering_tree",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/_kxKSY7rm",
    "arbre_de_l_ocèan",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/7l-PT2MSW",
    "circle_filler",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/IMS6CtLgd",
    "touch_circle__p5_websocket_",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/B0k0vaHFo",
    "many_wormies",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/yPpKboSRb",
    "battle_spots",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/fijrFyXIH",
    "identicons",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/ABNt80ooX",
    "cc-demo",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/AUAUzrL1C",
    "perlin_walker",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/hIEciekdn",
    "color_toy",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/AQRVyX6zv",
    "classroom_demo",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/b8wQI6rab",
    "line_rays",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/jvN0CJUee",
    "image_masking",
  ],
  [
    "https://editor.p5js.org/abachman/sketches/2RQCsjhjI",
    "bouncing_triangle",
  ],
];

// first process argument is the sketch URL

function get_file([url, name]) {
  const project_url = project(url);

  https.get(project_url, {
    headers: {
      accept: "application/json",
    },
  }, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      const json = JSON.parse(body);
      const sketch = json.files.filter((f) => f.name == "sketch.js")[0];

      if (sketch) {
        console.log(`// ${name} ${url}`);
        fs.writeFileSync(`src/sketches/${name}.js`, sketch.content);
      }
    });
  });
}

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function get_all_files(files) {
  for (const file of files) {
    get_file(file);
    await pause(3000);
  }
}

get_all_files(files);
