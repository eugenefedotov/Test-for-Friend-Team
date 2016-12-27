'use strict';

module.exports = class Storage {
  constructor(limit) {
    this.limit = limit || 1000;
    this.links = [];
    this.index = 0;
  }

  add(link) {
    if (this.links.length < this.limit) {
      if (!~this.links.indexOf(link)) {
        this.links.push(link);
      }
      return true;
    }
    return false;
  }

  current() {
    return this.links[this.index] || null;
  }

  next() {
    if (this.links[this.index + 1]) {
      return this.links[++this.index];
    }
    return null;
  }

  canAdd() {
    return this.links.length < this.limit;
  }
};
