(function(){
"use strict";
var q=document.getElementById("q"),list=document.getElementById("list");
if(!q||!list)return;
var bar=document.createElement("div");bar.id="pw-toolbar";
bar.innerHTML='<span id="pw-count" aria-live="polite">Loading prompts…</span><div id="pw-actions"><select id="pw-sort" aria-label="Sort prompts"><option value="recommended">Recommended</option><option value="az">Title A–Z</option><option value="za">Title Z–A</option></select><button class="pw-action" id="pw-clear" type="button">Clear search</button><button class="pw-action primary" id="pw-random" type="button">Surprise me ✦</button></div>';
q.insertAdjacentElement("afterend",bar);
var toast=document.createElement("div");toast.id="pw-toast";toast.setAttribute("role","status");toast.textContent="Ready";document.body.appendChild(toast);
var sort=document.getElementById("pw-sort"),count=document.getElementById("pw-count"),timer;
function titleOf(node){var t=node.querySelector(".po b")||node.querySelector(".cap");return t?(t.textContent||"").trim():""}
function refresh(){
 var nodes=Array.prototype.slice.call(list.querySelectorAll(".tile"));
 if(sort.value!=="recommended"){
  var sorted=nodes.slice().sort(function(a,b){var c=titleOf(a).localeCompare(titleOf(b));return sort.value==="za"?-c:c});
  var changed=sorted.some(function(n,i){return n!==nodes[i]});
  if(changed)sorted.forEach(function(n){list.appendChild(n)});
 }
 var shown=list.querySelectorAll(".tile").length;
 var total=(typeof PROMPTS!=="undefined")?PROMPTS.length:shown;
 count.textContent=shown+" visible · "+total+" total prompts";
}
function ping(message){toast.textContent=message;toast.classList.add("show");clearTimeout(timer);timer=setTimeout(function(){toast.classList.remove("show")},1800)}
document.getElementById("pw-clear").addEventListener("click",function(){q.value="";q.dispatchEvent(new Event("input",{bubbles:true}));q.focus();ping("Search cleared")});
sort.addEventListener("change",refresh);
document.getElementById("pw-random").addEventListener("click",function(){var a=list.querySelectorAll(".tile");if(!a.length){ping("No visible prompts");return}a[Math.floor(Math.random()*a.length)].click();});
if(window.MutationObserver)new MutationObserver(refresh).observe(list,{childList:true});
refresh();
document.documentElement.setAttribute("data-promptwala","2");
})();