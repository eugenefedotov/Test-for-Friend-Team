"use strict";

let index = 0;
let interval;

const arr   = ["val_1", "val_2", "val_3"];
const value = document.getElementById("value");
const start = document.getElementById("start");
const stop  = document.getElementById("stop");

function showElement () {

  if(!arr[index]) {
    index = 0;
  }
  
  value.innerHTML = arr[index];

  interval = setTimeout(() => {
    index++;
    showElement();
  }, 1000);
}

start.addEventListener("click", () => {
  showElement();
});

stop.addEventListener("click", () => {
  clearTimeout(interval)
});