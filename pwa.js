(function(){
if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})})}
var st=document.querySelector(".stats");if(!st)return;
var standalone=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone;if(standalone)return;
var css=document.createElement("style");css.textContent=".inst{font:inherit;cursor:pointer;background:#D6A93C;color:#1B1505;border:0;border-radius:12px;padding:9px 16px;font-weight:600;font-size:.9rem;align-self:stretch}.instnote{flex-basis:100%;margin:0;font-size:.85rem;color:#CFCDB9}";
document.head.appendChild(css);
var ev=null,btn=document.createElement("button");btn.className="inst";btn.textContent="App install karo";btn.hidden=true;st.appendChild(btn);
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();ev=e;btn.hidden=false});
btn.onclick=function(){if(!ev)return;ev.prompt();ev.userChoice.then(function(){ev=null;btn.hidden=true})};
window.addEventListener("appinstalled",function(){btn.hidden=true});
var ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
if(ios){btn.hidden=false;btn.textContent="Home screen par jodo";btn.onclick=function(){var n=st.querySelector(".instnote");if(n)return;n=document.createElement("p");n.className="instnote";n.textContent="Safari me Share icon dabao, phir Add to Home Screen chuno.";st.appendChild(n)}}
})();
