
const request = require('request-promise-lite');

class Webhook {
  constructor(settings) {
    this.url = settings.url;
    this.headers = settings.headers || {};
    this.payload = settings.payload || {};
    this.json = settings.json || true;
  }

  notify(notification, logger) {

    if (!this.url) return Promise.reject(new Error('Cannot send webhook notification without url'));

    const query = {
      headers: Object.assign(this.headers, {
        'Content-Type': 'application/json',
      }),
      json: this.json,
      body: Object.assign(notification, this.payload), // Merge the default notification and the custom payload
    };

    return request.post(this.url, query);

  }
}

module.exports = Webhook;
