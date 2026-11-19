/* Catamaran Sim — optional rendering polish
 * Include near the end of catamaran_baie.html:
 *   <script src="visual-enhancements.js"></script>
 * This layer is deliberately defensive because the original game keeps its
 * Three.js renderer private inside game.js.
 */
(function () {
  'use strict';
  function boot() {
    var canvas = document.getElementById('gl');
    if (!canvas) return;

    // CSS color grading is inexpensive and also works on devices without WebGL
    // post-processing support.
    canvas.style.filter = 'saturate(1.08) contrast(1.04) brightness(1.02)';

    // Add a subtle, responsive vignette without affecting the 3D canvas.
    if (!document.getElementById('visual-vignette')) {
      var vignette = document.createElement('div');
      vignette.id = 'visual-vignette';
      vignette.setAttribute('aria-hidden', 'true');
      vignette.style.cssText = [
        'position:fixed', 'inset:0', 'pointer-events:none', 'z-index:4',
        'background:radial-gradient(ellipse at center, transparent 48%, rgba(0,8,16,.22) 100%)',
        'mix-blend-mode:multiply', 'opacity:.72'
      ].join(';');
      document.body.appendChild(vignette);
    }

    // Make the canvas responsive if the game has not initialized its resize
    // listener yet (useful when the page is opened from an embedded preview).
    var resize = function () {
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
