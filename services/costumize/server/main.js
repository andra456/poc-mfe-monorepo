const { app } = require('./server');
const APP_PORT = 3009;

module.exports = {
  serve: function() {
    app.listen(APP_PORT, err => {
      if (err) {
        console.error(err); // eslint-disable-line
      }
      console.info(`Listening on port ${APP_PORT} ✅`); // eslint-disable-line
    });
  },
};
