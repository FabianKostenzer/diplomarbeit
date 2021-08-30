module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/assets/index.scss";
          `
      }
    }
  }
}
