class Servable {

  constructor(api) {
    this._api = api;
  }

  async _makeRequestById (id, options = {}, reqFun) {
    if (!id) {
      throw Error('Invlaid id value');
    }

    if (typeof reqFun !== 'function') {
      throw TypeError('reqFun should be a function');
    }

    return reqFun({ id: id, ...options });
  }

  async _makeRequest (options = {}, reqFun) {
    if (typeof reqFun !== 'function') {
      throw TypeError('reqFun should be a function');
    }

    return reqFun({ ...options });
  }
}

module.exports = Servable;