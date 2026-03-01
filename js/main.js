document.addEventListener('DOMContentLoaded', () => {
  // 1. Установка года в подвале
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Плавный скролл для якорных ссылок
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

  // 3. Идеально плавные аккордеоны через scrollHeight
  const initSmoothAccordion = (headSelector, itemSelector, bodySelector) => {
    document.querySelectorAll(headSelector).forEach(head => {
      head.addEventListener('click', () => {
        const currentItem = head.closest(itemSelector);
        const currentBody = currentItem.querySelector(bodySelector);
        const isActive = currentItem.classList.contains('active');

        // Закрываем все открытые вкладки
        document.querySelectorAll(itemSelector).forEach(item => {
          item.classList.remove('active');
          const body = item.querySelector(bodySelector);
          if (body) body.style.height = '0px';
        });

        // Открываем текущую с точным расчетом высоты
        if (!isActive) {
          currentItem.classList.add('active');
          currentBody.style.height = currentBody.scrollHeight + 'px';
        }
      });
    });
  };

  initSmoothAccordion('.module-head', '.module', '.module-body');
  initSmoothAccordion('.faq-question', '.faq-item', '.faq-answer');

  // 4. Логика таймера
  const elHH = document.getElementById('tHH');
  const elMM = document.getElementById('tMM');
  const elSS = document.getElementById('tSS');

  if (elHH && elMM && elSS) {
    const START_SECONDS = (9 * 3600) + (12 * 60) + 12;
    let remaining = START_SECONDS;

    const pad2 = (n) => String(n).padStart(2, '0');

    const animateUpdate = (element, newValue) => {
      if (element.textContent !== newValue) {
        element.textContent = newValue;
        element.classList.remove('pop');
        void element.offsetWidth;
        element.classList.add('pop');
      }
    };

    function tick() {
      const hh = Math.floor(remaining / 3600);
      const mm = Math.floor((remaining % 3600) / 60);
      const ss = remaining % 60;

      animateUpdate(elHH, pad2(hh));
      animateUpdate(elMM, pad2(mm));
      animateUpdate(elSS, pad2(ss));

      remaining -= 1;
      if (remaining < 0) remaining = START_SECONDS;
    }

    tick();
    setInterval(tick, 1000);
  }

  // 5. Скролл-анимации (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -15% 0px',
    threshold: 0.1
  };

  const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('glow-active');
      } else {
        entry.target.classList.remove('glow-active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.list-grid li').forEach(li => {
    glowObserver.observe(li);
  });

  // 6. Логика перетаскивания (Drag-to-scroll) для слайдера кейсов
  const slider = document.querySelector('.cases-slider');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      // Временно отключаем snap при перетаскивании для плавности
      slider.style.scrollSnapType = 'none'; 
    });
    
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
      slider.style.scrollSnapType = 'x mandatory';
    });
    
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
      slider.style.scrollSnapType = 'x mandatory';
    });
    
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Ускоритель скролла
      slider.scrollLeft = scrollLeft - walk;
    });
  }
});