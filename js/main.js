// Onlyкурс — FAN FLOW (clean skeleton)
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Smooth scroll for internal anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (!id || id === '#') return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
// Modules accordion
document.querySelectorAll('.module-head').forEach(head => {
  head.addEventListener('click', () => {
    const module = head.parentElement;

    // закрываем остальные
    document.querySelectorAll('.module').forEach(m => {
      if (m !== module) m.classList.remove('active');
    });

    module.classList.toggle('active');
  });
});
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('active');

    // закрываем все
    document.querySelectorAll('.faq-item').forEach(i => {
      const a = i.querySelector('.faq-answer');
      i.classList.remove('active');
      a.style.height = '0px';
    });

    // если был закрыт — открываем
    if (!isOpen) {
      item.classList.add('active');
      answer.style.height = answer.scrollHeight + 'px';
    }
  });
});

const reviewsToggle = document.getElementById('reviewsToggle');
const moreReviews = document.getElementById('moreReviews');

if (reviewsToggle && moreReviews) {
  reviewsToggle.addEventListener('click', () => {
    const open = moreReviews.classList.toggle('is-open');
    reviewsToggle.textContent = open ? 'Скрыть отзывы' : 'Показать ещё отзывы';
  });
}


// Reviews toggle
document.addEventListener('DOMContentLoaded', () => {
  const reviewsToggle = document.getElementById('reviewsToggle');
  const moreReviews = document.getElementById('moreReviews');

  if (reviewsToggle && moreReviews) {
    reviewsToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const open = moreReviews.classList.toggle('is-open');
      reviewsToggle.textContent = open ? 'Скрыть отзывы' : 'Показать ещё отзывы';
    });
  }
});


// Reviews toggle (delegated, чтобы точно работало)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('#reviewsToggle');
  if (!btn) return;

  e.preventDefault();
  const moreReviews = document.getElementById('moreReviews');
  if (!moreReviews) return;

  const open = moreReviews.classList.toggle('is-open');
  btn.textContent = open ? 'Скрыть отзывы' : 'Показать ещё отзывы';
});


// HERO TIMER (starts from 09:12:12 and loops)
(function(){
  const elHH = document.getElementById('tHH');
  const elMM = document.getElementById('tMM');
  const elSS = document.getElementById('tSS');
  if(!elHH || !elMM || !elSS) return;

  const START_SECONDS = (9*3600) + (12*60) + 12;
  let remaining = START_SECONDS;

  const pad2 = (n) => String(n).padStart(2,'0');

  function tick(){
    const hh = Math.floor(remaining / 3600);
    const mm = Math.floor((remaining % 3600) / 60);
    const ss = remaining % 60;

    elHH.textContent = pad2(hh);
    elMM.textContent = pad2(mm);
    elSS.textContent = pad2(ss);

    remaining -= 1;
    if(remaining < 0) remaining = START_SECONDS;
  }

  tick();
  setInterval(tick, 1000);
})();


// Reviews desktop slider (3 cards per view)
document.addEventListener('DOMContentLoaded', () => {
  const mq = window.matchMedia('(min-width: 901px)');
  const slider = document.querySelector('.reviews-desktop-slider');
  if (!slider) return;

  const viewport = slider.querySelector('.reviews-viewport');
  const track = slider.querySelector('.reviews-track');
  const prev = slider.querySelector('.reviews-nav.prev');
  const next = slider.querySelector('.reviews-nav.next');
  if (!viewport || !track || !prev || !next) return;

  const getStep = () => {
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    // width of one card + gap
    const card = track.querySelector('.review-row');
    if (!card) return viewport.clientWidth;
    const cardW = card.getBoundingClientRect().width;
    return (cardW + gap) * 3; // 3 cards per click
  };

  const updateButtons = () => {
    // disable at ends (non-infinite)
    const maxScroll = track.scrollWidth - viewport.clientWidth;
    prev.disabled = viewport.scrollLeft <= 1;
    next.disabled = viewport.scrollLeft >= (maxScroll - 1);
  };

  const scrollByStep = (dir) => {
    viewport.scrollBy({ left: dir * getStep(), behavior: 'smooth' });
  };

  prev.addEventListener('click', () => scrollByStep(-1));
  next.addEventListener('click', () => scrollByStep(1));
  viewport.addEventListener('scroll', () => requestAnimationFrame(updateButtons));
  window.addEventListener('resize', () => requestAnimationFrame(updateButtons));
  mq.addEventListener?.('change', () => requestAnimationFrame(updateButtons));

  // initial
  updateButtons();
});
