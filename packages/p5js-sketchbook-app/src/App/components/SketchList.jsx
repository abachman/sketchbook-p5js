import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Fuse from "fuse.js";

const fuseOptions = {
  isCaseSensitive: false,
  threshold: 0.4,
  keys: ["name"],
};

const SketchList = ({ entries, activeKey, onSelect }) => {
  const [query, setQuery] = useState("");
  const activeRef = useRef(null);

  const fuse = useMemo(() => new Fuse(entries, fuseOptions), [entries]);

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, entries]);

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  // Scroll the active sketch into view on mount
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: "center" });
    }
  }, []);

  return (
    <div className="sketch-list">
      <div className="sketch-list-search">
        <input
          type="text"
          placeholder="Filter sketches..."
          value={query}
          onChange={handleChange}
        />
        <span className="sketch-list-count">{filtered.length}</span>
      </div>
      <ul className="sketch-list-items">
        {filtered.map((entry) => {
          const isActive = entry.key === activeKey;
          return (
            <li
              key={entry.key}
              ref={isActive ? activeRef : null}
              className={isActive ? "sketch-item active" : "sketch-item"}
            >
              <button onClick={() => onSelect(entry.key)}>
                {entry.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { SketchList };
