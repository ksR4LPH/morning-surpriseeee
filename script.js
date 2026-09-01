const phrases = [
  'ты сможешь','давай','я в тебя верю',
  'ты справишься','у тебя получится','верю в тебя',
  'ты сможешь','давай','я в тебя верю',
  'ты справишься','у тебя получится','верю в тебя'
];
const sky = document.getElementById('sky');
phrases.forEach((text,i)=>{
  const span = document.createElement('span');
  span.textContent = text;
  const left = Math.random()*85;
  const size = (1.5 + Math.random()*1.4).toFixed(2);
  const driftDuration = 14 + Math.random()*10;
  const blinkDuration = 1.4 + Math.random()*1.4;
  const delay = Math.random()*-driftDuration;
  const dx = (Math.random()*160-80).toFixed(0)+'px';
  const rot = (Math.random()*16-8).toFixed(1)+'deg';
  span.style.left = left+'vw';
  span.style.fontSize = size+'rem';
  span.style.setProperty('--dx', dx);
  span.style.setProperty('--rot', rot);
  span.style.animationDuration = `${driftDuration}s, ${blinkDuration}s`;
  span.style.animationDelay = `${delay}s, ${Math.random()*-blinkDuration}s`;
  sky.appendChild(span);
});

const petalIcons = ['🌸','💗','✨','🌷','💫'];
const petals = document.getElementById('petals');
for(let i=0;i<18;i++){
  const el = document.createElement('i');
  el.textContent = petalIcons[i % petalIcons.length];
  el.style.left = (Math.random()*98)+'vw';
  el.style.fontSize = (0.9 + Math.random()*1.2).toFixed(2)+'rem';
  const duration = 10 + Math.random()*10;
  el.style.animationDuration = duration+'s';
  el.style.animationDelay = (Math.random()*-duration)+'s';
  el.style.setProperty('--sway',(Math.random()*80-40).toFixed(0)+'px');
  petals.appendChild(el);
}

const screenHero = document.getElementById('screen-hero');
const screenQuiz = document.getElementById('screen-quiz');
const screenLetter = document.getElementById('screen-letter');
const startBtn = document.getElementById('startBtn');

function goTo(screen){
  [screenHero, screenQuiz, screenLetter].forEach(s=>{
    if(s === screen){ s.hidden = false; s.style.animation='none'; void s.offsetWidth; s.style.animation=''; }
    else s.hidden = true;
  });
}

startBtn.addEventListener('click', ()=>{
  goTo(screenQuiz);
  showQuestion(0);
});

const questions = [
  { q:'2 + 2 = ?', a:4, opts:[3,4,5,6] },
  { q:'5 × 5 = ?', a:25, opts:[20,25,30,15] },
  { q:'9 − 3 = ?', a:6, opts:[5,6,7,4] },
  { q:'6 × 3 = ?', a:18, opts:[16,18,21,12] },
];
let current = 0;
let score = 0;

const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizProgress = document.getElementById('quizProgress');
const quizFill = document.getElementById('quizFill');
const quizHint = document.getElementById('quizHint');

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function showQuestion(idx){
  const item = questions[idx];
  quizQuestion.textContent = item.q;
  quizProgress.textContent = `${idx+1} / ${questions.length}`;
  quizFill.style.width = `${((idx)/questions.length)*100 + 25}%`;
  quizHint.textContent = '\u00A0';
  quizOptions.innerHTML = '';

  shuffle(item.opts).forEach(val=>{
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.textContent = val;
    btn.addEventListener('click', ()=> handleAnswer(btn, val, item.a));
    quizOptions.appendChild(btn);
  });
}

function handleAnswer(btn, val, correct){
  const buttons = quizOptions.querySelectorAll('.opt');
  buttons.forEach(b=> b.disabled = true);

  if(val === correct){
    btn.classList.add('correct');
    score++;
    quizHint.textContent = 'Ajoyib! To\u2018g\u2018ri javob 🌸';
  } else {
    btn.classList.add('wrong');
    buttons.forEach(b=>{ if(Number(b.textContent) === correct) b.classList.add('correct'); });
    quizHint.textContent = 'Hechqisi yo\u2018q, davom etamiz 💫';
  }

  setTimeout(()=>{
    current++;
    if(current < questions.length){
      showQuestion(current);
    } else {
      quizFill.style.width = '100%';
      setTimeout(showLetter, 400);
    }
  }, 1000);
}

/* ---------------- letter ---------------- */
const letterScore = document.getElementById('letterScore');
function showLetter(){
  letterScore.textContent = `Test natijasi: ${score} / ${questions.length} — baribir sen zo'rsan ✨`;
  goTo(screenLetter);
}
