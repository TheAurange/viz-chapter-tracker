// ==UserScript==
// @name    [Viz] Chapter Tracker
// @author  Aurange
// @version 1.3
// @match   https://www.viz.com/shonenjump/chapters/*
// @match   https://www.viz.com/vizmanga/chapters/*
// @grant   window.close
// ==/UserScript==

"use strict";

let c = document.querySelector("div#chpt_rows tr.o_chapter > td.ch-num-list-spacing > div"),
    cN = c.innerText.split("Ch. ")[1];

if(localStorage.getItem(window.location.href) === null){
  localStorage.setItem(window.location.href, cN);

  c.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.click();
}
else if(Number(cN) > Number(localStorage.getItem(window.location.href))){
  localStorage.setItem(window.location.href, cN);

  c.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.click();
}
else window.close();
