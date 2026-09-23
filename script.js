const button = document.querySelector('.menu-button');
const mobileNav = document.querySelector('#mobile-nav');
button?.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!open));
  mobileNav.hidden = open;
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  button.setAttribute('aria-expanded','false');
  mobileNav.hidden = true;
}));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: .12 });

document.querySelectorAll('.project, .capability-list article, .studio-panel, .stack-panel').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .55s ease, transform .55s ease, border-color .25s';
  io.observe(el);
});

const style = document.createElement('style');
style.textContent = `.is-visible{opacity:1!important;transform:none!important}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}.project,.capability-list article,.studio-panel,.stack-panel{opacity:1!important;transform:none!important;transition:none!important}}`;
document.head.appendChild(style);

const inquiryModal = document.querySelector('#inquiry-modal');
const inquiryDialog = inquiryModal?.querySelector('.inquiry-dialog');
const inquiryForm = document.querySelector('#project-inquiry-form');
const inquirySuccess = document.querySelector('#inquiry-success');
const formStatus = document.querySelector('#form-status');
let lastFocused = null;

function openInquiry() {
  if (!inquiryModal) return;
  lastFocused = document.activeElement;
  inquiryModal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => inquiryDialog?.querySelector('input,select,textarea,button')?.focus());
}
function closeInquiry() {
  if (!inquiryModal) return;
  inquiryModal.hidden = true;
  document.body.classList.remove('modal-open');
  lastFocused?.focus?.();
}
document.querySelectorAll('[data-open-inquiry]').forEach(el => el.addEventListener('click', openInquiry));
document.querySelectorAll('[data-close-inquiry]').forEach(el => el.addEventListener('click', closeInquiry));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && inquiryModal && !inquiryModal.hidden) closeInquiry(); });

inquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  const submit = inquiryForm.querySelector('button[type="submit"]');
  submit.disabled = true;
  formStatus.textContent = 'Sending…';
  try {
    const payload = Object.fromEntries(new FormData(inquiryForm).entries());
    const response = await fetch('https://formsubmit.co/ajax/devgupta9@outlook.in', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Submission failed');
    inquiryForm.hidden = true;
    inquirySuccess.hidden = false;
    formStatus.textContent = '';
  } catch (error) {
    formStatus.textContent = 'Could not send right now. Please try again or email devgupta9@outlook.in.';
  } finally {
    submit.disabled = false;
  }
});
