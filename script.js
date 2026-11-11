// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Floating gold sparks
(function () {
  const canvas = document.getElementById("sparks");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  let w, h, sparks;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(40, (w * h) / 20000));
    sparks = Array.from({ length: count }, () => make(true));
  }

  function make(anywhere) {
    return {
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() * 1.6 + 0.6,
      vy: Math.random() * 0.35 + 0.1,
      vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.6 + 0.3,
      t: Math.random() * Math.PI * 2,
    };
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const s of sparks) {
      s.y -= s.vy;
      s.x += s.vx + Math.sin(s.t) * 0.1;
      s.t += 0.02;
      if (s.y < -10) Object.assign(s, make(false));
      ctx.beginPath();
      ctx.fillStyle = `rgba(246, 210, 122, ${s.a * (0.6 + 0.4 * Math.sin(s.t * 2))})`;
      ctx.shadowColor = "rgba(233, 180, 76, 0.9)";
      ctx.shadowBlur = 8;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  frame();
})();
