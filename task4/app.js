'use strict';

const LinksInit = require('./app/Links');

module.exports = {

  parse (base_url, page) {
    (new LinksInit(base_url, page))
      .parse()
      .then(links => {
        console.log(links);
        console.log(links.length);
      })
  }
};
