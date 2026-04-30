const playBtn = document.getElementById('play-btn');
const ipDisplay = document.getElementById('ip-display');

document.addEventListener('DOMContentLoaded', () => {
  try {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof Element) {
            const animation = entry.target.dataset.animate;
            entry.target.classList.add(
              'animate__animated',
              `animate__${animation}`
            );
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  } catch (error) {
    console.log(`Ошибка с анимациями: ${error}`);
  }
});

playBtn.addEventListener('click', function () {
  navigator.clipboard
    .writeText('mc.novatime.pp.ua')
    .then(() => {
      ipDisplay.classList.add('show');
      setTimeout(() => ipDisplay.classList.remove('show'), 1500);
    })
    .catch(() => {
      const tempInput = document.createElement('input');
      tempInput.value = 'mc.novatime.pp.ua';
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      ipDisplay.classList.add('show');
      setTimeout(() => ipDisplay.classList.remove('show'), 1500);
    });
});

const rulesLink = document.getElementById('rules-link');
const launcherLink = document.getElementById('launcher-link');
const donateNavLink = document.getElementById('donate-nav-link');

function handleLinkClick(e, link) {
  e.preventDefault();
  link.classList.add('loading');
  setTimeout(() => {
    window.location.href = link.href;
  }, 800);
}

if (rulesLink)
  rulesLink.addEventListener('click', e => handleLinkClick(e, rulesLink));
if (launcherLink)
  launcherLink.addEventListener('click', e => handleLinkClick(e, launcherLink));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || !targetId.trim()) return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const serverTitle = document.querySelector('.server-title');
    if (serverTitle) serverTitle.classList.add('animate__pulse');
  }, 1000);

  const video = document.querySelector('.video-background');
  if (video) video.volume = 1.0;
});

const offerModal = document.getElementById('offer-modal');
const donateModal = document.getElementById('donate-modal');
const offerLink = document.getElementById('offer-link');
const donateLink = document.getElementById('donate-link');
const offerClose = document.getElementById('offer-close');
const donateClose = document.getElementById('donate-close');

function toggleModal(modal, show) {
  if (!modal) return;
  if (show) {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }, 10);
  } else {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

if (offerLink)
  offerLink.addEventListener('click', e => {
    e.preventDefault();
    toggleModal(offerModal, true);
  });

if (donateLink)
  donateLink.addEventListener('click', e => {
    e.preventDefault();
    toggleModal(donateModal, true);
  });

if (donateNavLink)
  donateNavLink.addEventListener('click', e => {
    e.preventDefault();
    toggleModal(donateModal, true);
  });

if (offerClose)
  offerClose.addEventListener('click', () => toggleModal(offerModal, false));
if (donateClose)
  donateClose.addEventListener('click', () => toggleModal(donateModal, false));

window.addEventListener('click', e => {
  if (e.target === offerModal) toggleModal(offerModal, false);
  if (e.target === donateModal) toggleModal(donateModal, false);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    toggleModal(offerModal, false);
    toggleModal(donateModal, false);
  }
});