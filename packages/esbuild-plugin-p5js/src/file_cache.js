class Cache {
  memory = new Map()

  async fetch(key, mtime, callback) {
    if (this.memory.has(key)) {
      if (this.memory.get(key).mtime === mtime) {
        // console.log('cache hit', key)
        return this.memory.get(key).value
      }
    }

    // console.log('cache miss', key)
    const value = await callback()
    this.memory.set(key, { value, mtime })
    return value
  }

  reset() {
    this.memory = new Map()
  }
}

module.exports = new Cache()
