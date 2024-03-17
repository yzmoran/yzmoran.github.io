document.addEventListener('click', function(e) {
    let clickEffect = document.getElementById('click-effect');
    let effect = document.createElement('div');
    effect.className = 'effect';
    effect.style.left = e.clientX - 10 + 'px';
    effect.style.top = e.clientY - 10 + 'px';
    clickEffect.appendChild(effect);
    setTimeout(function() {
        clickEffect.removeChild(effect);
    }, 500);
});