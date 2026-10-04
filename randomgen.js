// PromptWala - Random Video Prompt Generator (self-contained)
// Add <script src="randomgen.js"></script> before </body> in index.html
(function () {
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };

  var G = {
    "Horror": {
      loc: ["an old haveli corridor", "an abandoned village well", "a foggy railway platform", "a ruined temple", "a dark bamboo forest", "an empty school classroom", "a deserted hospital corridor", "a silent riverside ghat"],
      time: ["at midnight", "at 3 AM", "at dusk with fading light", "on a moonlit night", "in thick pre-dawn fog"],
      sub: ["a flickering lantern", "a lone shadow", "a swinging cradle", "a woman in white far away", "a mirror with a late reflection", "a ringing old phone"],
      act: ["moves slowly on its own", "slowly turns toward the camera", "fades in and out of the dark", "creeps closer without a sound", "casts a long shadow across the wall"],
      mood: ["cold teal tones, eerie silence", "grainy dark look, deep shadows", "desaturated colours, low fog", "flickering candle light, tense mood"],
      extra: "Suspenseful and non-graphic."
    },
    "Comedy": {
      loc: ["a crowded Indian wedding", "a busy chai stall", "a narrow gali", "a local train compartment", "a village market", "a noisy office", "a colourful festival street"],
      time: ["on a bright sunny day", "in the afternoon rush", "at a lively evening", "early in the morning"],
      sub: ["a chai seller", "a talking parrot", "two clumsy friends", "a street dog", "a strict uncle", "a dancing grandma"],
      act: ["accidentally causes total chaos", "does a ridiculous slapstick fall", "freezes in a funny pose", "chases a runaway object", "reacts with exaggerated shock"],
      mood: ["bright colours, fast funny cuts", "handheld camera style, energetic feel", "cartoon-like exaggerated reactions", "warm light, upbeat feel"],
      extra: ""
    },
    "Romantic": {
      loc: ["a riverbank", "a rooftop with fairy lights", "a misty hill station road", "a mustard field", "a quiet temple courtyard", "a lake with floating lanterns", "a rainy street"],
      time: ["at golden hour sunset", "in light monsoon rain", "on a moonlit night", "in soft morning light"],
      sub: ["a couple sharing an umbrella", "two people sharing chai", "a girl reading a handwritten letter", "a boy offering a marigold", "a couple on a vintage bicycle"],
      act: ["walk slowly toward each other", "share a shy smile", "dance gently in slow motion", "look at each other in silence", "laugh together softly"],
      mood: ["warm cinematic grade, soft bokeh", "dreamy glow, shallow depth of field", "golden tones, gentle camera orbit", "soft pastel colours, slow motion"],
      extra: ""
    },
    "Sci-Fi": {
      loc: ["a red desert planet", "a neon cyberpunk Mumbai", "an underwater glass city", "an abandoned space station", "a floating temple above the clouds", "a futuristic village market", "an alien beach"],
      time: ["under two moons", "during a rainy neon night", "at a double sunset", "in the glow of emergency red lights"],
      sub: ["a lone astronaut", "a robot monk", "a glowing blue AI hologram", "a child with a small friendly robot", "a hover-bike rider", "a giant ancient machine"],
      act: ["slowly wakes up", "walks toward the camera", "scans the surroundings", "races at high speed", "opens a swirling time portal"],
      mood: ["epic wide shot, volumetric light", "neon and deep blue colour grade", "cinematic orange and teal", "serene golden light, slow dolly move"],
      extra: ""
    },
    "Action": {
      loc: ["city rooftops", "a mountain highway", "a bamboo forest", "a crowded market", "a desert road", "a misty jungle", "a bridge over a river"],
      time: ["at dusk", "at sunrise", "in heavy rain", "at golden hour", "on a stormy evening"],
      sub: ["a hero in a dark jacket", "a sports car", "two martial artists", "a parkour runner", "an original superhero", "a bike rider"],
      act: ["leaps across a gap in slow motion", "drifts around a sharp bend", "clashes in a fast stylised duel", "sprints through the chaos", "lands with a cracking impact"],
      mood: ["tracking camera, dust and sparks", "drone shot then close-up", "orange and teal cinematic grade", "low angle, wind and debris flying"],
      extra: "Stylised and non-graphic."
    },
    "Devotional": {
      loc: ["a Ganga ghat", "a glowing temple courtyard", "a Himalayan peak", "a lotus pond", "a village shrine", "a river at dawn"],
      time: ["during evening aarti", "at sunrise", "on a Diwali night", "in soft morning mist"],
      sub: ["hundreds of floating diyas", "a priest ringing a temple bell", "a lord's idol covered in flowers", "a devotee lighting a lamp", "marigold petals in the air"],
      act: ["glow and flicker peacefully", "float slowly across the water", "shower down in slow motion", "light up one by one"],
      mood: ["warm golden light, serene mood", "soft glow, gentle camera push-in", "rich saffron and gold colours", "calm and divine atmosphere"],
      extra: "Respectful and peaceful."
    }
  };

  var CAM = ["slow push-in", "smooth drone shot", "low angle tracking shot", "handheld follow cam", "slow orbiting camera", "wide shot then close-up", "slow pull-back reveal"];
  var DUR = ["5 seconds", "6 seconds", "8 seconds"];
  var RAT = ["16:9", "9:16"];

  function generate(genre) {
    var names = Object.keys(G);
    var g = (genre && G[genre]) ? genre : pick(names);
    var d = G[g];
    var text = "Cinematic video: " + d.sub[Math.floor(Math.random() * d.sub.length)] + " " +
      pick(d.act) + " in " + pick(d.loc) + " " + pick(d.time) + ", " +
      pick(CAM) + ", " + pick(d.mood) + ". " + (d.extra ? d.extra + " " : "") +
      pick(DUR) + ", " + pick(RAT) + ".";
    return { genre: g, text: text };
  }

  window.generateVideoPrompt = generate;

  function build() {
    var box = document.createElement("div");
    box.style.cssText = "max-width:560px;margin:24px auto;padding:16px;background:#111;border:1px solid #d4af37;border-radius:14px;color:#fff;font-family:sans-serif;";
    var opts = '<option value="">Random genre</option>';
    Object.keys(G).forEach(function (n) { opts += '<option value="' + n + '">' + n + '</option>'; });
    box.innerHTML =
      '<div style="font-weight:700;color:#d4af37;margin-bottom:10px;">Random Video Prompt Generator</div>' +
      '<select id="pwGenre" style="width:100%;padding:10px;border-radius:8px;border:1px solid #d4af37;background:#000;color:#fff;margin-bottom:10px;">' + opts + '</select>' +
      '<button id="pwGen" style="width:100%;padding:12px;border:0;border-radius:8px;background:#d4af37;color:#000;font-weight:700;margin-bottom:10px;">Generate</button>' +
      '<div id="pwOut" style="min-height:70px;padding:10px;background:#000;border-radius:8px;line-height:1.5;font-size:14px;">Button dabao, naya prompt aayega.</div>' +
      '<button id="pwCopy" style="width:100%;padding:10px;margin-top:10px;border:1px solid #d4af37;border-radius:8px;background:transparent;color:#d4af37;font-weight:600;">Copy</button>';
    document.body.appendChild(box);

    var out = box.querySelector("#pwOut");
    var sel = box.querySelector("#pwGenre");
    box.querySelector("#pwGen").onclick = function () {
      var r = generate(sel.value);
      out.textContent = "[" + r.genre + "] " + r.text;
      out.dataset.t = r.text;
    };
    box.querySelector("#pwCopy").onclick = function (e) {
      var t = out.dataset.t || "";
      if (!t) return;
      var b = e.target;
      var done = function () { b.textContent = "Copied!"; setTimeout(function () { b.textContent = "Copy"; }, 1200); };
      if (navigator.clipboard) { navigator.clipboard.writeText(t).then(done); }
      else { var ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); done(); }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
