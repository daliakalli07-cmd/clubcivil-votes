// Particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 50 },
    color: { value: "#00ffff" },
    shape: { type: "circle" },
    opacity: { value: 0.4 },
    size: { value: 3 },
    move: { speed: 2 },
    line_linked: { enable: true, color: "#00ffff", opacity: 0.2, width: 1 }
  }
});

// Stats
async function getStats() {
  const res = await fetch('/stats');
  return await res.json();
}

async function updateStats(source) {
  const res = await fetch('/stats', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ source })
  });
  const data = await res.json();
  if (data.success) return data.stats;
  else alert('Erreur : ' + data.message);
}

function displayStats(stats) {
  Object.entries(stats).forEach(([key, value]) => {
    const card = Array.from(document.querySelectorAll('.stat-card')).find(c => c.textContent.includes(key));
    if (card) {
      const span = card.querySelector('span');
      span.textContent = value;
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const stats = await getStats();
  displayStats(stats);

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const source = btn.dataset.source;
      const newStats = await updateStats(source);
      if (newStats) displayStats(newStats);
    });
  });
});
