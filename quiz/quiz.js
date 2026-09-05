/* ==========================================================================
   RFM Bible Quiz — game logic
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

  const TOTAL = 10;
  let questions = [];
  let idx = 0;
  let score = 0;
  let answered = false;

  const introEl = $('#quiz-intro');
  const playEl = $('#quiz-play');
  const resultEl = $('#quiz-result');

  const qText = $('#q-text');
  const qOptions = $('#q-options');
  const qCount = $('#q-count');
  const qFill = $('#q-fill');
  const qExplain = $('#q-explain');
  const btnNext = $('#btn-next');
  const btnSkip = $('#btn-skip');

  // Fisher-Yates shuffle
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startQuiz() {
    questions = shuffle(window.QUIZ_QUESTIONS).slice(0, TOTAL);
    idx = 0;
    score = 0;
    introEl.style.display = 'none';
    resultEl.style.display = 'none';
    playEl.style.display = 'block';
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    qExplain.style.display = 'none';
    btnNext.style.display = 'none';
    btnSkip.style.display = 'inline-flex';

    const q = questions[idx];
    qCount.textContent = `Question ${idx + 1} / ${TOTAL}`;
    qFill.style.width = ((idx + 1) / TOTAL * 100) + '%';
    qText.textContent = q.q;

    qOptions.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.o.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="letter">${letters[i]}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => handleAnswer(i, btn));
      qOptions.appendChild(btn);
    });
  }

  function handleAnswer(choice, btn) {
    if (answered) return;
    answered = true;
    const q = questions[idx];
    const buttons = qOptions.querySelectorAll('.quiz-option');
    buttons.forEach(b => b.disabled = true);

    if (choice === q.a) {
      score++;
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      buttons[q.a].classList.add('correct');
    }

    qExplain.textContent = q.e;
    qExplain.style.display = 'block';
    btnSkip.style.display = 'none';
    btnNext.style.display = 'inline-flex';
    btnNext.textContent = (idx === TOTAL - 1) ? 'See Results →' : 'Next →';
  }

  function next() {
    idx++;
    if (idx >= TOTAL) return showResult();
    renderQuestion();
  }

  function skip() {
    idx++;
    if (idx >= TOTAL) return showResult();
    renderQuestion();
  }

  function showResult() {
    playEl.style.display = 'none';
    resultEl.style.display = 'block';
    $('#r-score').textContent = score;

    let title, message;
    if (score === 10) {
      title = '"Well done, good and faithful servant!"';
      message = 'A perfect score — you know your Word beautifully. Keep growing.';
    } else if (score >= 8) {
      title = '"Great is your faith!"';
      message = 'Excellent work. You have a strong foundation in Scripture. Consider joining a small group to go even deeper.';
    } else if (score >= 6) {
      title = 'Well done — keep growing!';
      message = 'A solid score. The Word rewards those who study it daily. Try again to improve.';
    } else if (score >= 3) {
      title = 'A good start.';
      message = 'Every journey starts with a step. Read a chapter a day and you\'ll be amazed how quickly your knowledge grows.';
    } else {
      title = 'Begin with the Word.';
      message = 'The Bible is a living book — the more you read, the more you find. Start with the Gospel of John.';
    }

    $('#r-title').textContent = title;
    $('#r-message').textContent = message;

    // Save best score to localStorage
    try {
      const best = Number(localStorage.getItem('rfm-quiz-best') || 0);
      if (score > best) localStorage.setItem('rfm-quiz-best', String(score));
    } catch (e) { /* private mode */ }
  }

  on($('#start-quiz'), 'click', startQuiz);
  on($('#btn-retry'), 'click', startQuiz);
  on(btnNext, 'click', next);
  on(btnSkip, 'click', skip);

})();
