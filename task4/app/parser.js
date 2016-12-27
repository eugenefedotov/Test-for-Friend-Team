'use strict';

const needle = require('needle');
const cheerio = require('cheerio');

module.exports = class Parser {

  constructor(base_url, page, storage) {
    this.base_url = base_url;
    this.start_page = page;
    this.storage = storage;

    this.storage.add(this.base_url + this.start_page);
  }

  parse() {
    return new Promise((resolve, reject) => {
      let link = this.storage.current();
      if (!link) {
        resolve();
      } else {
        needle.get(link, (err, res) => {
          if (err) {
            return reject(err);
          }

          let $ = cheerio.load(res.body);

          $('a[href^="/wiki"]').map((i, e) => {
            this.storage.add(this.base_url + $(e).attr('href'));
          });

          resolve();
        });
      }
    }).then(() => {
      if (this.storage.next() && this.storage.canAdd()) {
        return this.parse();
      }
      return this;
    });
  }

};
