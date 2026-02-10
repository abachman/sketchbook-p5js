import { useEffect, useState, useCallback, useRef } from "react";
import { SketchList } from "./SketchList.jsx";
import { EsbuildReloader } from "../lib/EsbuildReloader.js";

function sketchName(sketch) {
  return (sketch.metadata && sketch.metadata.name) || sketch.path;
}

function basename(path) {
  return path.split("/").pop();
}

function buildSketchEntries(sketches) {
  return Object.keys(sketches)
    .map((key) => ({
      key,
      name: sketchName(sketches[key]),
      path: sketches[key].path,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getInitialSketchKey(sketches) {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("sketch");
  if (requested && requested in sketches) {
    return requested;
  }
  return Object.keys(sketches)[0];
}

const Selector = ({ sketches, p5 }) => {
  const [activeKey, setActiveKey] = useState(() => getInitialSketchKey(sketches));
  const p5InstanceRef = useRef(null);
  const entries = buildSketchEntries(sketches);
  const activeSketch = sketches[activeKey];

  // Set up live reload on mount
  useEffect(() => {
    new EsbuildReloader();
  }, []);

  // Create / recreate the p5 instance when the active sketch changes
  useEffect(() => {
    if (!activeSketch) return;

    // Tear down previous instance
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }

    // Clear the container
    const container = document.getElementById("sketch");
    if (container) {
      container.innerHTML = "";
    }

    p5InstanceRef.current = new p5(activeSketch.sketch, "sketch");

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [activeKey]);

  const handleSelect = useCallback((key) => {
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set("sketch", key);
    window.history.replaceState({}, "", url);

    setActiveKey(key);
  }, []);

  return (
    <div className="parent">
      <div className="header">
        <h1>{activeSketch && sketchName(activeSketch)}</h1>
        {activeSketch && (
          <span className="header-path">{basename(activeSketch.path)}</span>
        )}
      </div>
      <div className="left">
        <SketchList
          entries={entries}
          activeKey={activeKey}
          onSelect={handleSelect}
        />
      </div>
      <div className="right">
        <div id="sketch"></div>
      </div>
    </div>
  );
};

export { Selector };
