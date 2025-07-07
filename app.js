/* 要素取得 --------------------------------------------------- */
const hitsEl   = document.getElementById('hits');
const spinsEl  = document.getElementById('spins');
const pushBtn  = document.getElementById('push');
const resetBtn = document.getElementById('reset');
const lamp     = document.getElementById('lamp');
const hitSound = document.getElementById('snd-hit');

/* 変数（localStorage から復帰） ----------------------------- */
let hits  = +localStorage.getItem('hits')  || 0;
let spins = +localStorage.getItem('spins') || 0;
render();

/* メインボタン ---------------------------------------------- */
pushBtn.addEventListener('click', () => {
  spins++;
  if (Math.random() < 1/128){      // 1/128 でペカ
    hits++;
    flashLamp();
  }
  persist(); render();
});

/* リセット -------------------------------------------------- */
resetBtn.addEventListener('click', () => {
  if (!confirm('全部 0 にしますか？')) return;
  hits = spins = 0;
  persist(); render();
});

/* ランプを光らせて音＆振動 ---------------------------------- */
function flashLamp(){
  lamp.classList.add('flash');
  hitSound.currentTime = 0;
  hitSound.play().catch(()=>{});
  if (navigator.vibrate) navigator.vibrate(70);
  setTimeout(()=>lamp.classList.remove('flash'), 600);
}

/* 保存＆表示 ------------------------------------------------ */
function persist(){
  localStorage.setItem('hits', hits);
  localStorage.setItem('spins', spins);
}
function render(){
  hitsEl.textContent  = hits;
  spinsEl.textContent = spins;
}
