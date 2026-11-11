(function(){
"use strict";
if(document.getElementById("pw5-tools")) return;
var LIBKEY="promptwala_pw4_library_v1", FOLDERKEY="promptwala_pw5_folders_v1";
var folders=read(FOLDERKEY,["YouTube","Horror","Photography","Business","Logos"]);
var css=document.createElement("style");
css.textContent=`
#pw5-tools{margin:18px auto 28px;padding:18px;border:1px solid rgba(34,211,238,.28);border-radius:22px;background:linear-gradient(145deg,#101b2d,#17132b);color:#f3f6ff;box-shadow:0 14px 38px rgba(0,0,0,.22)}
#pw5-tools h2{margin:0 0 6px;font-size:1.35rem}#pw5-tools .pw5-sub{margin:0 0 14px;color:#aebbd3;font-size:.9rem}
#pw5-tools label{display:block;color:#cbd5e1;font-size:.84rem;font-weight:650;margin:10px 0 5px}
#pw5-tools textarea,#pw5-tools input,#pw5-tools select{box-sizing:border-box;width:100%;padding:11px 12px;border:1px solid rgba(148,163,184,.28);border-radius:11px;background:#0b1222;color:#f8fafc;font:inherit;min-width:0}
#pw5-tools textarea{min-height:112px;resize:vertical}#pw5-tools .pw5-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
#pw5-tools .pw5-vars{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
#pw5-tools .pw5-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
#pw5-tools button{border:1px solid rgba(148,163,184,.25);border-radius:10px;padding:9px 12px;background:#202b43;color:#eef2ff;font:inherit;font-weight:650;cursor:pointer}
#pw5-tools .pw5-primary{background:linear-gradient(120deg,#0e7490,#6d28d9);border:0}
#pw5-tools .pw5-output{white-space:pre-wrap;overflow-wrap:anywhere;min-height:70px;margin-top:12px;padding:13px;background:#080f1d;border:1px solid rgba(148,163,184,.2);border-radius:13px}
#pw5-tools .pw5-folder-list{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px}
#pw5-tools .pw5-chip{font-size:.78rem;padding:6px 9px;border-radius:20px;background:#17263d;border:1px solid #334155}
#pw5-tools .pw5-note{color:#91a0b8;font-size:.76rem;margin-top:12px}
@media(max-width:520px){#pw5-tools{padding:14px}#pw5-tools .pw5-grid,#pw5-tools .pw5-vars{grid-template-columns:1fr}}
`;
document.head.appendChild(css);
var section=document.createElement("section");section.id="pw5-tools";
section.innerHTML=`
<h2>🚀 PromptWala 5.0</h2><p class="pw5-sub">Smart Variables · My Folders · Backup & Restore</p>
<h3>🧩 Smart Prompt Variables</h3>
<label for="pw5-template">Prompt template</label>
<textarea id="pw5-template" placeholder="Create a cinematic {{style}} scene featuring {{subject}} in {{location}}, with {{lighting}} lighting."></textarea>
<p class="pw5-note">Use placeholders like {{subject}}, {{style}}, {{location}}. Matching input fields appear automatically.</p>
<div id="pw5-vars" class="pw5-vars"></div>
<div class="pw5-actions"><button type="button" class="pw5-primary" id="pw5-generate">Build prompt ✦</button><button type="button" id="pw5-copy">Copy result</button></div>
<div id="pw5-output" class="pw5-output">Your completed prompt will appear here.</div>
<div class="pw5-grid">
 <div><label for="pw5-save-folder">Save in folder</label><select id="pw5-save-folder"></select></div>
 <div><label for="pw5-new-folder">Create a folder</label><input id="pw5-new-folder" placeholder="e.g. AI Video"></div>
</div>
<div class="pw5-actions"><button type="button" id="pw5-add-folder">＋ Add folder</button><button type="button" class="pw5-primary" id="pw5-save">Save to My Library</button></div>
<div class="pw5-folder-list" id="pw5-folder-list"></div>
<hr style="border:0;border-top:1px solid #334155;margin:18px 0">
<h3>📦 Backup & Restore</h3><p class="pw5-note">Export your saved prompt history, favourites and folders as one JSON backup. Import it later on this or another browser.</p>
<div class="pw5-actions"><button type="button" class="pw5-primary" id="pw5-export">⬇ Export backup</button><button type="button" id="pw5-import">⬆ Import backup</button><input id="pw5-file" type="file" accept=".json,application/json" hidden></div>
<p class="pw5-note">Your data stays in this browser unless you export and move the backup file yourself. No API key or paid service required.</p>`;
var anchor=document.getElementById("pw4-library")||document.getElementById("pw3-generator");
if(!anchor)return;
anchor.insertAdjacentElement("afterend",section);
function read(k,def){try{var v=JSON.parse(localStorage.getItem(k));return v==null?def:v}catch(e){return def}}
function write(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){toast("Browser storage is full or unavailable.");return false}}
function toast(s){var n=document.getElementById("pw5-toast");if(n)n.remove();n=document.createElement("div");n.id="pw5-toast";n.textContent=s;n.style.cssText="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:999999;background:#202b43;color:white;padding:10px 15px;border-radius:12px;box-shadow:0 8px 25px #0008;max-width:90%;text-align:center";document.body.appendChild(n);setTimeout(function(){n.remove()},1900)}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function getItems(){var a=read(LIBKEY,[]);return Array.isArray(a)?a:[]}
function setFolders(){var sel=document.getElementById("pw5-save-folder");sel.innerHTML='<option value="">Unsorted</option>'+folders.map(function(f){return '<option value="'+esc(f)+'">'+esc(f)+'</option>'}).join("");document.getElementById("pw5-folder-list").innerHTML=folders.map(function(f){return '<span class="pw5-chip">'+esc(f)+'</span>'}).join("")||'<span class="pw5-note">No folders yet.</span>'}
function variables(){var t=document.getElementById("pw5-template").value,seen={},keys=[];t.replace(/\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g,function(_,k){k=k.toLowerCase();if(!seen[k]){seen[k]=1;keys.push(k)}});var host=document.getElementById("pw5-vars");host.innerHTML=keys.map(function(k){return '<div><label for="pw5-var-'+esc(k)+'">'+esc(k.replace(/[-_]/g," ").replace(/\b\w/g,function(x){return x.toUpperCase()}))+'</label><input id="pw5-var-'+esc(k)+'" data-var="'+esc(k)+'" placeholder="Enter '+esc(k)+'"></div>'}).join("")||'<p class="pw5-note">Add a {{placeholder}} in your template to create a variable field.</p>'}
function build(){var t=document.getElementById("pw5-template").value;if(!t.trim()){toast("Pehle prompt template likho.");return ""}var vals={};section.querySelectorAll("[data-var]").forEach(function(e){vals[e.getAttribute("data-var")]=e.value.trim()});var missing=[];var out=t.replace(/\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g,function(_,k){k=k.toLowerCase();if(!vals[k])missing.push(k);return vals[k]||"["+k+"]"});if(missing.length){toast("Fill these variables: "+Array.from(new Set(missing)).join(", "));return ""}document.getElementById("pw5-output").textContent=out;return out}
document.getElementById("pw5-template").value="Create a cinematic {{style}} scene featuring {{subject}} in {{location}}, with {{lighting}} lighting. Highly detailed composition, professional quality.";
document.getElementById("pw5-template").addEventListener("input",variables);
document.getElementById("pw5-generate").addEventListener("click",build);
document.getElementById("pw5-copy").addEventListener("click",function(){var t=document.getElementById("pw5-output").textContent;if(!t||t.indexOf("Your completed prompt")===0){toast("Generate a prompt first.");return}copy(t)});
function copy(t){if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(function(){toast("Copied ✓")}).catch(function(){fallback(t)});else fallback(t)}
function fallback(t){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy");toast("Copied ✓")}catch(e){toast("Copy unavailable")}a.remove()}
document.getElementById("pw5-add-folder").addEventListener("click",function(){var e=document.getElementById("pw5-new-folder"),n=e.value.trim();if(!n){toast("Folder ka naam likho.");return}if(folders.some(function(x){return x.toLowerCase()===n.toLowerCase()})){toast("Ye folder already hai.");return}folders.push(n);if(write(FOLDERKEY,folders)){e.value="";setFolders();toast("Folder created ✓")}});
document.getElementById("pw5-save").addEventListener("click",function(){var t=document.getElementById("pw5-output").textContent;if(!t||t.indexOf("Your completed prompt")===0){toast("Pehle prompt generate karo.");return}var items=getItems(),now=Date.now(),folder=document.getElementById("pw5-save-folder").value;var found=items.find(function(x){return x.text===t});if(found){found.time=now;found.folder=folder||found.folder||"";items.splice(items.indexOf(found),1);items.unshift(found)}else items.unshift({id:"pw5-"+now+"-"+Math.random().toString(36).slice(2,7),text:t,time:now,fav:false,folder:folder});if(write(LIBKEY,items.slice(0,60))){toast("Saved to My Prompt Library ✓");var lib=document.getElementById("pw4-library");if(lib){var b=lib.querySelector('[data-tab="history"]');if(b)b.click()}}});
document.getElementById("pw5-export").addEventListener("click",function(){var data={app:"PromptWala",version:"5.0",exportedAt:new Date().toISOString(),prompts:getItems(),folders:folders};var blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="promptwala-backup-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);toast("Backup exported ✓")});
document.getElementById("pw5-import").addEventListener("click",function(){document.getElementById("pw5-file").click()});
document.getElementById("pw5-file").addEventListener("change",function(e){var file=e.target.files&&e.target.files[0];if(!file)return;var reader=new FileReader();reader.onload=function(){try{var d=JSON.parse(reader.result);if(!d||!Array.isArray(d.prompts)||!Array.isArray(d.folders))throw new Error("Invalid backup");if(!confirm("Import "+d.prompts.length+" prompts and "+d.folders.length+" folders? Existing prompt history will be replaced."))return;var clean=d.prompts.filter(function(x){return x&&typeof x.text==="string"}).slice(0,60);var fs=d.folders.filter(function(x){return typeof x==="string"&&x.trim()}).slice(0,100);if(!write(LIBKEY,clean)||!write(FOLDERKEY,fs))return;folders=fs;setFolders();toast("Backup restored ✓ Reload page to refresh library.")}catch(err){toast("Backup file valid nahi hai.")}finally{e.target.value=""}};reader.readAsText(file)});
variables();setFolders();
})();