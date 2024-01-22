import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search } from "./Search.jsx";
import { EsbuildReloader } from "../lib/EsbuildReloader.js";

function sn(sketch) {
  return (sketch.metadata && sketch.metadata.name) || sketch.path;
}

function basename(path) {
  return last(path.split("/"));
}

function last(arr) {
  return arr[arr.length - 1];
}

const Selector = ({ sketches, p5 }) => {
  const [sketch, setSketch] = useState(null);

  useEffect(() => {
    new EsbuildReloader();

    console.log("selector with", { sketches });

    let sketch = Object.values(sketches)[0];
    let s = new URLSearchParams(window.location.search);
    if (s.has("sketch") && s.get("sketch") in sketches) {
      sketch = sketches[s.get("sketch")];
      setSketch(sketch);
    }

    new p5(sketch.sketch, "sketch");
  }, []);

  return (
    <div className="parent">
      <div className="header">
        <h1>{sketch && sn(sketch)}</h1>
        <a href={sketch && `file://${sketch.path}`}>
          {sketch && basename(sketch.path)}
        </a>
      </div>
      <div className="left">
        <Search sketches={sketches} />
      </div>
      <div className="right">
        <div id="sketch"></div>
      </div>
    </div>
  );
};

export { Selector };
