document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('.row');

  rows.forEach((row) => {
    const current = Number(row.dataset.current || 0);
    const goal = Number(row.dataset.goal || 0);

    let percent = 0;
    if (goal > 0) {
      percent = (current / goal) * 100;
    }

    percent = Math.max(0, Math.min(percent, 100));

    const rounded = Math.round(percent);
    const fill = row.querySelector('.fill');
    const percentLabel = row.querySelector('.percent');

    if (fill) {
      fill.style.width = `${percent}%`;
    }

    if (percentLabel) {
      percentLabel.textContent = `${rounded}%`;
    }
  });
});
