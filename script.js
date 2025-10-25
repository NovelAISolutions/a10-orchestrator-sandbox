console.log("A10 Coder Verification Script Running ✅");

document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp
  const ts = new Date().toLocaleString();
  const tsEl = document.getElementById("timestamp");
  if (tsEl) tsEl.textContent = ts;

  // Animate header briefly for confirmation
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transition = "background 1s ease-in-out";
    setTimeout(() => {
      hero.style.background = "#4e5de6";
    }, 800);
  }

  // Inject confirmation content in main if needed
  const app = document.getElementById("app");
  if (app) {
    const extra = document.createElement("p");
    extra.textContent = "✔️ Verified at " + ts;
    extra.style.color = "#2c3e50";
    extra.style.fontWeight = "bold";
    app.appendChild(extra);
  }
});
