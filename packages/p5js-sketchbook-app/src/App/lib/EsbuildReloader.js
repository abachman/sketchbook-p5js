class EsbuildReloader {
  constructor() {
    this.onunload = this.onunload.bind(this)
    this.attach()
  }

  attach() {
    this.connection = new EventSource("/esbuild")
    this.connection.addEventListener("change", (evt) => {
      console.log("Reload", evt.data);
      location.reload();
    });

    window.addEventListener('beforeunload', this.onunload)
  }

  onunload() {
    console.log('closing connection')
    this.connection.close()
  }
}

export { EsbuildReloader }
