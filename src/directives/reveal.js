// v-reveal: fades an element in when it scrolls into view.
// v-reveal.children: same, but for each direct child, one after the other.
// The value is an optional delay (ms) before the first element shows up.

const STAGGER = 70;

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target;
            el.classList.add('is-visible');
            observer.unobserve(el);
            // Once shown, drop the classes so the element's own transitions (hover etc.) work again
            const delay = parseInt(el.style.getPropertyValue('--reveal-delay')) || 0;
            setTimeout(() => el.classList.remove('reveal', 'is-visible'), delay + 550);
          }
        },
        { rootMargin: '0px 0px -40px 0px' },
      )
    : null;

function prepare(el, delay) {
  if (!observer) return;
  el.classList.add('reveal');
  el.style.setProperty('--reveal-delay', `${delay}ms`);
  observer.observe(el);
}

export default {
  mounted(el, binding) {
    const delay = Number(binding.value) || 0;
    if (binding.modifiers.children) {
      // Cap the stagger so long lists don't take forever to appear
      [...el.children].forEach((child, i) => prepare(child, delay + Math.min(i, 8) * STAGGER));
    } else {
      prepare(el, delay);
    }
  },
  unmounted(el, binding) {
    if (!observer) return;
    const targets = binding.modifiers.children ? [...el.children] : [el];
    targets.forEach((t) => observer.unobserve(t));
  },
};
