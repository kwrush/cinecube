/**
 * Encode query string for API request
 */

module.exports = (req, res, next) => {
  for (let param in req.query) {
    req.query[param] = encodeURIComponent(req.query[param]);
  }
  
  next();
};