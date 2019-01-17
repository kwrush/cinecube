//TODO: refactor this

const getResponse = (message) => ({
  error: true,
  message: message
});

const logErrors = (err) => {
  // TODO: write to log files
  console.error(err);
};

module.exports = (err, req, res, next) => {
  if (err && err.status) {
    const msg = err.response.text 
      ? JSON.parse(err.response.text).status_message 
      : 'Error occurs in API request';
    res.status(err.status).send(getResponse(msg));
  } else if (err) {
    logErrors(err);
    res.status(404).end();
    //res.status(500).send(getResponse(typeof err === 'object' ? err.message : err));
  } else {
    next();
  }
};