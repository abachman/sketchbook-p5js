import { Selector } from "./selector/Selector.jsx";

function domReady(fn) {
  // If we're early to the party
  document.addEventListener("DOMContentLoaded", fn)
  // If late; I mean on time.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    fn()
  }
}

export default function App({ sketches, p5 }) {
  domReady(() => {
    // Clear the existing HTML content
    document.body.innerHTML = '<div id="app"></div>';

    // Render your React component instead
    const root = createRoot(document.getElementById("app"));
    root.render(<Selector sketches={sketches} p5={p5} />);
  })
}
