/*

 App.js

*/

// Import Modules.
import List from '@/base/Modules/List/'
import Detail from '@/base/Modules/Detail/'

export default class App {
  constructor() {
    this.list = new List()
    this.detail = new Detail()
  }

  init() {
    this.list.core()
    this.detail.core()
  }

  domContentLoaded() {}

  load() {}

  resize() {
    this.detail.resizeInit()
  }

  scroll() {}
}
