import { useState, useEffect, useCallback } from "react";
import Fuse from "fuse.js";

const fuseOptions = {
  isCaseSensitive: false,
  keys: [ "name" ],
};


/*
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
*/

const Search = ({ sketches }) => {
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    const list = Object.keys(sketches).map((sketch) => ({
      id: sketch,
      name: sketches[sketch].path,
      key: sketch
    }));
    console.log('populate search', { list })
    setFuse(new Fuse(list, fuseOptions))
    setResults([]);
  }, [sketches]);

  const onSearch = useCallback((pattern) => {
    const results = fuse.search(pattern);
    setResults(results);
  }, [fuse]);

  return (
    <div>
      <input type="text" onChange={(e) => onSearch(e.target.value)} /><br />
      {results.map((result) => (
        <div key={result.item.id}>
          <a href={`?sketch=${result.item.key}`}>{result.item.name}</a>
        </div>
      ))}
    </div>
  );
};

export { Search }
