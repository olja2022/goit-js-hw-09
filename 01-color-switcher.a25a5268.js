!function(){var t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),body:document.body},n=null;function o(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.btnStart.addEventListener("click",(function(a){t.btnStart.disabled=!0,t.btnStop.disabled=!1,n=setInterval(o,1e3)})),t.btnStop.addEventListener("click",(function(o){t.btnStart.disabled=!1,t.btnStop.disabled=!0,clearInterval(n),n=0})),t.btnStop.disabled=!0}();
//# sourceMappingURL=01-color-switcher.a25a5268.js.map
