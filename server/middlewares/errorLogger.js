module.exports = (err, req, res, next) => {

  let errorInfo = {
    message: err.message,
    error: {}
  };

  if (req.app.get('env') !== 'production') {
    res.status(err.status || 500);
    errorInfo = Object.assign(errorInfo, {
      error: err.stack
    });
  }

  console.error(err);
  res.json(errorInfo);
};