'use strict';

const app = require('./app');

const base_url = 'https://en.wikipedia.org';
const page = base_url + '/wiki/Main_Page';

app.parse(base_url, page);