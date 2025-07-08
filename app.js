/* 要素 ------------------------------------------------------ */
const hitsEl  = document.getElementById('hits');
const spinsEl = document.getElementById('spins');
const pushBtn = document.getElementById('push');
const lamp    = document.getElementById('lamp');
const hitSE   = document.getElementById('snd-hit');

/* 状態 ------------------------------------------------------ */
let hits  = +localStorage.getItem('hits')  || 0;
let spins = +localStorage.getItem('spins') || 0;
render();

/* メインロジック（唯一の click ハンドラ） ------------------ */
pushBtn.addEventListener('click', () => {

  /* 1️⃣ 点灯中なら“消灯するだけ”でリターン */
  if (lamp.classList.contains('on')){
    lamp.classList.remove('on');
    lamp.classList.add('off');
    return;
  }

  /* 2️⃣ 消灯中なら 1 回転扱い */
  spins++;

  /* 3️⃣ 1/128 でペカ */
  if (Math.random() < 1/12){
    hits++;
    lamp.classList.remove('off');
    lamp.classList.add('on');          // ← replace を使わず安全に
    hitSE.currentTime = 0;
    hitSE.play().catch(()=>{});
    if (navigator.vibrate) navigator.vibrate(70);
  }

  persist();
  render();
});

/* 保存 & 表示 ---------------------------------------------- */
function persist(){
  localStorage.setItem('hits', hits);
  localStorage.setItem('spins', spins);
}
function render(){
  hitsEl.textContent  = hits;
  spinsEl.textContent = spins;
}
