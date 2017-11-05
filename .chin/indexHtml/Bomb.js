export default class Bomb {
  constructor(opts) {
    this._requires = opts.requires
    this._render = opts.render
    this._output = opts.output
    this._path = opts.outpath
    this._props = {}
  }

  setProp(name, prop) {
    if (!this._requires.includes(name)) {
      throw new Error(``)
    }
    this._props[name] = prop
    return this._isready() && this._out()
  }

  _isready() {
    return this._requires.every(key => this._props[key])
  }

  _out() {
    const { _output, _path, _render, _props } = this
    return _output(_path, _render(_props))
  }
}
