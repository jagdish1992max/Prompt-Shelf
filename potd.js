(function(){
var box=document.getElementById("potd");if(!box||typeof PROMPTS==="undefined"||!PROMPTS.length)return;
var st=document.createElement("style");
st.textContent=".potd{position:relative;background:linear-gradient(135deg,var(--goldbg),transparent 70%),var(--card);border:1px solid var(--gold);border-radius:18px;padding:18px;margin:0 0 16px}.potd .lab{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:0 0 8px;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;font-weight:600;color:var(--gold)}.potd .lab span:last-child{color:var(--muted)}.potd h2{margin:0 0 8px;font-size:1.2rem}.potd .text{margin:0 0 14px;white-space:pre-wrap;font-size:.95rem;color:var(--muted)}";
document.head.appendChild(st);
function gcd(a,b){return b?gcd(b,a%b):a}
var now=new Date(),day=Math.floor((now.getTime()-now.getTimezoneOffset()*60000)/86400000);
var n=PROMPTS.length,s=97;while(gcd(s,n)!==1)s++;
var x=PROMPTS[(day*s)%n];
function esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
box.className="potd";
box.innerHTML='<p class="lab"><span>Prompt of the day</span><span>'+now.getDate()+" "+months[now.getMonth()]+" "+now.getFullYear()+'</span></p><h2>'+esc(x.t)+'</h2><p class="text">'+esc(x.p).replace(/\[([^\]]+)\]/g,"<mark>[$1]</mark>")+'</p><div class="btns"></div>';
var w=box.querySelector(".btns"),c=document.createElement("button"),sh=document.createElement("button");
c.className="copy";c.textContent="Copy prompt";c.onclick=function(){copy(x.p,c)};
sh.className="copy share";sh.textContent="Share";sh.onclick=function(){share(x)};
w.appendChild(c);w.appendChild(sh);
})();
