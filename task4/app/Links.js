'use strict';

const needle = require('needle');
const cheerio = require('cheerio');

module.exports = class Links {

  /**
   *
   * @param base_url
   * @param page
   */
  constructor(base_url, page) {
    this.needle = needle || null;
    this.cheerio = cheerio || null;
    this.base_url = base_url || null;
    this.page = page || null;

    this.links = [];
  }

  /**
   *
   * @returns {Promise}
   */
  parse() {
    return new Promise((main_resolve, reject) => {
      let self = this;

      /**
       *
       * @param links
       * @returns {boolean}
       */
      function* gen(links) {
        for (let i = 0; i < links.length; ++i) {
          yield self.parseSingle(links[i]);
        }
        return true;
      }

      /**
       *
       * @param links
       */
      function rec(links) {
        exec(gen(links))
          .then(() => {
            if (self.links.length < 1000) {
              rec(self.links);
            } else {
              main_resolve(self.links);
            }
          });
      }

      /**
       *
       * @param generator
       * @param main_resolve
       * @returns {Promise}
       */
      function exec(generator, main_resolve) {
        return new Promise((resolve) => {
          let next = generator.next();
          if (next.done) {
            resolve();
            main_resolve();
          } else {
            next.value.then(() => {
              if (self.links.length >= 1000) {
                resolve();
                main_resolve();
              } else {
                exec(generator, resolve);
              }
            });
          }
        });
      }

      rec([ this.page ]);
    });
  }

  /**
   *
   * @param url
   * @returns {Promise}
   */
  parseSingle(url) {
    return new Promise((resolve, reject) => {
      this.needle.get(url, (err, res) => {
        if (err) {
          reject(err);
        }

        let $ = this.cheerio.load(res.body);

        $('a[href^="/wiki"]').map((i, e) => {
          if (this.links.indexOf(this.base_url + $(e).attr('href')) > -1) {
            return;
          }
          if(this.checkLimits()) {
            this.filling($(e).attr('href'));
          }
        });
        resolve();
      });
    })
  }

  /**
   *
   * @param elem
   */
  filling(elem) {
    this.links.push(this.base_url + elem);
  }

  /**
   *
   * @returns {boolean}
   */
  checkLimits() {
    if(this.links.length >= 1000) {
      return false;
    }
    return true;
  }
};