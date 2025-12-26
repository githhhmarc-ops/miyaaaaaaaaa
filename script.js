// variable para el objetivo del temporizador (en milisegundos)
let countdownTarget = null;

// Crear copos de nieve
function createSnowflakes() {
  const snowflakesContainer = document.querySelector(".snowflakes");
  const snowflakeCount = 50;

  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.innerHTML = "❄";

    // Posición aleatoria
    const startLeft = Math.random() * 100;
    const animationDuration = 10 + Math.random() * 20;
    const animationDelay = Math.random() * 5;
    const opacity = 0.5 + Math.random() * 0.5;

    // Estilos para cada copo de nieve
    snowflake.style.left = `${startLeft}vw`;
    snowflake.style.fontSize = `${0.5 + Math.random() * 1.5}em`;
    snowflake.style.opacity = opacity;
    snowflake.style.animation = `fall ${animationDuration}s linear ${animationDelay}s infinite`;

    // Añadir estilo de caída
    const style = document.createElement("style");
    style.textContent = `
            @keyframes fall {
                0% {
                    transform: translateY(-10vh) rotate(0deg);
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `;
    document.head.appendChild(style);

    snowflakesContainer.appendChild(snowflake);
  }
}

// Cuenta regresiva
function updateCountdown() {
  // Usar el objetivo establecido (persistido en localStorage si existe)
  const targetDate =
    countdownTarget ??
    (() => {
      // fallback por si no hay target (muy improbable si inicializamos correctamente)
      return new Date("December 25, 2024 00:00:00").getTime();
    })();

  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  // Si ya pasó la fecha, mostramos ceros y mostramos el botón para abrir el regalo
  if (timeLeft <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    const openBtn = document.getElementById("openGiftBtn");
    if (openBtn) openBtn.style.display = "inline-flex";
    return;
  }

  // Calcular días, horas, minutos y segundos
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Actualizar elementos HTML
  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

// Mostrar sorpresa al hacer clic en el botón
function showSurprise() {
  const surpriseContainer = document.getElementById("surpriseContainer");
  const openGiftBtn = document.getElementById("openGiftBtn");
  const countdownContainer = document.querySelector(".countdown-container");
  const introMessage = document.querySelector(".intro-message");

  // limpiar el objetivo guardado para que el temporizador no "permanezca" después de abrir
  try {
    localStorage.removeItem("countdownTarget");
  } catch (e) {
    /* ignore */
  }

  // Ocultar elementos iniciales
  openGiftBtn.style.display = "none";
  countdownContainer.style.display = "none";
  introMessage.style.display = "none";

  // Mostrar sorpresa con animación
  surpriseContainer.style.display = "block";

  // Crear corazones animados
  createHearts();

  // Cambiar título de la página
  document.querySelector("h1").textContent = "¡Tu Regalo Especial!";

  // Animación de confeti
  launchConfetti();
}

// Crear corazones flotantes
function createHearts() {
  const heartsContainer = document.getElementById("heartsContainer");
  const heartCount = 30;

  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "❤";

      // Posición aleatoria
      const leftPos = Math.random() * 100;
      const animationDelay = Math.random() * 2;
      const fontSize = 20 + Math.random() * 30;

      heart.style.left = `${leftPos}%`;
      heart.style.fontSize = `${fontSize}px`;
      heart.style.animationDelay = `${animationDelay}s`;

      heartsContainer.appendChild(heart);

      // Eliminar corazón después de la animación
      setTimeout(() => {
        heart.remove();
      }, 4000);
    }, i * 200);
  }
}

// Efecto de confeti
function launchConfetti() {
  const confettiCount = 150;
  const container = document.querySelector(".container");

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.innerHTML = ["❄", "✨", "⭐", "🎄", "🎁"][
        Math.floor(Math.random() * 5)
      ];

      // Estilos del confeti
      const colors = ["#ffcc5c", "#ff6b6b", "#4ecdc4", "#95e1d3", "#ff9999"];
      confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.position = "absolute";
      confetti.style.fontSize = `${15 + Math.random() * 20}px`;
      confetti.style.top = "0";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.opacity = "0.9";
      confetti.style.zIndex = "1";
      confetti.style.pointerEvents = "none";

      // Animación del confeti
      const animationDuration = 3 + Math.random() * 2;
      const animationDelay = Math.random() * 0.5;

      confetti.style.animation = `confettiFall ${animationDuration}s ease-out ${animationDelay}s forwards`;

      // Añadir estilo de animación si no existe
      if (!document.getElementById("confettiStyle")) {
        const style = document.createElement("style");
        style.id = "confettiStyle";
        style.textContent = `
                    @keyframes confettiFall {
                        0% {
                            transform: translateY(-100px) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(360deg);
                            opacity: 0;
                        }
                    }
                `;
        document.head.appendChild(style);
      }

      container.appendChild(confetti);

      // Eliminar confeti después de la animación
      setTimeout(() => {
        confetti.remove();
      }, (animationDuration + animationDelay) * 1000);
    }, i * 30);
  }
}

// Reemplazar la imagen con tu foto de la flor
function replaceFlowerImage() {
  // Asegúrate de que el archivo "flor.jpeg" esté en la misma carpeta que index.html
  const img = document.getElementById("flowerImage");
  if (!img) return; // evita errores si el elemento no existe
  img.src = "flor.jpeg";

  // También puedes personalizar el mensaje
  // document.getElementById('specialMessage').textContent = "TU_MENSAJE_PERSONALIZADO_AQUI";
}

// Inicializar
document.addEventListener("DOMContentLoaded", function () {
  // leer objetivo guardado en localStorage (si existe y no expiró), si no -> crear nuevo de 30 minutos
  try {
    const stored = localStorage.getItem("countdownTarget");
    if (stored) {
      const ts = parseInt(stored, 10);
      if (!isNaN(ts) && ts > Date.now()) {
        countdownTarget = ts;
      } else {
        countdownTarget = Date.now() + 30 * 60 * 1000;
        localStorage.setItem("countdownTarget", String(countdownTarget));
      }
    } else {
      countdownTarget = Date.now() + 30 * 60 * 1000;
      localStorage.setItem("countdownTarget", String(countdownTarget));
    }
  } catch (e) {
    // si localStorage no está disponible, caer en el comportamiento por defecto (se reiniciará al recargar)
    countdownTarget = Date.now() + 30 * 60 * 1000;
  }

  createSnowflakes();
  updateCountdown();
  replaceFlowerImage();

  // Actualizar cuenta regresiva cada segundo
  setInterval(updateCountdown, 1000);

  // Evento para el botón de abrir regalo
  document
    .getElementById("openGiftBtn")
    .addEventListener("click", showSurprise);
});
