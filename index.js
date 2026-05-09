// const CX = 250;
// const CY =230;
// const SCALE = 11.5;
// const COUNT = 80;
// const CYCLE = 5000;
// const WINDOW = 0.32;

// function HeartXY(t) {
//     const x = SCALE * 16 * Math.pow(Math.sin(t),3);
//     const y = -SCALE *( 13 * Math.cos(t) - 5*Math.cos(2*t) - 2 * Math.cos(3 * t)
//         - Math.cos(4 * t));
//     return { x:CX+x, y:CY+y};
// }

// const labels =[
//     'We love you','Happy MothersDay','Siyaguthanda',
//     'We love you','Happy MothersDay','Siyaguthanda',
// ];

// const container = document.getElementById('heart-container');
// const nodes = [];

// for (let i = 0; i < COUNT; i++) {
//    const element = document.createElement('div');
//    element.className='word';
//    element.textContent= labels[i%labels.length];
//    container.appendChild(element);
//    nodes.push(element);
// }

// function waveDelay(i){
//     const t = (i/COUNT)*2*Math.PI
//     const {x} = HeartXY(t);

//     if (x<CX) {
//         return Math.max(0, Math.min(1,(t-Math.PI)/Math.PI))
//     }else{
//         return t/ Math.PI;
//     }
// }

// function tick(now) {
//    const phase = (now%CYCLE) /CYCLE ;

//    for (let i = 0; i < COUNT; i++) {
//     const element =nodes[i];
//     const t = (i/COUNT) * 2 * Math.PI;
//     const pt = HeartXY(t);
//     const delay = waveDelay(i)

//     // Postition
//     element.style.left = pt.x +'px'
//     element.style.top = pt.y +'py'

    
//   /* Colour — pink → magenta gradient around the heart */
//      const hue = 310 + (i / COUNT) * 50;
//      element.style.color      = `hsl(${hue}, 100%, 68%)`;
//      element.style.textShadow = `0 0 6px hsl(${hue}, 100%, 70%)`;

//     /* Opacity — smooth sine fade in/out around the wave front */
//      let diff = Math.abs(phase - delay);
//     if (diff > 0.5) diff = 1 - diff;          // wrap-around distance
//      const raw    = Math.max(0, 1 - diff / WINDOW);
//      const smooth = Math.sin(raw * Math.PI / 2); // ease curve

//      element.style.opacity = smooth.toFixed(3);
//    }
   
//       requestAnimationFrame(tick);
// }
//   requestAnimationFrame(tick);
    /* ── Config — tweak these to customise ── */
    const CX        = 250;      // horizontal centre of the container (px)
    const CY        = 230;      // vertical centre of the container (px)
    const SCALE     = 11.5;     // overall heart size
    const COUNT     = 80;       // number of words placed around the heart
    const CYCLE_MS  = 5000;     // time (ms) for one full wave rotation
    const WINDOW    = 0.32;     // fraction of the cycle each word stays lit
                                // (0 = razor-thin, 1 = all words always on)
 
    /* ── Parametric heart formula ──
         t runs 0 → 2π to trace the full heart.
         x = 16 sin³(t)
         y = 13cos(t) − 5cos(2t) − 2cos(3t) − cos(4t)   (negated so top is up) */
    function heartXY(t) {
      const x = SCALE * 16 * Math.pow(Math.sin(t), 3);
      const y = -SCALE * (
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        -     Math.cos(4 * t)
      );
      return { x: CX + x, y: CY + y };
    }
 
    /* ── Words that cycle around the heart ── */
    const labels = [
      'We love you', 'Happy Mothers day', "Siyaguthanda",
      'We love you', 'Happy Mothers day', "Siyaguthanda"
    ];
 
    /* ── Build DOM elements ── */
    const container = document.getElementById('heart-container');
    const nodes = [];
 
    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'word';
      el.textContent = labels[i % labels.length];
      container.appendChild(el);
      nodes.push(el);
    }
 
    /* ── Wave-delay per word ──
         Left side  (x < CX): wave travels bottom → top, progress 0 → 1
         Right side (x ≥ CX): wave travels bottom → top, progress 0 → 1
         This creates the mirrored rising effect on both sides. */
    function waveDelay(i) {
      const t = (i / COUNT) * 2 * Math.PI;
      const { x } = heartXY(t);
 
      if (x < CX) {
        // left half: t lives in [π, 2π]
        return Math.max(0, Math.min(1, (t - Math.PI) / Math.PI));
      } else {
        // right half: t lives in [0, π]
        return t / Math.PI;
      }
    }
 
    /* ── Animation loop ──
         Each frame we calculate how far the "wave front" has travelled
         (phase 0 → 1 over CYCLE_MS) and set each word's opacity based on
         how close its delay is to the current phase. */
  const colors = [
      '#0e0e0e', '#2a2a2a', '#444444', '#1a1a1a',
      '#333333', '#0e0e0e', '#222222', '#3a3a3a'
    ];
    function tick(now) {
      const phase = (now % CYCLE_MS) / CYCLE_MS;   // 0 → 1, repeating
 
      for (let i = 0; i < COUNT; i++) {
        const el    = nodes[i];
        const t     = (i / COUNT) * 2 * Math.PI;
        const pt    = heartXY(t);
        const delay = waveDelay(i);
 
        /* Position */
        el.style.left = pt.x + 'px';
        el.style.top  = pt.y + 'px';
 
        const color = colors[i % colors.length];
        el.style.color      = color;
        el.style.textShadow = `0 0 8px ${color}66`;
 
        /* Opacity — smooth sine fade in/out around the wave front */
        let diff = Math.abs(phase - delay);
        if (diff > 0.5) diff = 1 - diff;          // wrap-around distance
        const raw    = Math.max(0, 1 - diff / WINDOW);
        const smooth = Math.sin(raw * Math.PI / 2); // ease curve
 
        el.style.opacity = smooth.toFixed(3);
      }
 
      requestAnimationFrame(tick);
    }
 
    requestAnimationFrame(tick);