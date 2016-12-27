'use strict';

const Storage = require('./app/storage');
const Parser = require('./app/parser');


module.exports = {

  parse(base_url, page, limit) {
    console.time("Execution time took");
    (new Parser(base_url, page, new Storage(limit)))
      .parse()
      .then(parser => {
        console.log(parser);
        console.timeEnd("Execution time took");
      })
      .catch(err => console.log(err));
  }

};
