const { describe, it, test } = require("node:test");
const assert = require("node:assert");

const fileFixture = require("./support/file_fixture.js");
const globalToInstance = require("../src/translate.js");

// test fixtures
const FIXTURES = {
  function: { 
    before: `function draw() { }`,
    after: `p5.draw = function() { }`
  },

  functionCall: {
    before: `background('asdf')`,
    after: `p5.background('asdf')`
  },

  extended: {
    before: `function onConnection() { sendMessage('asdf') }`,
    after: `p5.onConnection = function() { p5.sendMessage('asdf') }`
  },

  objectExpression: {
    before: `const setting = { width, height: height / 2 }`,
    after: `const setting = { width: p5.width, height: p5.height / 2 }`
  },

  params: {
    simple: {
      before: `const setting = (square) => { fill(square) }`,
      after: `const setting = (square) => { p5.fill(square) }`,
    },
    objectExpression: {
      before: `const setting = ({square}) => { fill(square) }`,
      after: `const setting = ({square}) => { p5.fill(square) }`,
    },
    objectExpressionAlias: {
      before: `const setting = ({ plumbus: square }) => { fill(square) }`,
      after: `const setting = ({ plumbus: square }) => { p5.fill(square) }`,
    },
    objectExpressionRest: {
      before: `const setting = ({ ...square }) => { fill(square) }`,
      after: `const setting = ({ ...square }) => { p5.fill(square) }`,
    },
    assignmentExpression: {
      before: `const setting = (square = ellipse(20)) => { fill(square) }`,
      after: `const setting = (square = p5.ellipse(20)) => { p5.fill(square) }`,
    },
  },

  functionParams: fileFixture('./fixtures/function_params'),
  variableOverride: fileFixture('./fixtures/variable_override'),
}

async function t(fixture, options = {}) {
  if (fixture.type === 'file') {
    const loaded = await fixture.load()
    const result = globalToInstance(loaded.before, { config: options })
    return assert.equal(result.trim(), loaded.after.trim())
  } else {
    const result = globalToInstance(fixture.before, { config: options })
    return Promise.resolve(assert.equal(result.trim(), fixture.after.trim()))
  }
}

describe('translate', async () => {
  it('top-level functions', async () => {
    await t(FIXTURES.function)
  })

  it('function calls', async () => {
    await t(FIXTURES.functionCall)
  })

  it('extended', async () => {
    await t(FIXTURES.extended, { instanceMethods: ['sendMessage', 'onConnection'] })
  })

  it('handles ObjectExpression standalone Property Identifiers', async () => {
    await t(FIXTURES.objectExpression)
  })

  for (const [key, style] of Object.entries(FIXTURES.params)) {
    it(`handles ${key} param`, async () => {
      await t(style)
    })
  }

  it('handles function params', async () => {
    await t(FIXTURES.functionParams)
  })

  it('handles scoped variable overrides', async () => {
    await t(FIXTURES.variableOverride)
  })
});
