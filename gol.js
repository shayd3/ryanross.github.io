(() => {
  const CELL_SIZE = 12;
  const TICK_INTERVAL = 150;
  const FILL_PROBABILITY = 0.08;
  const CELL_COLOR = '34, 211, 238';
  const CELL_OPACITY = 0.08;
  const STAGNATION_LIMIT = 20;

  const canvas = document.getElementById('gol-canvas');
  const ctx = canvas.getContext('2d');

  let cols, rows, current, next, lastCount, stagnantTicks, lastTick;

  function initGrid(oldGrid, oldCols, oldRows) {
    cols = Math.ceil(canvas.width / CELL_SIZE);
    rows = Math.ceil(canvas.height / CELL_SIZE);
    current = new Uint8Array(cols * rows);
    next = new Uint8Array(cols * rows);

    if (oldGrid && oldCols && oldRows) {
      // Copy existing state into new grid
      const copyC = Math.min(cols, oldCols);
      const copyR = Math.min(rows, oldRows);
      for (let y = 0; y < copyR; y++) {
        for (let x = 0; x < copyC; x++) {
          current[y * cols + x] = oldGrid[y * oldCols + x];
        }
      }
      // Fill newly exposed cells with random state
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (x >= oldCols || y >= oldRows) {
            current[y * cols + x] = Math.random() < FILL_PROBABILITY ? 1 : 0;
          }
        }
      }
    } else {
      seed();
    }

    lastCount = -1;
    stagnantTicks = 0;
  }

  function seed() {
    for (let i = 0; i < current.length; i++) {
      current[i] = Math.random() < FILL_PROBABILITY ? 1 : 0;
    }
  }

  function tick() {
    let liveCount = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Toroidal neighbor count
        let neighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = (x + dx + cols) % cols;
            const ny = (y + dy + rows) % rows;
            neighbors += current[ny * cols + nx];
          }
        }
        const idx = y * cols + x;
        const alive = current[idx];
        next[idx] = (alive && (neighbors === 2 || neighbors === 3)) || (!alive && neighbors === 3) ? 1 : 0;
        liveCount += next[idx];
      }
    }

    // Swap buffers
    const tmp = current;
    current = next;
    next = tmp;

    // Stagnation detection
    if (liveCount === lastCount || liveCount === 0) {
      stagnantTicks++;
      if (stagnantTicks >= STAGNATION_LIMIT) {
        seed();
        stagnantTicks = 0;
      }
    } else {
      stagnantTicks = 0;
    }
    lastCount = liveCount;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgba(${CELL_COLOR}, ${CELL_OPACITY})`;
    const size = CELL_SIZE - 1;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (current[y * cols + x]) {
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, size, size);
        }
      }
    }
  }

  function resize() {
    const oldGrid = current;
    const oldCols = cols;
    const oldRows = rows;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initGrid(oldGrid, oldCols, oldRows);
    draw();
  }

  function loop(timestamp) {
    requestAnimationFrame(loop);
    if (timestamp - lastTick < TICK_INTERVAL) return;
    lastTick = timestamp;
    tick();
    draw();
  }

  // Setup
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initGrid();
  lastTick = 0;
  draw();
  requestAnimationFrame(loop);

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
})();
