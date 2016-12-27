'use strict';

const app = require('./app');

const base_url = 'https://en.wikipedia.org';
const page = '/wiki/Main_Page';
const limit = 1000;

app.parse(base_url, page, limit);
