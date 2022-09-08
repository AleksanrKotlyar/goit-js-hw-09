const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(){t.disabled=!0,n=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(n)}));let n=null;
//# sourceMappingURL=01-color-switcher.5548a67e.js.map
