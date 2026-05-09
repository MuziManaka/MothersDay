  // Each .member fades in as it enters the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
 
    document.querySelectorAll('.member').forEach(el => observer.observe(el));