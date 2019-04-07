class Routable {
  constructor (router) {
    this._VERSION = 'v1';
    this._router = router;
    this._registerRoutes();
  }

  _registerRoutes () {}
}
module.exports = Routable;