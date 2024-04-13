import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Selector } from "./components/Selector.jsx";

import "./styles/index.css";

function domReady(fn) {
  // If we're early to the party
  document.addEventListener("DOMContentLoaded", fn);
  // If late; I mean on time.
  if (
    document.readyState === "interactive" || document.readyState === "complete"
  ) {
    fn();
  }
}

// Disable React DevTools warnings in console
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true };

export default function App({ sketches, p5 }) {
  domReady(() => {
    // Clear the existing HTML content
    document.body.innerHTML = '<div id="app"></div>';

    const sketchRouter = createHashRouter([
      {
        path: "/",
        element: <Selector sketches={sketches} p5={p5} />,
      },
    ]);

    // Render your React component instead
    const root = createRoot(document.getElementById("app"));

    root.render(<RouterProvider router={sketchRouter} />); 
  });
}
