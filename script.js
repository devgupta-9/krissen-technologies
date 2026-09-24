const googleFonts = document.querySelector('#google-fonts');
if (googleFonts) googleFonts.media = 'all';

const previewStyles = document.createElement('link');
previewStyles.rel = 'stylesheet';
previewStyles.href = 'project-previews.css';
document.head.appendChild(previewStyles);

// Keep the filed word mark visually attached to KRISSEN only.
const headerBrand = document.querySelector('.brand > span:last-child');
if (headerBrand) {
  headerBrand.innerHTML = '<span class="brand-krissen">KRISSEN<sup class="brand-tm" aria-hidden="true">™</sup></span><em>TECHNOLOGIES</em>';
}

const previewProjects = [
  {
    selector: '.banic-visual',
    name: 'House of Banic',
    domain: 'houseofbanic.com',
    url: 'https://houseofbanic.com',
    caption: 'Premium fragrance commerce',
    mode: 'featured'
  },
  {
    selector: '.ops-visual',
    name: 'SuviOps',
    domain: 'suviops-admin.pages.dev',
    url: 'https://suviops-admin.pages.dev/',
    caption: 'Operations platform',
    mode: 'compact'
  },
  {
    selector: '.hydro-visual',
    name: 'Tato-I 186 MW HEP',
    domain: 'tato-1-186mw-hep.pages.dev',
    url: 'https://tato-1-186mw-hep.pages.dev/',
    caption: 'Infrastructure project web',
    mode: 'compact'
  }
];

previewProjects.forEach(project => {
  const placeholder = document.querySelector(project.selector);
  if (!placeholder) return;

  const preview = document.createElement('a');
  preview.className = `live-site-preview live-site-preview--${project.mode}`;
  preview.href = project.url;
  preview.target = '_blank';
  preview.rel = 'noopener';
  preview.setAttribute('aria-label', `Open ${project.name} live website`);

  // Capture a true desktop-width page, then scale it proportionally to the
  // existing preview stage. No cover-cropping or enlargement is applied.
  const screenshotUrl = `https://image.thum.io/get/fullpage/width/1440/allowJPG/noanimate/${project.url}`;
  preview.innerHTML = `
    <div class="live-preview-chrome" aria-hidden="true">
      <span class="live-preview-dots"><i></i><i></i><i></i></span>
      <span class="live-preview-address">${project.domain}</span>
      <span class="live-preview-status">LIVE SITE</span>
    </div>
    <div class="live-preview-stage">
      <img src="${screenshotUrl}" alt="${project.name} full desktop landing page preview" loading="lazy" decoding="async" fetchpriority="low" />
    </div>
    <div class="live-preview-caption" aria-hidden="true">
      <strong>${project.name}</strong>
      <span>${project.caption}</span>
    </div>`;

  placeholder.replaceWith(preview);
});

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
  if (mobileNav && !mobileNav.hidden) {
    mobileNav.hidden = true;
    button?.setAttribute('aria-expanded', 'false');
  }
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
