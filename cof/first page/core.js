const finalMessage =
  'A best friend is the one who makes your problems feel smaller and your happiness feel bigger.';
const card = document.querySelector('.card');
const cardContent = document.querySelector('.card-content');
const openBtn = document.getElementById('openBtn');
const focusOverlay = document.querySelector('.focus-overlay');
const sparkLayer = document.getElementById('reveal-spark');
let letterOpened = false;

// Initial Load Animations
window.addEventListener('load', () => {
  createParticles();
  setTimeout(() => card.classList.add('show'), 1000);
  setTimeout(() => openBtn.classList.add('show'), 2000);
});

// The Button Click Event
openBtn.addEventListener('click', () => {
  if (letterOpened) return;
  letterOpened = true;

  openBtn.classList.add('clicked');
  focusOverlay.classList.add('active');
  card.classList.add('letter-open');

  document.getElementById('old-text').classList.add('hide-old-text');

  createRevealSpark();

  const msgBox = document.getElementById('typewriter');
  if (msgBox) {
    msgBox.innerHTML = finalMessage;
    cardContent.classList.add('revealed');

    // --- ADD THIS BLOCK HERE ---
    // The number 6000 means "6 seconds" (6000 milliseconds)
    // You can change this number to make it faster or slower
    setTimeout(() => {
      document.body.classList.add('transitioning'); // Fades the page to black
      setTimeout(() => {
        window.location.href = '../second page/whome.html'; // Then moves to the new page
      }, 4000); // Waits for the 2-second fade to finish
    }, 6500); // Total message display time
    // ---------------------------
  }
});

// Cinematics & Particles
function createRevealSpark() {
  const burst = document.createElement('div');
  burst.className = 'light-burst';
  sparkLayer.appendChild(burst);
  for (let i = 0; i < 60; i++) {
    const spark = document.createElement('span');
    spark.className = 'spark';
    const angle = Math.random() * 360;
    const distance = Math.random() * 250 + 80;
    spark.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    spark.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
    spark.style.left = '50%';
    spark.style.top = '50%';
    sparkLayer.appendChild(spark);
    setTimeout(() => spark.remove(), 1200);
  }
  setTimeout(() => burst.remove(), 1500);
}

function createParticles() {
  const hLayer = document.getElementById('heart-layer');
  const bLayer = document.getElementById('bokeh-layer');
  for (let i = 0; i < 30; i++) {
    let h = document.createElement('div');
    h.className = 'heart';
    h.innerHTML = '❤';
    h.style.left = `${Math.random() * 100}%`;
    h.style.fontSize = `${Math.random() * 20 + 15}px`;
    h.style.animationDuration = `${Math.random() * 15 + 10}s`;
    h.style.animationDelay = `${Math.random() * 5}s`;
    hLayer.appendChild(h);

    let b = document.createElement('div');
    b.className = 'bokeh';
    let size = Math.random() * 40 + 15;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 100}%`;
    b.style.animationDuration = `${Math.random() * 20 + 10}s`;
    b.style.animationDelay = `${Math.random() * 5}s`;
    bLayer.appendChild(b);
  }
}
