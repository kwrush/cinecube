class Servable {

  constructor(api) {
    this._api = api;
  }

  _makeRequestById(id, options = {}, reqFun) {
    if (!id) {
      return Promise.reject('Invalid id value');
    }

    if (typeof reqFun !== 'function') {
      return Promise.reject('reqFun should be a function');
    }

    return reqFun({ id: id, ...options });
  }

  _makeRequest(options = {}, reqFun) {
    if (typeof reqFun !== 'function') {
      return Promise.reject('reqFun should be a function');
    }

    return reqFun(options);
  }
}

module.exports = Servable;