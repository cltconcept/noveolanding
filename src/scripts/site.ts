import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const header = document.querySelector<HTMLElement>('.site-header');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileNav = document.querySelector<HTMLElement>('.mobile-nav');
const language = document.querySelector<HTMLDetailsElement>('.language-switch');

function setMenu(open: boolean, restoreFocus = false) {
  if (!menuButton || !mobileNav) return;
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute(
    'aria-label',
    (open ? menuButton.dataset.closeLabel : menuButton.dataset.openLabel) || 'Menu',
  );
  mobileNav.inert = !open;
  document.querySelector<HTMLElement>('main')!.inert = open;
  document.querySelector<HTMLElement>('footer')!.inert = open;
  document.querySelector<HTMLElement>('.cta-section')?.toggleAttribute('inert', open);
  if (open) {
    if (language) language.open = false;
    // Wait for the closed menu's visibility to be removed before moving focus.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (menuButton.getAttribute('aria-expanded') === 'true') {
          mobileNav.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
        }
      }),
    );
  } else if (restoreFocus) menuButton.focus();
}
menuButton?.addEventListener('click', () =>
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true'),
);
mobileNav
  ?.querySelectorAll('a')
  .forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (document.body.classList.contains('menu-open')) setMenu(false, true);
    if (language?.open) {
      language.open = false;
      language.querySelector('summary')?.focus();
    }
  }
  if (event.key === 'Tab' && document.body.classList.contains('menu-open') && header) {
    const focusable = Array.from(
      header.querySelectorAll<HTMLElement>('a[href], button, summary'),
    ).filter((el) => el.getClientRects().length > 0 && !el.closest('[inert]'));
    const first = focusable[0],
      last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
});
document.addEventListener('click', (event) => {
  if (language && !language.contains(event.target as Node)) language.open = false;
});
const mobileQuery = matchMedia('(max-width: 760px)');
mobileQuery.addEventListener('change', (event) => {
  if (!event.matches) setMenu(false);
});
const updateHeader = () => header?.classList.toggle('scrolled', scrollY > 30);
addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const track = document.querySelector<HTMLElement>('#project-track');
const previous = document.querySelector<HTMLButtonElement>('[data-project-prev]');
const next = document.querySelector<HTMLButtonElement>('[data-project-next]');
const progress = document.querySelector<HTMLElement>('.project-progress span');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (track && previous && next) {
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    previous.disabled = track.scrollLeft < 3;
    next.disabled = track.scrollLeft > max - 3;
    if (progress) {
      const width = track.clientWidth / track.scrollWidth;
      progress.style.width = `${width * 100}%`;
      progress.style.transform = `translateX(${(track.scrollLeft / track.clientWidth) * 100}%)`;
    }
  };
  const slide = (direction: number) => {
    const card = track.querySelector<HTMLElement>('.project-card');
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.scrollBy({
      left: direction * ((card?.offsetWidth || 300) + gap),
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
  };
  previous.addEventListener('click', () => slide(-1));
  next.addEventListener('click', () => slide(1));
  track.addEventListener('scroll', update, { passive: true });
  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      slide(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  new ResizeObserver(update).observe(track);
  update();
}

gsap.registerPlugin(ScrollTrigger);
const media = gsap.matchMedia();
media.add('(prefers-reduced-motion: no-preference)', () => {
  if (document.querySelector('[data-hero]'))
    gsap.from('[data-hero]', {
      y: 25,
      opacity: 0,
      duration: 0.85,
      stagger: 0.09,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    });
  if (document.querySelector('.orbit-scene'))
    gsap.from('.orbit-scene', {
      opacity: 0,
      scale: 0.94,
      duration: 1.4,
      delay: 0.25,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
    });
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 28,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: el, start: 'top 94%', once: true },
    });
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
});
media.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
  const scene = document.querySelector<HTMLElement>('[data-orbit]');
  const center = document.querySelector<HTMLElement>('.orbit-center');
  if (!scene || !center) return;
  const xTo = gsap.quickTo(center, 'rotationY', { duration: 0.8, ease: 'power3.out' });
  const yTo = gsap.quickTo(center, 'rotationX', { duration: 0.8, ease: 'power3.out' });
  const move = (event: PointerEvent) => {
    const rect = scene.getBoundingClientRect();
    xTo(((event.clientX - rect.left - rect.width / 2) / rect.width) * 20);
    yTo((-(event.clientY - rect.top - rect.height / 2) / rect.height) * 20);
  };
  const reset = () => {
    xTo(0);
    yTo(0);
  };
  scene.addEventListener('pointermove', move);
  scene.addEventListener('pointerleave', reset);
  return () => {
    scene.removeEventListener('pointermove', move);
    scene.removeEventListener('pointerleave', reset);
  };
});
const scene = document.querySelector('.orbit-scene');
if (scene)
  new IntersectionObserver(([entry]) =>
    scene.classList.toggle('orbit-paused', !entry.isIntersecting),
  ).observe(scene);
