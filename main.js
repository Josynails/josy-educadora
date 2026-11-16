(() => {
  const C = window.JOSY || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  const TBC = 'A confirmar';
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const areaLabel = id => (C.areas.find(a => a.id === id) || {}).label || id;

  /* ---------- conteúdo vindo do config.js ---------- */
  const mk = s => esc(String(s)).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\\n|\n/g, '<br>');
  const imgUrl = v => (String(v).includes('/') ? v : '/assets/aulas/' + v + '.jpg');
  const ARROW = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  (function renderStatic() {
    const T = C.texts || {};
    if (C.meta) { document.title = C.meta.title; const md = $('meta[name="description"]'); if (md) md.content = C.meta.description; }
    $$('[data-t]').forEach(el => { if (T[el.dataset.t] != null) el.innerHTML = mk(T[el.dataset.t]); });
    $('#heroH1').setAttribute('aria-label', [T['hero.title1'], T['hero.title2'], T['hero.title3']].join(' '));
    if (C.heroVideo) $('#heroVideo').src = C.heroVideo;
    if (C.contact.whatsappDisplay) $('#waNum').textContent = C.contact.whatsappDisplay;
    $('#nav').innerHTML = C.nav.map(n => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join('');
    $('#ftrNav').innerHTML = C.nav.filter(n => n.footer).map(n => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join('');
    $('#marqueeTrack').innerHTML = [0, 1].map(() => C.marquee.map(m => `<span>${esc(m)}</span>`).join('')).join('');
    const stat = (f, tag) => `<${tag}><strong${f.count ? ` data-count="${f.count}"` : ''}>${esc(f.big)}</strong><span>${mk(f.small)}</span></${tag}>`;
    $('#heroFacts').innerHTML = C.facts.map(f => stat(f, 'li')).join('');
    $('#eduStats').innerHTML = C.stats.map(f => stat(f, 'div')).join('');
    $('#pathsBox').innerHTML = C.paths.map((p, i) => `<button class="path" data-level="${esc(p.level)}" data-r><img src="${esc(imgUrl(p.img))}" alt="${esc(p.alt || '')}" loading="lazy"><span class="path__n">0${i + 1}</span><span class="path__body"><b>${esc(p.title)}</b><small>${esc(p.text)}</small><i>${esc(p.cta || 'Ver formações')} ${ARROW}</i></span></button>`).join('');
    $('#techSteps').innerHTML = C.steps.map((s, i) => `<li><b>0${i + 1}</b> ${esc(s)}</li>`).join('');
    $('#techCards').innerHTML = C.gallery.map((g, i) => `<figure class="tcard${i % 2 ? ' tcard--lo' : ''}"><img src="${esc(imgUrl(g.img))}" alt="${esc(g.alt || g.caption)}" loading="lazy"><figcaption><b>0${i + 1}</b>${esc(g.caption)}</figcaption></figure>`).join('');
    $('#flowList').innerHTML = C.flow.map((f, i) => `<li data-r><b>0${i + 1}</b><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></li>`).join('');
    $('#acc').innerHTML = C.faq.map(f => `<details><summary>${esc(f.q)}</summary><div><p>${esc(f.a)}</p></div></details>`).join('');
    const Q = C.quiz || {}; if (Q.back) $('#quizBack').textContent = Q.back; if (Q.reset) $('#quizReset').textContent = Q.reset;
  })();
  /* ---------- demo bar ---------- */
  

  /* ---------- scroll suave para âncoras ---------- */
  const goTo = sel => {
    const el = $(sel); if (!el) return;
    const top = el.getBoundingClientRect().top + scrollY - 10;
    scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const h = a.getAttribute('href'); if (h.length < 2) return;
    e.preventDefault(); closeMenu(); goTo(h);
  });

  /* ---------- menu mobile ---------- */
  const burger = $('#burger'), nav = $('#nav');
  function closeMenu() { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  burger.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* ---------- header: sólido + esconde ao descer ---------- */
  const hdr = $('#hdr'), fab = $('#fab'); let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    hdr.classList.toggle('is-solid', y > 40);
    hdr.classList.toggle('is-hidden', y > lastY && y > 500 && !nav.classList.contains('open'));
    fab.classList.toggle('on', y > innerHeight * .8);
    lastY = y;
  }, { passive: true });

  /* ---------- formações ---------- */
  let currentLevel = 'todas';
  const tabs = $('#tabs'), list = $('#courses'), interest = $('#leadInterest');

  function renderTabs() {
    const items = [['todas', 'Todas'], ...Object.entries(C.levels)];
    tabs.innerHTML = items.map(([id, l]) => `<button class="tab" role="tab" data-lv="${id}" aria-selected="${id === currentLevel}">${l}</button>`).join('');
  }
  function spec(label, v) {
    const ok = v !== null && v !== undefined && v !== '';
    return `<div><dt>${label}</dt><dd class="${ok ? '' : 'tbc'}">${ok ? esc(v) : TBC}</dd></div>`;
  }
  function specs(c) {
    const rows = [['Modalidade', c.modality], ['Carga horária', c.workload], ['Próxima turma', c.nextClass], ['Vagas', c.seats], ['Investimento', c.price], ['Certificação', c.certificate]].filter(r => r[1]);
    return rows.length ? `<dl class="specs">${rows.map(r => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl>` : `<p class="course__b">Datas, valores e condições: consulte a Josy pelo WhatsApp.</p>`;
  }
  function renderCourses(hl) {
    const arr = C.courses.filter(c => currentLevel === 'todas' || c.level === currentLevel);
    if (!arr.length) { list.innerHTML = `<p class="lead">Ainda não há formação cadastrada neste nível. Fale com a educadora para receber orientação.</p>`; return; }
    list.innerHTML = arr.map(c => `
      <article class="course ${hl === c.id ? 'is-hl' : ''}" id="${c.id}" data-id="${c.id}">
        <div class="course__top"><span class="pill">${C.levels[c.level]}</span></div>
        <h3>${esc(c.title)}</h3>
        <p class="course__b">${esc(c.blurb)}</p>
        <div class="course__areas">${c.areas.map(a => `<span>${esc(areaLabel(a))}</span>`).join('')}</div>
        ${specs(c)}
        ${c.checkoutUrl
          ? `<a class="btn" href="${esc(c.checkoutUrl)}" target="_blank" rel="noopener">Fazer minha inscrição</a>`
          : `<button class="btn" data-want="${c.id}" type="button">Falar com a Josy</button>`}
      </article>`).join('');
    if (hasGsap && !reduce) gsap.from('.course', { opacity: 0, y: 30, duration: .8, stagger: .1, ease: 'power3.out' });
  }
  tabs.addEventListener('click', e => {
    const b = e.target.closest('.tab'); if (!b) return;
    currentLevel = b.dataset.lv; renderTabs(); renderCourses();
  });
  list.addEventListener('click', e => {
    const b = e.target.closest('[data-want]'); if (!b) return;
    const c = C.courses.find(x => x.id === b.dataset.want); if (C.contact.whatsapp) window.open('https://wa.me/' + C.contact.whatsapp + '?text=' + encodeURIComponent('Olá, Josy! Quero informações sobre a ' + c.title.toLowerCase() + '.'), '_blank', 'noopener'); else { interest.value = b.dataset.want; goTo('#inscricao'); }
  });
  $$('.path').forEach(p => p.addEventListener('click', () => {
    currentLevel = p.dataset.level; renderTabs(); renderCourses(); goTo('#formacoes');
  }));

  interest.innerHTML = `<option value="">Ainda não sei — quero orientação</option>` + C.courses.map(c => `<option value="${c.id}">${esc(c.title)}</option>`).join('');
  renderTabs(); renderCourses();

  /* ---------- depoimentos ---------- */
  const testis = $('#testis');
  const tvids = C.videos.filter(v => v.cat === 'depoimento');
  if (!(C.testimonials && C.testimonials.length) && !tvids.length) { const s = $('#depoimentos'); if (s) s.remove(); }
  else testis.innerHTML = tvids.map(v => `<button class="tv" data-id="${v.id}" type="button" aria-label="Assistir: ${esc(v.caption)}"><img src="/assets/aulas/${v.id}.jpg" alt="" loading="lazy"><span class="tv__play"></span><span class="tv__t"><b>${esc(v.caption)}</b><span>Vídeo · ${v.dur}</span></span></button>`).join('')
    + (C.testimonials || []).map(t => `<figure class="testi"><q>${esc(t.text)}</q><cite>${esc(t.name)}${t.role ? ' · ' + esc(t.role) : ''}</cite></figure>`).join('');
  /* ---------- rodapé ---------- */
  const ct = [];
  if (C.contact.instagram) ct.push(`<a href="https://www.instagram.com/${esc(C.contact.instagram)}" target="_blank" rel="noopener">Instagram · @${esc(C.contact.instagram)}</a>`);
  if (C.contact.whatsapp) ct.push(`<a href="https://wa.me/${esc(C.contact.whatsapp)}" target="_blank" rel="noopener">WhatsApp · ${esc(C.contact.whatsappDisplay || '')}</a>`);
  if (C.contact.email) ct.push(`<a href="mailto:${esc(C.contact.email)}">${esc(C.contact.email)}</a>`);

  $('#ftrContact').innerHTML = ct.join('');

  /* ---------- WhatsApp direto + vídeos sob demanda ---------- */
  const wa = $('#waDirect');
  if (C.contact.whatsapp) wa.href = `https://wa.me/${C.contact.whatsapp}?text=${encodeURIComponent(C.contact.whatsappMessage || 'Olá, Josy! Quero mais informações sobre as formações.')}`; else wa.hidden = true;
  if (C.contact.whatsapp) { const hw = $('#heroWa'); if (hw) { hw.href = wa.href; hw.target = '_blank'; hw.rel = 'noopener'; } }
  if (C.contact.whatsapp) $$('.hdr__cta,.fab').forEach(a => { a.href = $('#waDirect').href; a.target = '_blank'; a.rel = 'noopener'; a.dataset.wa = 1; (a.querySelector('span') || a).textContent = C.contact.whatsappLabel || 'Falar no WhatsApp'; });
  /* ---------- vídeos: galeria + lightbox ---------- */
  const vgrid = $('#vgrid'), vtabs = $('#vtabs'), lb = $('#lb'), lbV = $('#lbV'); let vcat = 'todos';
  function renderVideos() {
    vtabs.innerHTML = Object.entries(C.videoCats).map(([id, l]) => `<button class="tab" role="tab" data-c="${id}" aria-selected="${id === vcat}">${l}</button>`).join('');
    const arr = C.videos.filter(v => vcat === 'todos' || v.cat === vcat);
    vgrid.innerHTML = arr.map(v => `<button class="vc" data-id="${v.id}" type="button" aria-label="Assistir: ${esc(v.caption || 'vídeo')}">
      <img src="/assets/aulas/${v.id}.jpg" alt="" loading="lazy"><span class="vc__dur">${v.dur}</span><span class="vc__play"></span>
      <span class="vc__t">${v.caption ? `<b>${esc(v.caption)}</b>` : `<b class="nc">Técnica em vídeo</b>`}</span></button>`).join('');
  }
  vtabs.addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) { vcat = b.dataset.c; renderVideos(); } });
  vgrid.addEventListener('click', e => {
    const b = e.target.closest('.vc'); if (!b) return; const v = C.videos.find(x => x.id === b.dataset.id);
    lbV.src = '/assets/aulas/' + v.id + '.mp4'; $('#lbC').textContent = v.caption || ''; lb.hidden = false; document.body.style.overflow = 'hidden'; lbV.play().catch(() => {});
  });
  const closeLb = () => { lb.hidden = true; lbV.pause(); lbV.removeAttribute('src'); lbV.load(); document.body.style.overflow = ''; };
  $('#lbX').addEventListener('click', closeLb); lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) closeLb(); });
  renderVideos();
  testis.addEventListener('click', e => {
    const b = e.target.closest('.tv'); if (!b) return; const v = C.videos.find(x => x.id === b.dataset.id);
    lbV.src = '/assets/aulas/' + v.id + '.mp4'; $('#lbC').textContent = v.caption || ''; lb.hidden = false; document.body.style.overflow = 'hidden'; lbV.play().catch(() => {});
  });

  /* ---------- evolução: jornada em 3 momentos ---------- */
  const evoSteps = C.evolution.map(s => ({ n: s.n, t: s.title, d: s.text, level: s.level, img: s.img }));
  const evoTrack = $('#evoTrack'), evoPanel = $('#evoPanel'), evoBar = $('#evoBar'); let evoI = 0;
  evoTrack.insertAdjacentHTML('beforeend', evoSteps.map((s, i) => `<button class="evo__step" role="tab" id="evo-${i}" data-i="${i}" aria-selected="${i === 0}" aria-controls="evoPanel"><b>${s.n}</b><span>${s.t}</span><small>${s.d}</small></button>`).join(''));
  function showEvo(i) {
    evoI = i; const s = evoSteps[i], c = C.courses.find(x => x.level === s.level);
    $$('.evo__step', evoTrack).forEach((b, k) => b.setAttribute('aria-selected', k === i));
    evoBar.style.transform = `scaleX(${(i + 1) / 3})`;
    evoPanel.innerHTML = `<div class="evo__img"><img src="${esc(imgUrl(s.img))}" alt="" loading="lazy"></div>
      <div><span class="pill">Etapa ${s.n}</span><h3>${s.t}</h3><p>${s.d}</p>
      ${c ? `<div class="course__areas">${c.areas.map(a => `<span>${esc(areaLabel(a))}</span>`).join('')}</div><p><b>${esc(c.title)}</b><br>${esc(c.blurb)}</p>
      <div style="margin-top:1.4rem"><button class="btn" type="button" data-want="${c.id}">Falar com a Josy</button></div>` : ''}</div>`;
  }
  evoTrack.addEventListener('click', e => { const b = e.target.closest('.evo__step'); if (b) showEvo(+b.dataset.i); });
  evoTrack.addEventListener('keydown', e => { if (e.key === 'ArrowRight') showEvo(Math.min(2, evoI + 1)); if (e.key === 'ArrowLeft') showEvo(Math.max(0, evoI - 1)); });
  evoPanel.addEventListener('click', e => { const b = e.target.closest('[data-want]'); if (b) list.dispatchEvent(new CustomEvent('wa', { detail: b.dataset.want })); });
  list.addEventListener('wa', e => { const c = C.courses.find(x => x.id === e.detail); if (c && C.contact.whatsapp) window.open('https://wa.me/' + C.contact.whatsapp + '?text=' + encodeURIComponent('Olá, Josy! Quero informações sobre a ' + c.title.toLowerCase() + '.'), '_blank', 'noopener'); });
  showEvo(0);

  /* ---------- seção ativa no menu ---------- */
  const navLinks = $$('.hdr__nav a');
  const navIO = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) navIO.observe(s); });
  /* ---------- formulário ---------- */
  const form = $('#leadForm'), msg = $('#formMsg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form), nome = (d.get('nome') || '').trim(), tel = (d.get('whats') || '').replace(/\D/g, '');
    msg.className = 'form__msg';
    if (nome.length < 2) { msg.classList.add('err'); msg.textContent = 'Conte-nos seu nome para continuar.'; return; }
    if (tel.length < 10) { msg.classList.add('err'); msg.textContent = 'Confira o número de WhatsApp com DDD.'; return; }
    const course = C.courses.find(c => c.id === d.get('interesse'));
    const text = `Olá, Josy! Sou ${nome}. Quero receber informações sobre ${course ? 'a ' + course.title.toLowerCase() : 'as formações'}.`;
    if (C.contact.whatsapp) {
      msg.textContent = 'Abrindo o WhatsApp…';
      window.open(`https://wa.me/${C.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } else {
      msg.textContent = 'Recebemos seus dados. Em breve entraremos em contato.';
    }
  });

  /* ---------- trilha nail (quiz) ---------- */
  const stage = $('#quizStage'), prog = $$('#quizProg i'), back = $('#quizBack'), reset = $('#quizReset');
  const ans = {}; let step = 0;
  const modOpts = C.modalities;
  const steps = [
    { key: 'exp', q: C.quiz.q1, opts: C.experience },
    { key: 'area', q: C.quiz.q2, opts: C.areas },
    { key: 'mod', q: C.quiz.q3, opts: modOpts }
  ];
  function setProg(n) {
    prog.forEach((p, i) => p.classList.toggle('on', i < n));
    $('#quizProg').setAttribute('aria-valuenow', Math.min(n, 3));
  }
  function swap(html, after) {
    const done = () => { stage.innerHTML = html; if (after) after(); if (hasGsap && !reduce) gsap.fromTo(stage.children, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: .55, stagger: .06, ease: 'power3.out' }); };
    if (hasGsap && !reduce && stage.children.length) gsap.to(stage.children, { opacity: 0, x: -20, duration: .22, onComplete: done }); else done();
  }
  function renderStep() {
    const s = steps[step]; back.hidden = step === 0; reset.hidden = true; setProg(step + 1);
    swap(`<p class="q__n">Pergunta ${step + 1} de 3</p><h3 class="q__t">${s.q}</h3>
      <div class="opts">${s.opts.map(o => `<button class="opt ${ans[s.key] === o.id ? 'is-sel' : ''}" data-id="${o.id}" type="button">${esc(o.label)}</button>`).join('')}</div>`);
  }
  stage.addEventListener('click', e => {
    const o = e.target.closest('.opt'); if (o) {
      const s = steps[step]; ans[s.key] = o.dataset.id;
      $$('.opt', stage).forEach(x => x.classList.toggle('is-sel', x === o));
      setTimeout(() => { if (step < 2) { step++; renderStep(); } else result(); }, 320);
      return;
    }
    const w = e.target.closest('[data-res]');
    if (w) {
      if (w.dataset.res === 'go') { const id = w.dataset.id; const c = C.courses.find(x => x.id === id); currentLevel = c ? c.level : 'todas'; renderTabs(); renderCourses(id); goTo('#formacoes'); }
      else { if (w.dataset.id) interest.value = w.dataset.id; goTo('#inscricao'); }
    }
  });
  back.addEventListener('click', () => { if (step > 0) { step--; renderStep(); } });
  reset.addEventListener('click', () => { Object.keys(ans).forEach(k => delete ans[k]); step = 0; renderStep(); });

  function result() {
    setProg(3); back.hidden = true; reset.hidden = false;
    const exp = C.experience.find(x => x.id === ans.exp), lvl = exp && exp.level;
    const scored = C.courses.map(c => ({ c, s: (c.level === lvl ? 2 : 0) + (c.areas.includes(ans.area) ? 1 : 0) })).sort((a, b) => b.s - a.s);
    const best = scored[0] && scored[0].s > 0 ? scored[0].c : null;
    const mod = modOpts.find(m => m.id === ans.mod);
    const sum = `<div class="res__sum"><span>${esc(exp.label)}</span><span>${esc(areaLabel(ans.area))}</span><span>${esc(mod.label)}</span></div>`;
    const demoTag = `<span class="res__tag">Sua trilha</span>`;
    const body = best
      ? `${sum}<div class="res__card"><small>${esc(C.levels[best.level])}</small><b>${esc(best.title)}</b></div>
         <p class="res__p">${mod.id === 'conhecer' ? 'Modalidade combinada no atendimento.' : `Você prefere formação ${esc(mod.label.toLowerCase())} — a disponibilidade dessa modalidade é informada pela Josy.`}</p>
         <div class="q__next" style="justify-content:flex-start;gap:14px;flex-wrap:wrap;margin-top:22px"><button class="btn" data-res="go" data-id="${best.id}" type="button">${esc(C.quiz.btnGo)}</button><button class="btn btn--ghost" data-res="talk" data-id="${best.id}" type="button">${esc(C.quiz.btnTalk)}</button></div>`
      : `${sum}<p class="res__p">Ainda não há uma formação cadastrada que corresponda exatamente às suas respostas. Fale com a educadora para receber orientação.</p>
         <div class="q__next" style="justify-content:flex-start;margin-top:22px"><button class="btn" data-res="talk" type="button">Receber orientação</button></div>`;
    swap(`${demoTag}<img class="res__dia" src="/assets/brand/diamante.png" alt=""><h3 class="res__t">${esc(C.quiz.result)}</h3>${body}`);
  }
  renderStep();

  /* ---------- animações ---------- */
  if (!hasGsap) { document.documentElement.classList.remove('js'); $('#intro').remove(); return; }
  gsap.registerPlugin(ScrollTrigger);

  const counters = $$('[data-count]');
  const countUp = (el, delay = 0) => {
    const end = +el.dataset.count, o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.8, delay, ease: 'power2.out', onUpdate: () => el.textContent = Math.round(o.v) });
  };

  const intro = $('#intro');
  const killIntro = () => { intro.style.display = 'none'; };

  if (reduce) {
    killIntro(); counters.forEach(c => c.textContent = c.dataset.count); $$('[data-r]').forEach(el => el.style.cssText = 'opacity:1;transform:none');
    return;
  }

  // estado inicial do hero
  gsap.set('.hero__h1 .ln>span', { yPercent: 118 });
  gsap.set('[data-hero=up]', { opacity: 0, y: 30 });
  gsap.set('.capsule', { clipPath: 'inset(0% 0% 100% 0% round 999px)' });
  gsap.set('.capsule video', { scale: 1.3 });
  gsap.set('.badge', { scale: 0, opacity: 0 });
  gsap.set('.hdr', { yPercent: -100, opacity: 0 });
  counters.forEach(c => c.textContent = '0');

  const heroIn = () => {
    const t = gsap.timeline({ defaults: { ease: 'power4.out' } });
    t.to('.hdr', { yPercent: 0, opacity: 1, duration: 1 }, 0)
     .to('.hero__h1 .ln>span', { yPercent: 0, duration: 1.3, stagger: .14 }, 0.05)
     .to('[data-hero=up]', { opacity: 1, y: 0, duration: 1, stagger: .12 }, 0.45)
     .to('.capsule', { clipPath: 'inset(0% 0% 0% 0% round 999px)', duration: 1.6, ease: 'expo.inOut' }, 0.1)
     .to('.capsule video', { scale: 1, duration: 2.2, ease: 'power3.out' }, 0.1)
     .to('.badge', { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.6)' }, 1.2);
    countUp($('.hero__facts [data-count]'), .6);
  };

  let introDone = false;
  const tl = gsap.timeline({ onComplete: () => { introDone = true; killIntro(); } });
  tl.to('.intro__diamond', { opacity: 1, scale: 1.08, duration: .8, ease: 'power2.out' }, 0)
    .to('.intro__diamond', { opacity: 0, scale: 1.3, duration: .45, ease: 'power2.in' }, .85)
    .to('.intro__logo', { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut' }, 1.05)
    .to('.intro__logo', { opacity: 0, duration: .4 }, 2.3)
    .to('.intro', { yPercent: -100, duration: .85, ease: 'power4.inOut' }, 2.4)
    .add(heroIn, 2.9);
  gsap.set('.intro__diamond', { scale: .8 });
  intro.addEventListener('click', () => { if (!introDone) { tl.timeScale(6); } });

  // parallax do hero
  gsap.to('.hero__media', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__wm', { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // reveals
  ScrollTrigger.batch('[data-r]', {
    start: 'top 88%', once: true,
    onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, stagger: .12, ease: 'power3.out', overwrite: true })
  });

  // contador da educadora
  const eduCount = $('.edu [data-count]');
  if (eduCount) { eduCount.textContent = '0'; ScrollTrigger.create({ trigger: eduCount, start: 'top 85%', once: true, onEnter: () => countUp(eduCount) }); }

  // caminhos: stagger com pequena inclinação
  gsap.from('.path', { y: 70, duration: 1.2, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: '.paths', start: 'top 80%', once: true } });

  // galeria horizontal pinada (desktop)
  const mm = gsap.matchMedia();
  mm.add('(min-width: 861px)', () => {
    const row = $('#techRow');
    const dist = () => Math.max(0, row.scrollWidth - innerWidth);
    gsap.to(row, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '#techPin', pin: true, start: 'top top', end: () => '+=' + dist(), scrub: .7, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    gsap.utils.toArray('.tcard img').forEach(img => gsap.fromTo(img, { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img.parentElement, containerAnimation: gsap.getTweensOf(row)[0], start: 'left 95%', end: 'left 30%', scrub: true } }));
  });

  // vídeo só toca visível
  const v = $('#heroVideo');
  if (v) ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onToggle: s => s.isActive ? v.play().catch(() => {}) : v.pause() });

  // diamante: surge, gira com profundidade, ganha reflexo e se acomoda sobre o título
  const evoPin = $('#evoPin'), evoDia = $('#evoDia'), evoSheen = $('#evoSheen'), evoText = $('#evoText');
  if (evoPin && evoDia) {
    mm.add('(min-width: 0px)', () => {
      const slot = evoDia.parentElement;
      const state = () => {
        const p = evoPin.getBoundingClientRect(), sl = slot.getBoundingClientRect();
        const big = Math.min(innerHeight * .46, 340);
        return { dx: (p.left + p.width / 2) - (sl.left + sl.width / 2), dy: (p.top + p.height / 2) - (sl.top + sl.height / 2) + 0, s: big / sl.width };
      };
      let st = state();
      gsap.set(evoText, { opacity: 0, y: 30 });
      gsap.set(evoDia, { opacity: 0, transformPerspective: 900 });
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: evoPin, start: 'top top', end: '+=170%', pin: true, scrub: .6, invalidateOnRefresh: true, onRefresh: () => { st = state(); } } });
      tl.fromTo(evoDia, { x: () => st.dx, y: () => st.dy, scale: () => st.s * .7, rotationY: -28, opacity: 0 }, { scale: () => st.s, opacity: 1, rotationY: 0, duration: .22 })
        .to(evoDia, { rotationY: 30, duration: .3 })
        .fromTo(evoSheen, { backgroundPosition: '160% 0' }, { backgroundPosition: '-60% 0', duration: .3 }, '<')
        .to(evoDia, { x: 0, y: 0, scale: 1, rotationY: 0, duration: .3, ease: 'power2.inOut' })
        .to(evoText, { opacity: 1, y: 0, duration: .22 }, '-=.12');
    });
  }
  addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
