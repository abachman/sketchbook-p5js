import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Selector = ({ sketches, p5 }) => {
  const [label, setLabel] = useState("Sketch");

  useEffect(() => {
    new EventSource("/esbuild").addEventListener("change", (evt) => {
      console.log("RELOAD", evt.data);
      // location.reload();
    });

    let sketch = sketches.sketch_016;
    let s = new URLSearchParams(window.location.search);
    if (s.has("sketch") && s.get("sketch") in sketches) {
      sketch = sketches[s.get("sketch")];
      setLabel(sketch.name);
    }

    new p5(sketch.sketch, "sketch");
  }, []);

  return (
    <>
      <div className='left'>
        <h1>{label}</h1>
        <ul>
          {Object.keys(sketches).toSorted().map((sketch, i) => (
            <li key={i}>
              {
                sketches[sketch].name === label ? 
                  <strong>{sketches[sketch].name}</strong> :
                  <a href={`?sketch=${sketch}`}>{sketches[sketch].name}</a>
              }

            </li>
          ))}
        </ul>
      </div>
      <div className='right'>
        <div id='sketch'></div>
      </div>
    </>
  );
};

export { Selector } 
