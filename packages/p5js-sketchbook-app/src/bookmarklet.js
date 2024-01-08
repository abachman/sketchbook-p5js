// Description: Bookmarklet to extract the list of sketches from the p5.js website
const safeName = require("safe-name")
const l = []
for (const link of document.querySelectorAll('.sketches-table__row th[scope=row] a')) {
  l.push([
    link.
      innerText.
      replace(/[ ,.!?()'"]/g, '_').
      toLowerCase(),
    link.href
  ])
}
console.log(JSON.stringify(l, null, '  '))
