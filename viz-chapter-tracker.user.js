// ==UserScript==
// @name    [Viz] Chapter Tracker
// @author  Aurange
// @version 1.10
// @match   https://www.viz.com/account
// @grant   window.close
// ==/UserScript==

"use strict";

new MutationObserver(function(mutationList, observer){
  let manga = document.querySelectorAll("div.o_sort_container > div.p-cs-tile");

  if(manga.length > 0){
    observer.disconnect();

    let init = false,
        pN = true;

    manga.forEach(e => {
      let title = e.querySelectorAll("a.o_chapters-link > div")[1].textContent,
          link = e.querySelector("a.o_inner-link"),
          chapter = link.querySelector("span").textContent.split(/\s/)[2];

      if(Number(chapter) > Number(localStorage.getItem(title))){
        let check = window.open(link, "_blank");

        if(!check){
          if(!init){
            init = true;
            pN = false;

            alert("Enable pop-ups for this site and then refresh.");
          }
        }
        else localStorage.setItem(title, chapter);
      }
    });

    if(pN) window.close();
  }
}).observe(document, {
  childList: true,
  subtree: true
});
