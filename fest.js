(function(){
var box=document.getElementById("fest");if(!box)return;
var E=[["Navratri","2026-10-11","2026-10-19","Navratri"],["Dussehra","2026-10-20","2026-10-20","Dussehra"],["Dhanteras","2026-11-06","2026-11-06","Dhanteras"],["Diwali","2026-11-08","2026-11-08","Diwali"],["Bhai Dooj","2026-11-10","2026-11-10","Bhai Dooj"],["Christmas","2026-12-25","2026-12-25","Christmas"],["Makar Sankranti","2027-01-14","2027-01-14","Sankranti"]];
function d(s){var p=s.split("-");return new Date(+p[0],+p[1]-1,+p[2])}
var n=new Date(),today=new Date(n.getFullYear(),n.getMonth(),n.getDate()),DAY=86400000,ev=null,msg="";
for(var i=0;i<E.length;i++){var a=d(E[i][1]),b=d(E[i][2]);if(b>=today){ev=E[i];
 if(today>=a){var k=Math.round((today-a)/DAY)+1;msg=(a.getTime()===b.getTime())?"Aaj "+ev[0]+" hai. Shubh "+ev[0]+"!":ev[0]+" chal raha hai, din "+k}
 else{var left=Math.round((a-today)/DAY);msg=left===1?ev[0]+" kal hai":ev[0]+" me "+left+" din baaki"}
 break}}
if(!ev)return;
var st=document.createElement("style");
st.textContent=".fest{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;background:var(--gold);color:#1B1505;border-radius:14px;padding:12px 16px;margin:0 0 14px;font-weight:600}.fest button{font:inherit;font-weight:600;padding:8px 16px;border:0;border-radius:99px;background:#1B1505;color:#F1EFE3;cursor:pointer}.fest button:focus-visible{outline:3px solid #1B1505;outline-offset:2px}";
document.head.appendChild(st);
box.className="fest";
var t=document.createElement("span");t.textContent=msg;
var b2=document.createElement("button");b2.textContent=ev[0]+" prompts dekho";
b2.onclick=function(){
 var q=document.getElementById("q");q.value=ev[3];
 window.grp="All";window.cat="All";window.term=ev[3].toLowerCase();
 if(window.renderChips)renderChips();if(window.render)render();
 var l=document.getElementById("groups");if(l)l.scrollIntoView({behavior:"smooth",block:"start"});
};
box.appendChild(t);box.appendChild(b2);
})();
