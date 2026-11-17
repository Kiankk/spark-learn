(function(){
"use strict";
const $ = s => document.querySelector(s);
window.COURSES = window.COURSES || []; window.TIPS = window.TIPS || [];
window.IMG = window.IMG || {c:{}, t:{}};
const CATS = {
  money:{name:"Money", color:"#58cc02", ic:"coin", desc:"Earn, save, invest, protect"},
  mind:{name:"Self-Growth", color:"#a560ff", ic:"bulb", desc:"Habits, focus, mindset"},
  people:{name:"People Skills", color:"#ff9600", ic:"users", desc:"Talk, listen, win friends"},
  health:{name:"Health", color:"#ff4b4b", ic:"pulse", desc:"Sleep, food, movement"}
};
const LS = "spark-v1";
let S; try { S = JSON.parse(localStorage.getItem(LS)) || {}; } catch(e){ S = {}; }
["read","saved","done","days","seen","xpDay","badges"].forEach(k => S[k] = S[k] || {});
["quizzes","correct","answered","xp","best"].forEach(k => S[k] = S[k] || 0);
const save = () => { try { localStorage.setItem(LS, JSON.stringify(S)); } catch(e){} };
const dkey = d => { d = d || new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
function streak(){ let n=0, d=new Date(); if (!S.days[dkey(d)]) d.setDate(d.getDate()-1); while (S.days[dkey(d)]) { n++; d.setDate(d.getDate()-1); } return n; }
function mark(){ const k = dkey(); if (!S.days[k]){ S.days[k] = 1; const n = streak(); if (n > S.best) S.best = n; save(); setTimeout(() => toast(n+" day streak!", true), 400); } }
const esc = s => String(s==null?"":s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const hash = s => { let h = 2166136261; s = String(s); for (let i=0;i<s.length;i++){ h = Math.imul(h ^ s.charCodeAt(i), 16777619); } return h >>> 0; };
const key = (cid,i) => cid+":"+i;
const byId = id => COURSES.find(c => c.id === id);
const isCardKey = k => k[0] !== "t" && k[0] !== "q";

// ───── icons ─────
const IC = {
  reels:'<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M10 8l6 4-6 4z"/>',
  learn:'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
  bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  mark:'<path d="M6 3h12v18l-6-4-6 4z"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  share:'<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/>',
  flame:'<path d="M12 2c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2-1-3 0-5 1-8z"/>',
  check:'<path d="M5 13l4 4L19 7"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  coin:'<circle cx="12" cy="12" r="9"/><path d="M12 6v12M15 9c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.3 0-2.4-.5-3-1.5"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c3 0 5 2 5 5"/>',
  pulse:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/><path d="M6 12h3l1.5-3 2 6 1.5-3h3"/>',
  trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/>',
  gift:'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-3-5 0 .5 1 3 1 5 0zM12 8c2-4 6-3 5 0-.5 1-3 1-5 0z"/>',
  book:'<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'
};
const icon = (n, cls) => `<svg class="i ${cls||""}" viewBox="0 0 24 24">${IC[n]||""}</svg>`;

// ───── photos ─────
function photoUrl(it){
  const IMG = window.IMG || {c:{}, t:{}};
  const arr = it.c ? IMG.c[it.c.id] : IMG.t[it.cat];
  if (!arr || !arr.length) return null;
  return arr[hash(it.k+"p") % arr.length];
}
const gradFor = cat => { const c = (CATS[cat]||{}).color || "#444"; return `linear-gradient(160deg, ${c}, #0b1418 120%)`; };
function imgTag(url){ return url ? `<img src="${esc(url)}" alt="" referrerpolicy="no-referrer" decoding="async" onload="this.classList.add('ld')" onerror="this.remove()">` : ""; }
function preload(it){ const u = photoUrl(it); if (u){ const im = new Image(); im.referrerPolicy = "no-referrer"; im.src = u; } }

// ───── xp / hud / feedback ─────
const level = () => Math.floor(S.xp/100) + 1;
const goal = 50, todayXP = () => S.xpDay[dkey()] || 0;
function addXP(n){
  S.xp += n; S.xpDay[dkey()] = todayXP() + n; mark(); save(); floatXP(n); refreshHud(); checkBadges();
  if (todayXP() >= goal && todayXP() - n < goal) setTimeout(() => toast("Daily goal reached!", false, "target"), 500);
}
function floatXP(n){ const el = document.createElement("div"); el.className = "xpf"; el.textContent = "+"+n+" XP"; document.body.appendChild(el); setTimeout(() => el.remove(), 1100); }
function ringSvg(p){ const r = 10, c = 2*Math.PI*r; return `<svg class="ringsvg" viewBox="0 0 26 26"><circle cx="13" cy="13" r="${r}" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="4"/><circle cx="13" cy="13" r="${r}" fill="none" stroke="#ffc800" stroke-width="4" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-Math.min(1,p))}"/></svg>`; }
function hud(){ return `<div class="hud"><span class="hs fl">${icon("flame")}${streak()}</span><span class="hs xp">${icon("bolt")}${S.xp}</span>${ringSvg(todayXP()/goal)}</div>`; }
function refreshHud(){ document.querySelectorAll(".hud").forEach(h => h.outerHTML = hud()); }
function toast(msg, flame, ic){ const t = document.createElement("div"); t.className = "toast"; t.innerHTML = icon(ic || (flame?"flame":"star")) + esc(msg); $("#pop").appendChild(t); setTimeout(() => t.remove(), 2700); }
const BADGES = [
  ["First lesson","book",()=>Object.keys(S.done).length>=1],["3 day streak","flame",()=>S.best>=3],["7 day streak","flame",()=>S.best>=7],
  ["500 XP","bolt",()=>S.xp>=500],["100 lessons read","reels",()=>Object.keys(S.read).filter(isCardKey).length>=100],["5 quizzes","target",()=>S.quizzes>=5],
  ["10 courses","trophy",()=>Object.keys(S.done).length>=10],["1000 XP","star",()=>S.xp>=1000],["30 day streak","trophy",()=>S.best>=30]
];
function checkBadges(){ BADGES.forEach(([n,,f]) => { if (!S.badges[n] && f()){ S.badges[n] = 1; save(); setTimeout(() => toast("Badge: "+n, false, "trophy"), 900); } }); }
let AC; function beep(a,b,d){ if (S.mute) return; try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)(); const o=AC.createOscillator(), g=AC.createGain(), t=AC.currentTime; o.connect(g); g.connect(AC.destination);
  o.frequency.setValueAtTime(a,t); o.frequency.setValueAtTime(b,t+d/2); g.gain.setValueAtTime(.07,t); g.gain.exponentialRampToValueAtTime(.001,t+d); o.start(); o.stop(t+d); }catch(e){} }
const sfx = {ok:()=>beep(660,990,.22), bad:()=>beep(240,150,.3), win:()=>{beep(523,784,.18); setTimeout(()=>beep(659,1046,.3),200);}};
function buzz(n){ try{ navigator.vibrate && navigator.vibrate(n); }catch(e){} }

// ───── shell ─────
const app = $("#app"), tabsEl = $("#tabs"), pop = $("#pop");
let tab = "reels";
const TABS = [["reels","reels"],["learn","learn"],["practice","bolt"],["saved","mark"],["me","user"]];
tabsEl.innerHTML = TABS.map(([t,i]) => `<button data-tab="${t}" aria-label="${t}">${icon(i)}</button>`).join("");
tabsEl.querySelectorAll("button").forEach(b => b.onclick = () => { tab = b.dataset.tab; render(); });
function render(){
  tabsEl.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
  tabsEl.className = tab === "reels" ? "clear" : "";
  app.className = tab === "reels" ? "reelmode" : "pad"; app.scrollTop = 0;
  ({reels:vReels, learn:vLearn, practice:vPractice, saved:vSaved, me:vMe})[tab]();
}
function toggleSave(k){
  if (S.saved[k]) delete S.saved[k]; else S.saved[k] = 1; save();
  document.querySelectorAll(`[data-heart="${k}"]`).forEach(b => b.classList.toggle("on", !!S.saved[k]));
}
function share(it){
  const txt = it.cd.h + " — " + it.cd.t;
  if (navigator.share) navigator.share({title:it.cd.h, text:txt}).catch(()=>{});
  else { try { navigator.clipboard.writeText(txt); toast("Copied to clipboard"); } catch(e){} }
}

// ───── REELS ─────
function makeFeed(filter){
  const cards = []; COURSES.forEach(c => c.cards.forEach((cd,i) => cards.push({type:"card", k:key(c.id,i), cat:c.cat, cd, c})));
  const tips = TIPS.map((cd,i) => ({type:"card", k:"t:"+i, cat:cd.cat, cd, tip:1}));
  const qs = []; COURSES.forEach(c => c.quiz.forEach((q,i) => qs.push({type:"quiz", k:"q:"+c.id+":"+i, cat:c.cat, q, c})));
  const cats = shuffle(Object.keys(CATS).filter(c => filter==="all" || c===filter)), P = {};
  cats.forEach(c => { const cs = cards.filter(x => x.cat===c);
    P[c] = {cards: shuffle(cs.filter(x=>!S.read[x.k])).concat(shuffle(cs.filter(x=>S.read[x.k]))), tips: shuffle(tips.filter(x=>x.cat===c)), qs: shuffle(qs.filter(x=>x.cat===c))}; });
  let n = 0, ci = 0;
  const take = a => { if (!a.length) return null; const x = a.shift(); a.push(x); return x; };
  return () => { n++; const p = P[cats[ci++ % cats.length]];
    return (n % 5 === 0 && take(p.qs)) || (n % 3 === 0 && take(p.tips)) || take(p.cards) || take(p.tips); };
}
function reelHTML(it, first){
  const cat = CATS[it.cat] || CATS.money, url = photoUrl(it), bg = `<div class="bg" style="background:${gradFor(it.cat)}">${imgTag(url)}</div><div class="shade"></div>`;
  if (it.type === "quiz"){
    return `<section class="reel quiz" data-k="${it.k}" data-cat="${it.cat}">${bg}<div class="rcopy"><span class="qb">Quick quiz</span><h2>${esc(it.q.q)}</h2>` +
      it.q.o.map((o,j) => `<button class="qopt" data-j="${j}">${esc(o)}</button>`).join("") + `<div class="fb"></div></div></section>`;
  }
  const cd = it.cd, tag = it.tip ? "Quick tip" : it.c.title;
  return `<section class="reel" data-k="${it.k}" data-cat="${it.cat}">${bg}
   <div class="rcopy"><div class="rtag" style="color:#fff">${icon(cat.ic)}<span>${esc(cat.name)} · ${esc(tag)}</span></div>
   ${cd.stat ? `<div class="bigstat">${esc(cd.stat.n)}</div><div class="statl">${esc(cd.stat.l)}</div>` : ""}
   <h2>${esc(cd.h)}</h2><p>${esc(cd.t)}</p>
   ${cd.list && cd.list.length ? `<ul class="rlist">${cd.list.map((x,i)=>`<li><b>${i+1}</b>${esc(x)}</li>`).join("")}</ul>` : ""}
   ${it.c ? `<button class="cta" data-learn="${it.c.id}">${icon("learn")} Learn this</button>` : ""}</div>
   <div class="rail"><button class="hb ${S.saved[it.k]?"on":""}" data-heart="${it.k}">${icon("heart")}Like</button><button class="sh" data-share="${it.k}">${icon("share")}Share</button></div>
   ${first ? `<div class="hint">Swipe up</div>` : ""}</section>`;
}
const itemMap = {};   // k -> item, for share
function vReels(filter){
  filter = typeof filter === "string" ? filter : "all";
  const tabsH = [["all","For you"]].concat(Object.entries(CATS).map(([k,v]) => [k, v.name.split(" ")[0]])).map(([k,n]) => `<button data-f="${k}" class="${k===filter?"on":""}">${n}</button>`).join("");
  app.innerHTML = `<div class="rtop"><div class="rtabs">${tabsH}</div>${hud()}</div><div id="reels"></div>`;
  app.querySelectorAll(".rtabs button").forEach(b => b.onclick = () => vReels(b.dataset.f));
  mountReels($("#reels"), {next: makeFeed(filter), count: 5});
}
function mountReels(box, o){
  const items = [];
  function add(n){ for (let i=0;i<n;i++){ const it = o.items ? o.items[items.length] : o.next(); if (!it) return; items.push(it); itemMap[it.k] = it; box.insertAdjacentHTML("beforeend", reelHTML(it, items.length===1 && !o.items)); io.observe(box.lastElementChild); } }
  const io = new IntersectionObserver(es => es.forEach(e => {
    const el = e.target; if (e.isIntersecting && e.intersectionRatio >= .6){
      box.querySelectorAll(".reel.active").forEach(x => x.classList.remove("active")); el.classList.add("active");
      const idx = [...box.children].indexOf(el), k = el.dataset.k, hint = box.querySelector(".hint"); if (idx > 0 && hint) hint.remove();
      if (!o.items && idx >= box.children.length - 3) add(4);
      for (let j=1;j<=2;j++){ const nx = items[idx+j]; if (nx) preload(nx); }
      if (k[0] !== "q" && !S.read[k]){ S.read[k] = 1; addXP(1); }
    } }), {root: box, threshold: [.6]});
  box._add = add; add(o.items ? Math.min(o.items.length, 6) : o.count);
  if (o.items) { const loadMore = () => { if (box.children.length < o.items.length && box.scrollTop + box.clientHeight*3 > box.scrollHeight) add(4); }; box.addEventListener("scroll", loadMore, {passive:true}); }
  if (o.start){ add(Math.max(0, o.start - box.children.length + 2)); const t = box.children[o.start]; if (t) t.scrollIntoView(); }
  let lastTap = 0;
  box.addEventListener("click", e => {
    const q = e.target.closest(".qopt"); if (q){ answerReel(q); return; }
    const h = e.target.closest(".hb"); if (h){ toggleSave(h.dataset.heart); return; }
    const s = e.target.closest(".sh"); if (s){ const it = itemMap[s.dataset.share]; it && share(it); return; }
    const l = e.target.closest(".cta"); if (l){ openSheet(l.dataset.learn); return; }
    const r = e.target.closest(".reel"); if (!r || r.classList.contains("quiz")) return;
    const now = Date.now(); if (now - lastTap < 320){ if (!S.saved[r.dataset.k]) toggleSave(r.dataset.k); buzz(15);
      r.insertAdjacentHTML("beforeend", `<div class="burst"><svg viewBox="0 0 24 24">${IC.heart}</svg></div>`); setTimeout(() => { const b = r.querySelector(".burst"); b && b.remove(); }, 800); } lastTap = now;
  });
}
function answerReel(btn){
  const r = btn.closest(".reel"); if (r.dataset.done) return; r.dataset.done = 1;
  const it = itemMap[r.dataset.k], j = +btn.dataset.j, ok = j === it.q.a;
  S.answered++; if (ok){ S.correct++; addXP(10); sfx.ok(); buzz(20); } else { sfx.bad(); buzz([30,40,30]); } save();
  r.querySelectorAll(".qopt").forEach((o,k) => { if (k===it.q.a) o.classList.add("ok"); else if (k===j) o.classList.add("bad"); });
  r.querySelector(".fb").textContent = (ok ? "Correct! " : "Not quite. ") + it.q.w + "  ↑ swipe for more";
}

// ───── LEARN PATH ─────
function courseNode(c, i, next){
  const n = c.cards.length, r = c.cards.filter((_,x)=>S.read[key(c.id,x)]).length, done = !!S.done[c.id], col = (CATS[c.cat]||{}).color;
  const off = [0,44,62,44,0,-44,-62,-44][i%8], u = photoUrl({c, cat:c.cat, k:c.id+":0"}), R = 39, C = 2*Math.PI*R;
  const p = done ? 1 : r/n;
  return `<div class="nw" style="--off:${off}px">${next ? `<div class="startb">START</div>` : ""}
   <button class="node" data-id="${c.id}"><svg class="pr" viewBox="0 0 84 84"><circle cx="42" cy="42" r="${R}" fill="none" stroke="#37464f" stroke-width="5"/><circle cx="42" cy="42" r="${R}" fill="none" stroke="${done?"#58cc02":col}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-p)}"/></svg>
   ${u ? imgTag(u) : `<div class="ph" style="background:${gradFor(c.cat)}"></div>`}${done ? `<span class="chk">${icon("check")}</span>` : ""}</button><div class="nt">${esc(c.title)}</div></div>`;
}
function vLearn(){
  const ents = Object.entries(CATS);
  app.innerHTML = `<div class="top2"><h1>Learn</h1>${hud()}</div><div class="jump">${ents.map(([k,v])=>`<button class="jchip" data-j="${k}" style="color:${v.color}">${icon(v.ic)}${esc(v.name)}</button>`).join("")}</div>` +
    ents.map(([k,v],si) => { const cs = COURSES.filter(c => c.cat===k), nx = cs.findIndex(c => !S.done[c.id]), dn = cs.filter(c=>S.done[c.id]).length;
      return `<div id="sec-${k}"><div class="sbanner" style="background:${v.color};color:#fff"><div>Section ${si+1}<small>${esc(v.name)} · ${esc(v.desc)} · ${dn}/${cs.length}</small></div>${icon(v.ic)}</div><div class="path">${cs.map((c,i)=>courseNode(c,i,i===nx)).join("")}</div></div>`; }).join("");
  app.querySelectorAll(".node").forEach(b => b.onclick = () => openSheet(b.dataset.id));
  app.querySelectorAll(".jchip").forEach(b => b.onclick = () => { const el = $("#sec-"+b.dataset.j); app.scrollTo({top: el.offsetTop - 70, behavior:"smooth"}); });
  const st = app.querySelector(".startb"); if (st){ const nw = st.closest(".nw"); setTimeout(() => app.scrollTo({top: nw.offsetTop - 220}), 50); }
}
function closePop(){ pop.innerHTML = ""; }
function openSheet(id){
  const c = byId(id); if (!c) return; const u = photoUrl({c, cat:c.cat, k:id+":1"}), done = S.done[id];
  pop.innerHTML = `<div class="scrim"></div><div class="sheet"><div class="sph" style="background-image:${u?`url('${esc(u)}')`:gradFor(c.cat)}"></div><div class="sb">
    <h3>${esc(c.title)}</h3><p>${esc(c.sub)}</p><span class="pill">${c.cards.length} lessons</span><span class="pill">${c.quiz.length} questions</span><span class="pill">+${c.cards.length*3+c.quiz.length*10+20} XP</span>
    <button class="btn" id="go">${done?"Practice again":"Start"}</button></div></div>`;
  $(".scrim").onclick = closePop; $("#go").onclick = () => { closePop(); startLesson(c); };
}

// ───── LESSON ENGINE (Duolingo style) ─────
function startLesson(c){
  const steps = [];
  for (let i=0;i<c.cards.length;i++){ steps.push({t:"card", cd:c.cards[i], k:key(c.id,i), cat:c.cat, c}); if (i%2===1 && c.quiz[(i-1)/2|0]) steps.push({t:"q", q:c.quiz[(i-1)/2|0], cat:c.cat, c, k:"q:"+c.id+":"+((i-1)/2|0)}); }
  runEngine({steps, title:c.title, course:c, hearts:3});
}
function runEngine(o){
  const R = document.querySelector("#reader"); R.hidden = false; const $ = x => R.querySelector(x);
  const queue = o.steps.slice(), total = queue.length; let done = 0, hearts = o.hearts, earned = 0, right = 0, wrong = 0, sel = -1, combo = 0;
  const gain = n => { earned += n; addXP(n); };
  function head(){ return `<div class="lh"><button id="lx">${icon("x")}</button><div class="lbar"><i style="width:${Math.round(done/total*100)}%"></i></div><div class="hearts">${icon("heart")}${hearts}</div></div>`; }
  function draw(){
    if (!queue.length) return finish();
    const s = queue[0]; sel = -1;
    if (s.t === "card"){
      const cd = s.cd, u = photoUrl({c:s.c, cat:s.cat, k:s.k});
      R.innerHTML = head() + `<div class="lbody">${u?`<div class="lphoto" style="background:${gradFor(s.cat)}">${imgTag(u)}</div>`:""}
        ${cd.stat?`<div class="bigstat">${esc(cd.stat.n)}</div><div class="statl">${esc(cd.stat.l)}</div>`:""}<h2>${esc(cd.h)}</h2><p>${esc(cd.t)}</p>
        ${cd.list&&cd.list.length?`<ul class="llist">${cd.list.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}</div><div class="lfoot"><button class="btn" id="go">Continue</button></div>`;
      $("#go").onclick = () => { if (s.k && !S.read[s.k]){ S.read[s.k] = 1; gain(3); } queue.shift(); done++; draw(); };
    } else {
      const u = s.c ? photoUrl({c:s.c, cat:s.cat, k:s.k}) : null;
      R.innerHTML = head() + `<div class="lbody"><div class="lq">${combo>=2?combo+" in a row!":"Choose the answer"}</div><h2>${esc(s.q.q)}</h2>` +
        s.q.o.map((x,j) => `<button class="lo" data-j="${j}">${esc(x)}</button>`).join("") + `</div><div class="lfoot"><button class="btn" id="go" disabled>Check</button></div>`;
      R.querySelectorAll(".lo").forEach(b => b.onclick = () => { if ($(".lfoot.ok,.lfoot.bad")) return; sel = +b.dataset.j; R.querySelectorAll(".lo").forEach(x => x.classList.toggle("sel", x===b)); $("#go").disabled = false; });
      $("#go").onclick = () => check(s);
    }
    $("#lx").onclick = () => { if (confirm("Quit this lesson? Progress in this session is lost.")) leave(); };
  }
  function check(s){
    const ok = sel === s.q.a, ft = $(".lfoot");
    R.querySelectorAll(".lo").forEach((x,k) => { x.classList.remove("sel"); if (k===s.q.a) x.classList.add("ok"); else if (k===sel) x.classList.add("bad"); });
    S.answered++; if (ok){ S.correct++; right++; combo++; gain(10); sfx.ok(); } else { wrong++; combo = 0; hearts--; sfx.bad(); buzz([30,40,30]); queue.push(Object.assign({}, s)); } save();
    ft.className = "lfoot " + (ok?"ok":"bad");
    ft.innerHTML = `<div class="fbh">${ok?"Nice! Correct":"Not quite"}</div><div class="fbt">${esc(s.q.w)}</div><button class="btn ${ok?"":"red"}" id="go">Continue</button>`;
    $(".hearts").innerHTML = icon("heart") + hearts;
    $("#go").onclick = () => { queue.shift(); if (ok) done++; if (hearts <= 0) return failed(); draw(); };
  }
  function failed(){
    R.innerHTML = `<div class="end"><div class="endic" style="background:var(--red);color:#fff">${icon("heart")}</div><h2>Out of hearts</h2><p style="color:var(--mut)">Mistakes are how you learn. Give it another go.</p><div style="width:100%;max-width:340px"><button class="btn" id="re">Try again</button><button class="btn ghost" id="lv">Leave</button></div></div>`;
    $("#re").onclick = () => { R.innerHTML = ""; runEngine(o); }; $("#lv").onclick = leave;
  }
  function finish(){
    const first = o.course && !S.done[o.course.id]; gain(first ? 20 : 5); if (o.course){ S.done[o.course.id] = 1; } else { S.quizzes++; } save(); sfx.win(); checkBadges();
    const acc = right + wrong ? Math.round(right/(right+wrong)*100) : 100;
    const cols = ["#58cc02","#1cb0f6","#ffc800","#ff4b4b","#a560ff","#ff9600"];
    R.innerHTML = `<div class="end">${Array.from({length:38},(_,i)=>`<i class="conf" style="left:${Math.random()*100}%;background:${cols[i%6]};animation-delay:${Math.random()*.8}s"></i>`).join("")}
      <div class="endic">${icon("trophy")}</div><h2>${o.course?"Lesson complete!":"Practice complete!"}</h2><div style="color:var(--mut);font-weight:700">${esc(o.title)}</div>
      <div class="est"><div><b style="color:var(--gold)">+${earned}</b><span>XP</span></div><div><b style="color:var(--green)">${acc}%</b><span>Accuracy</span></div><div><b style="color:var(--orange)">${streak()}</b><span>Streak</span></div></div>
      <div style="width:100%;max-width:340px"><button class="btn" id="fin">Continue</button></div></div>`;
    $("#fin").onclick = leave;
  }
  function leave(){ R.hidden = true; R.innerHTML = ""; render(); }
  draw();
}

// ───── PRACTICE ─────
function vPractice(){
  const total = COURSES.reduce((a,c)=>a+c.quiz.length,0);
  app.innerHTML = `<div class="top2"><h1>Practice</h1>${hud()}</div><div class="practice"><div class="giftic" style="background:var(--blue);color:#fff">${icon("bolt")}</div><h2>Daily practice</h2>
   <p>10 quick questions pulled from everything you've been learning. Earn XP and keep your streak alive.<br>${total} questions in the pool.</p><button class="btn" id="go">Start practice</button>
   <div style="height:12px"></div><button class="btn blue" id="mx">Mixed review: finished courses</button></div>`;
  $("#go").onclick = () => startPractice(false);
  $("#mx").onclick = () => startPractice(true);
}
function startPractice(doneOnly){
  const pool = []; COURSES.forEach(c => { if (doneOnly && !S.done[c.id]) return; c.quiz.forEach((q,i) => pool.push({t:"q", q, cat:c.cat, c, k:"q:"+c.id+":"+i})); });
  if (!pool.length){ toast("Finish a course first", false, "book"); return; }
  runEngine({steps:shuffle(pool).slice(0,10), title:"Daily practice", hearts:5});
}

// ───── SAVED ─────
function savedItems(){
  const out = [];
  Object.keys(S.saved).forEach(k => { if (k[0]==="t"){ const cd = TIPS[+k.slice(2)]; if (cd) out.push({type:"card",k,cat:cd.cat,cd,tip:1}); }
    else { const [cid,i] = k.split(":"), c = byId(cid); if (c && c.cards[+i]) out.push({type:"card",k,cat:c.cat,cd:c.cards[+i],c}); } });
  return out;
}
function vSaved(){
  const items = savedItems();
  app.innerHTML = `<div class="top2"><h1>Saved</h1>${hud()}</div>` + (items.length
    ? `<div class="grid2">${items.map((it,n) => `<button class="pt" data-n="${n}" style="background:${gradFor(it.cat)}">${imgTag(photoUrl(it))}<b>${esc(it.cd.h)}</b></button>`).join("")}</div>`
    : `<div class="empty">Double-tap any reel or tap the heart to save it here.</div>`);
  app.querySelectorAll(".pt").forEach(b => b.onclick = () => openSaved(items, +b.dataset.n));
}
function openSaved(items, start){
  const R = $("#reader"); R.hidden = false; R.style.padding = "0";
  R.innerHTML = `<div class="rtop" style="justify-content:flex-end"><button id="cx" style="color:#fff">${icon("x")}</button></div><div id="sreels" style="flex:1;overflow-y:scroll;scroll-snap-type:y mandatory"></div>`;
  R.style.background = "#000"; mountReels($("#sreels"), {items, start});
  $("#cx").onclick = () => { R.hidden = true; R.innerHTML = ""; R.style.padding = ""; R.style.background = ""; render(); };
}

// ───── PROFILE ─────
function vMe(){
  const read = Object.keys(S.read).filter(isCardKey).length, total = COURSES.reduce((a,c)=>a+c.cards.length,0);
  const acc = S.answered ? Math.round(S.correct/S.answered*100)+"%" : "–";
  let wk = ""; const d = new Date(); d.setDate(d.getDate()-6);
  for (let n=0;n<7;n++){ wk += `<i class="${S.days[dkey(d)]?"on":""}">${"SMTWTFS"[d.getDay()]}</i>`; d.setDate(d.getDate()+1); }
  const st = (ic,col,v,l) => `<div class="stc"><span style="color:${col}">${icon(ic)}</span><div><b>${v}</b><span>${l}</span></div></div>`;
  app.innerHTML = `<div class="top2"><h1>Profile</h1>${hud()}</div><div class="prof"><div class="pav">${icon("user")}</div><div class="lvl">Level ${level()}</div>
   <div class="lvbar"><i style="width:${S.xp%100}%"></i></div><div style="color:var(--mut);font-size:12.5px;margin-top:6px;font-weight:700">${S.xp%100}/100 XP to level ${level()+1}</div></div>
   <div class="stg">${st("flame","var(--orange)",streak(),"Day streak")}${st("bolt","var(--gold)",S.xp,"Total XP")}${st("book","var(--green)",Object.keys(S.done).length+"/"+COURSES.length,"Courses done")}${st("target","var(--blue)",acc,"Quiz accuracy")}</div>
   <div class="sec">This week</div><div class="week">${wk}</div>
   <div class="sec">Badges</div><div class="badges">${BADGES.map(([n,ic]) => `<div class="bd ${S.badges[n]?"on":""}"><div class="bc">${icon(ic)}</div>${n}</div>`).join("")}</div>
   <div style="text-align:center;color:var(--mut);font-size:12.5px;padding:0 20px">${read} of ${total} lessons seen · ${TIPS.length} tips · ${Object.values(IMG.c).reduce((a,x)=>a+x.length,0)+Object.values(IMG.t).reduce((a,x)=>a+x.length,0)} pictures</div>
   <button class="link" id="mu">Sound: ${S.mute?"off":"on"}</button><button class="link" id="rst">Reset progress</button>`;
  $("#mu").onclick = () => { S.mute = !S.mute; save(); vMe(); };
  $("#rst").onclick = () => { if (confirm("Erase all progress?")) { S = {read:{},saved:{},done:{},days:{},seen:{},xpDay:{},badges:{},quizzes:0,correct:0,answered:0,xp:0,best:0}; save(); vMe(); } };
}

// ───── daily reward ─────
function dailyReward(){
  if (S.reward === dkey()) return;
  pop.innerHTML = `<div class="scrim"></div><div class="modal"><div class="giftic">${icon("gift")}</div><h3>Daily bonus</h3><p>Open today's surprise and keep your streak going.</p><button class="btn" id="cl">Open</button></div>`;
  $("#cl").onclick = () => { const n = 10 + Math.floor(Math.random()*5)*5; S.reward = dkey(); save(); closePop(); sfx.win(); addXP(n); };
}

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
render(); setTimeout(dailyReward, 900);
})();
