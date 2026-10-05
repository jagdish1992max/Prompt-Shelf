/* Visitors dekhne ke liye: goatcounter.com par free account banao (non-commercial ke liye free),
   apna code yahan quotes ke andar daalo. Jaise: var GC_CODE="promptwala"; */
var GC_CODE="";
(function(){
if(!GC_CODE)return;
var s=document.createElement("script");s.async=true;s.src="//gc.zgo.at/count.js";
s.setAttribute("data-goatcounter","https://"+GC_CODE+".goatcounter.com/count");
document.head.appendChild(s);
function send(name,title){try{if(window.goatcounter&&window.goatcounter.count){window.goatcounter.count({path:name,title:title,event:true})}}catch(e){}}
document.addEventListener("click",function(ev){
  var b=ev.target.closest&&ev.target.closest("button");if(!b)return;
  var card=b.closest(".card,.potd");if(!card)return;
  var h=card.querySelector("h2"),t=h?h.textContent:"prompt",label=(b.textContent||"").trim().toLowerCase();
  if(label.indexOf("copy")===0)send("copy-"+t.toLowerCase().replace(/[^a-z0-9]+/g,"-"),"Copy: "+t);
  else if(label==="share")send("share-"+t.toLowerCase().replace(/[^a-z0-9]+/g,"-"),"Share: "+t);
  else if(label==="saved")send("save-"+t.toLowerCase().replace(/[^a-z0-9]+/g,"-"),"Save: "+t);
});
})();
