// ==UserScript==
// @name    [Viz] Chapter Tracker
// @author  Aurange
// @version 1.6
// @match   https://www.viz.com/account
// @grant   window.close
// ==/UserScript==

"use strict";

new MutationObserver(function(mutationList, observer){
  let manga = document.querySelectorAll("div.o_sort_container > div.p-cs-tile"),
      init = true;

  if(manga.length > 0){
    observer.disconnect();

    manga.forEach(e => {
      let title = e.querySelectorAll("a.o_chapters-link > div")[1].textContent,
          link = e.querySelector("a.o_inner-link"),
          chapter = link.querySelector("span").textContent.split(/\s/)[2];

      if(localStorage.getItem(title) === null || Number(chapter) > Number(localStorage.getItem(title))){
        let check = window.open(link, "_blank");

        if(!check){
          if(init){
            init = false;

            alert("Enable pop-ups for this site.");
          }
        }
        else localStorage.setItem(title, chapter);
      }
    });

    window.close();
  }
}).observe(document, {
  childList: true,
  subtree: true
});
