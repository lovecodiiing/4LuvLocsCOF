document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Cinematic Typewriter Effect ---
  const quoteText = "The real ones are rare, but their loyalty is forever.";
  const quoteEl = document.getElementById("quote-text");
  let charIndex = 0;

  function typeWriter() {
    if (quoteEl && charIndex < quoteText.length) {
      quoteEl.innerHTML += quoteText.charAt(charIndex);
      charIndex++;
      // Randomized delay for realistic typing cadence
      const delay = Math.random() * 40 + 30;
      setTimeout(typeWriter, delay);
    }
  }
  // Delay start to sync with card entrance animation
  setTimeout(typeWriter, 2000);

  // --- 2. 3D Glass Card Tilt & Inner Glow (Mouse tracking) ---
  const card =
    document.getElementById("card") || document.getElementById("glass-card"); // Checks for both possible IDs
  const cardGlow = document.querySelector(".card-glow");

  document.addEventListener("mousemove", (e) => {
    // Only apply 3D tilt if the screen is large enough (not mobile) and elements exist
    if (window.innerWidth > 768 && card) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 40;

      // Limit the tilt angle to keep it looking realistic/luxurious
      const boundedX = Math.min(Math.max(xAxis, -15), 15);
      const boundedY = Math.min(Math.max(yAxis, -15), 15);

      card.style.transform = `rotateY(${boundedX}deg) rotateX(${boundedY}deg)`;

      // Inner lighting effect tracking cursor
      if (cardGlow) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardGlow.style.opacity = "1";
        cardGlow.style.left = `${x}px`;
        cardGlow.style.top = `${y}px`;
      }
    }
  });

  document.addEventListener("mouseleave", () => {
    if (card) {
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
    if (cardGlow) {
      cardGlow.style.opacity = "0";
    }
  });

  // --- 3. Ambient Background Parallax & Particle Engine ---
  const parallaxLayers = document.querySelectorAll(".layer-parallax");

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX - window.innerWidth / 2;
    const mouseY = e.clientY - window.innerHeight / 2;

    parallaxLayers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute("data-depth") || 1);
      const moveX = mouseX * depth * -0.05;
      const moveY = mouseY * depth * -0.05;
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // Generate Background Ambience Programmatically
  const particlesLayer = document.getElementById("particles-layer");
  const floatingLayer = document.getElementById("floating-elements-layer");
  const palette = ["#fce4ec", "#f3e5f5", "#c5838e", "#f7e7ce", "#ffffff"];
  const shapes = ["♥", "✦", "✨", "•", "✧"];

  function createAmbientParticles(amount, container, isForeground) {
    if (!container) return; // Safety check in case the container isn't in your HTML yet

    for (let i = 0; i < amount; i++) {
      const p = document.createElement("div");
      p.className = "programmatic-particle";

      // Random attributes
      const text = shapes[Math.floor(Math.random() * shapes.length)];
      const color = palette[Math.floor(Math.random() * palette.length)];
      const size = Math.random() * (isForeground ? 12 : 6) + 4;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * -20;

      p.innerText = text;
      p.style.color = color;
      p.style.fontSize = `${size}px`;
      p.style.left = `${posX}vw`;
      p.style.top = `${posY}vh`;
      p.style.opacity = Math.random() * 0.4 + 0.1;

      // Inline styles to ensure they float correctly without needing extra CSS
      p.style.position = "absolute";
      p.style.pointerEvents = "none";
      p.style.zIndex = isForeground ? "5" : "1";

      // Text shadow for glow effect
      if (isForeground) p.style.textShadow = `0 0 10px ${color}`;

      // Unique floating trajectory using Web Animations API
      p.animate(
        [
          { transform: `translate(0, 0) rotate(0deg)` },
          {
            transform: `translate(${Math.random() * 100 - 50}px, -${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg)`,
          },
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
        },
      );

      container.appendChild(p);
    }
  }

  createAmbientParticles(40, particlesLayer, false);
  createAmbientParticles(15, floatingLayer, true);

  // --- 4. Cursor Sparkle Trail Engine ---
  const trailContainer = document.getElementById("cursor-trail");
  let lastTime = 0;

  document.addEventListener("mousemove", (e) => {
    if (!trailContainer) return; // Safety check

    const now = Date.now();
    if (now - lastTime < 30) return; // Throttle trail creation for performance
    lastTime = now;

    const sparkle = document.createElement("div");
    sparkle.className = "sparkle-trail";

    // Inline styling for the trail dots
    sparkle.style.position = "absolute";
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    sparkle.style.backgroundColor = "var(--rose-gold, #b76e79)";
    sparkle.style.borderRadius = "50%";
    sparkle.style.pointerEvents = "none";
    sparkle.style.transform = "translate(-50%, -50%)";

    const size = Math.random() * 4 + 2;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    trailContainer.appendChild(sparkle);

    // Smooth fade out using JS Animations
    sparkle.animate(
      [
        { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        { opacity: 0, transform: "translate(-50%, -50%) scale(0)" },
      ],
      {
        duration: 600,
        easing: "ease-out",
        fill: "forwards",
      },
    );

    setTimeout(() => sparkle.remove(), 600);
  });

  // --- 5. Celebration Sequence Logic & Nickname Check ---
  const btn = document.getElementById("day-ones-btn");
  const input = document.getElementById("nickname-input");
  const badgeContainer = document.getElementById("badge-container");
  const badgeName = document.getElementById("badge-name");

  // The official list of approved nicknames
  const allowedNicknames = ["locs", "bal", "jol", "locco", "amari"];

  if (btn && input) {
    btn.addEventListener("click", () => {
      const userInput = input.value.trim().toLowerCase(); // Normalizes input to lowercase

      // 1. Check if the input is NOT in our allowed list (or if it's empty)
      if (!allowedNicknames.includes(userInput)) {
        // Error shake animation for wrong or empty input
        input.style.transform = "translateX(-10px)";
        input.style.borderColor = "#ff4d4d";

        setTimeout(() => (input.style.transform = "translateX(10px)"), 100);
        setTimeout(() => (input.style.transform = "translateX(-10px)"), 200);
        setTimeout(() => {
          input.style.transform = "translateX(0)";
          input.style.borderColor = ""; // Resets to default CSS
        }, 300);
        return; // Stop the script here so it doesn't run the celebration
      }

      // 2. SUCCESS: Populate and reveal badge (if you have these elements in HTML)
      if (badgeName && badgeContainer) {
        badgeName.innerText = userInput;
        badgeContainer.classList.add("show");
      }

      // Hide main card smoothly
      if (card) {
        card.style.transition =
          "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        card.style.transform = "translateY(50px) scale(0.9) rotateX(-10deg)";
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
      }

      // Trigger the burst animation
      triggerCelebrationBurst(window.innerWidth / 2, window.innerHeight / 2);

      // 3. REDIRECT TO NEXT PAGE
      // We use setTimeout to wait 3 seconds (3000ms) so the user can enjoy the animation first
      setTimeout(() => {
        // Replace 'nextpage.html' with the actual file name of your second page
        window.location.href = "../third page/heart.html";
      }, 3000);
    });
  }

  // Programmatic Confetti / Hearts Burst (Fires on correct nickname)
  function triggerCelebrationBurst(originX, originY) {
    const burstCount = 60;

    for (let i = 0; i < burstCount; i++) {
      const particle = document.createElement("div");
      particle.className = "programmatic-particle";

      // Mix of hearts and sparkles
      particle.innerText = Math.random() > 0.5 ? "♥" : "✨";
      particle.style.color =
        palette[Math.floor(Math.random() * palette.length)];
      particle.style.fontSize = `${Math.random() * 15 + 10}px`;

      // Inline styles for the explosion
      particle.style.position = "absolute";
      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "9999";

      document.body.appendChild(particle);

      // Calculate explosive physics trajectory
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 300 + 100;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 100; // Gravity bias upwards

      particle.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(0) rotate(0deg)",
            opacity: 1,
          },
          {
            transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(1.5) rotate(${Math.random() * 720}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 1000 + 800,
          easing: "cubic-bezier(0.1, 0.8, 0.3, 1)",
          fill: "forwards",
        },
      );

      // Cleanup DOM after animation
      setTimeout(() => particle.remove(), 2000);
    }
  }
});
