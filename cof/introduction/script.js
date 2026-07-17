document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Interactive Spotlight ---
  const spotlight = document.getElementById("spotlight");

  document.addEventListener("mousemove", (e) => {
    // Move the spotlight to follow the mouse smoothly
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });

  // --- 2. Magnetic Button Effect ---
  const btn = document.getElementById("continue-btn");
  const magneticArea = 50; // How far the mouse can be to trigger the pull

  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Move button slightly towards cursor
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  });

  btn.addEventListener("mouseleave", () => {
    // Reset position with smooth transition natively handled by CSS
    btn.style.transform = `translate(0px, 0px) scale(1)`;
  });

  // --- 3. Button Click Validation & Ripple ---
  btn.addEventListener("click", function (e) {
    const input = document.getElementById("name-input");

    // Ripple Effect Creation
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Validation & Redirect
    if (input.value.trim() === "") {
      // Shake effect for empty input
      input.style.transform = "translateX(-10px)";
      setTimeout(() => (input.style.transform = "translateX(10px)"), 100);
      setTimeout(() => (input.style.transform = "translateX(-10px)"), 200);
      setTimeout(() => (input.style.transform = "translateX(0)"), 300);
      input.focus();
    } else {
      // Elegant fade out before redirect
      document.body.style.transition = "opacity 0.8s ease";
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "../first page/main.html";
      }, 800);
    }
  });

  // --- 4. Advanced Particle Generator (Optimized for 60fps) ---
  const container = document.getElementById("particle-container");
  const particleCounts = {
    stars: 40,
    dust: 30,
    petals: 15,
    hearts: 5,
    butterflies: 3,
  };

  // Helper to generate random numbers
  const random = (min, max) => Math.random() * (max - min) + min;

  function createParticle(type) {
    const p = document.createElement("div");
    let size, duration, delay;

    if (type === "star") {
      p.classList.add("particle");
      size = random(1, 3);
      p.style.background = "rgba(255, 255, 255, 0.8)";
      p.style.boxShadow = `0 0 ${size * 2}px #fff`;
      duration = random(3, 8);
    } else if (type === "dust") {
      p.classList.add("particle");
      size = random(3, 8);
      p.style.background = "rgba(249, 212, 35, 0.4)"; // Champagne glow
      p.style.filter = "blur(2px)";
      duration = random(10, 20);
    } else if (type === "petal") {
      p.classList.add("particle");
      size = random(8, 15);
      p.style.background = "rgba(246, 166, 178, 0.6)"; // Rose pink
      p.style.borderRadius = "0 50% 50% 50%"; // Petal shape
      p.style.transform = `rotate(${random(0, 360)}deg)`;
      duration = random(8, 15);
    } else if (type === "heart") {
      p.innerHTML = "❤";
      p.style.position = "absolute";
      p.style.color = "rgba(251, 194, 235, 0.5)"; // Blush pink
      p.style.fontSize = `${random(10, 25)}px`;
      p.style.fontFamily = "Arial";
      duration = random(10, 15);
    } else if (type === "butterfly") {
      p.classList.add("butterfly");
      p.style.left = `${random(0, 80)}vw`;
      p.style.animationDelay = `${random(0, 10)}s`;
      container.appendChild(p);
      return; // Butterflies have specific CSS animations assigned
    }

    // Common positioning and animation setup using Web Animations API for better performance
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${random(0, 100)}vw`;
    p.style.top = `${random(-10, 100)}vh`;

    container.appendChild(p);

    // Animate drifting
    p.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 0 },
        { opacity: random(0.5, 1), offset: 0.2 },
        { opacity: random(0.5, 1), offset: 0.8 },
        {
          transform: `translate(${random(-100, 100)}px, ${random(-200, -50)}px) rotate(${random(180, 360)}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        delay: random(0, 5000),
        easing: "ease-in-out",
      },
    );
  }

  // Initialize all particles
  Object.keys(particleCounts).forEach((type) => {
    for (let i = 0; i < particleCounts[type]; i++) {
      createParticle(type);
    }
  });
});
