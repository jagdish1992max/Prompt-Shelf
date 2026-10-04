(function(){
var box=document.getElementById("gen");if(!box)return;
var st=document.createElement("style");
st.textContent=".gen{background:var(--card);border:2px solid var(--line);border-radius:16px;padding:18px;margin:0 0 22px}.gen h2{margin:0 0 4px;font-size:1.25rem}.gen .hint{margin:0 0 12px;color:var(--muted);font-size:.92rem}.gen .chips{margin:0 0 12px}.gen .out{margin:0 0 14px;padding:14px;border-radius:10px;background:var(--bg);border:2px dashed var(--line);white-space:pre-wrap;min-height:90px}.gen .row{display:flex;gap:10px;flex-wrap:wrap}.gen .alt{background:transparent;color:var(--ink);border:2px solid var(--line)}";
document.head.appendChild(st);
function pick(a){return a[Math.floor(Math.random()*a.length)]}
var light=["golden hour sunlight","soft overcast light","warm candlelight","neon glow at night","dramatic side light","blue hour twilight","hazy morning sun","moonlight with soft shadows","bright midday sun","warm lantern light"];
var ratio=["9:16","16:9","4:5","1:1"];
var mood=["calm","epic","dreamy","mysterious","joyful","nostalgic","powerful","peaceful","adventurous","romantic"];
var place=["a quiet mountain village","an old stone temple courtyard","a neon-lit city street","a misty pine forest","a sunlit desert dune","a busy colourful market","a lakeside at dawn","a rooftop above the city","a snowy valley","a tropical beach","a grand palace hall","a rain-soaked alley","a flower field","a rocky cliff by the sea"];
var colour=["teal and orange","gold and deep blue","pastel pink and mint","saffron and purple","black and red","emerald green and cream","sunset orange and violet","silver and navy"];
var M={
"Image":function(){var s=["a lone traveller","an old lighthouse keeper","a street food vendor","a red fox","a young girl with a lantern","a sadhu by a river","a street musician","an astronaut","a white horse","a robot gardener","a fisherman","a dancer in motion","a tiger","a bookshop owner"];
var sty=["ultra-realistic photography","3D Pixar-like render","detailed oil painting","anime illustration","cinematic film still","watercolour art","vintage film photograph","fantasy concept art"];
var cam=["85mm portrait lens, shallow depth of field","wide angle shot","low angle shot","top-down view","close-up with sharp focus","35mm candid framing"];
return pick(sty)+" of "+pick(s)+" in "+pick(place)+", "+pick(light)+", "+pick(cam)+", "+pick(mood)+" mood, "+pick(colour)+" colour palette, highly detailed. Aspect ratio "+pick(ratio)+"."},
"Video":function(){var s=["a woman walking with an umbrella","a cheetah running across grass","a boat drifting on a calm river","a chef tossing food in a flaming pan","a skateboarder at sunset","paper lanterns rising into the sky","a lone rider on a horse","a waterfall in the jungle","a robot waking up","a child chasing bubbles","a train crossing a bridge","a monk walking up temple steps"];
var cam=["slow push-in","smooth tracking shot","drone shot rising upward","orbit around the subject","handheld follow shot","slow-motion close-up","static wide shot with gentle motion"];
var sty=["cinematic","realistic documentary","dreamy soft-focus","anime style","moody film look"];
return pick(sty)+" video of "+pick(s)+" in "+pick(place)+". Camera: "+pick(cam)+". Lighting: "+pick(light)+". Mood: "+pick(mood)+". Smooth natural motion, no text on screen. "+pick(["5","6","8"])+" seconds, "+pick(["9:16","16:9"])+"."},
"My Photo":function(){var o=["a black leather jacket","a cream kurta","a navy suit","a hoodie and sneakers","a royal sherwani","a denim jacket","a white linen shirt","a traditional Pathani suit"];
var r=["as an astronaut","as a samurai","as a traveller","as a chef","as a king","as a detective","as a musician","as a pilot","as himself, relaxed and candid"];
var sty=["realistic cinematic portrait","3D cartoon style","anime style","oil painting","retro film photo","magazine-cover style"];
return "Use my uploaded photo as the face reference and keep my face exactly the same. "+pick(sty)+" of me "+pick(r)+", wearing "+pick(o)+", in "+pick(place)+", "+pick(light)+", "+pick(mood)+" mood. Aspect ratio "+pick(ratio)+"."},
"Devotional":function(){var d=["Lord Shiva","Lord Hanuman","Lord Krishna","Lord Ganesha","Goddess Durga","Goddess Lakshmi","Lord Ram","Goddess Saraswati"];
var set=["Mount Kailash with snow peaks","a golden temple at sunrise","a riverbank with floating diyas","a lotus pond at dawn","a grand temple hall with lamps","a moonlit forest","a sky full of saffron clouds"];
var sty=["cinematic realistic","traditional painting","3D render","soft glowing illustration"];
return pick(sty)+" image of "+pick(d)+" in "+pick(set)+", "+pick(light)+", divine golden aura, calm "+pick(["serene","powerful","compassionate"])+" expression, traditional iconography, respectful and reverent mood. Aspect ratio "+pick(["9:16","16:9"])+"."}
};
var modes=["Image","Video","My Photo","Devotional"],mode="Image",last="";
box.className="gen";
box.innerHTML='<h2>Random Prompt Generator</h2><p class="hint">Har click par naya prompt. Mode chuno aur button dabao.</p><div class="chips" id="gm"></div><p class="out" id="go" aria-live="polite"></p><div class="row"><button class="copy" id="gb">Naya prompt banao</button><button class="copy alt" id="gc">Copy</button></div>';
var gm=document.getElementById("gm"),go=document.getElementById("go"),gb=document.getElementById("gb"),gc=document.getElementById("gc");
function chips(){gm.innerHTML="";modes.forEach(function(m){var b=document.createElement("button");b.className="chip";b.textContent=m;b.setAttribute("aria-pressed",m===mode);b.onclick=function(){mode=m;chips();make()};gm.appendChild(b)})}
function make(){var t;for(var i=0;i<5;i++){t=M[mode]();if(t!==last)break}last=t;go.textContent=t}
gb.onclick=make;
gc.onclick=function(){var t=go.textContent;function ok(){gc.textContent="Copied";setTimeout(function(){gc.textContent="Copy"},1500)}
function fb(){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy");ok()}catch(e){}document.body.removeChild(a)}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,fb)}else fb()};
chips();make();
})();
