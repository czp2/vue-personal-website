function loadJs(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)

    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject(new Error())
    }
  })
}

export { loadJs }

const base = {
  install(Vue) {
    Vue.prototype.loadJs = loadJs
  }
}

export default base
