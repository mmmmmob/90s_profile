const sparkleContainer = document.createElement('div');
sparkleContainer.id = 'sparkle-container';
document.body.appendChild(sparkleContainer);

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    const size = Math.random() * 5 + 2; // Sparkle size between 2px and 7px
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`; // Animation duration between 2s and 5s
    sparkle.style.animationDelay = `${Math.random() * 2}s`; // Random delay for staggered effect
    
    sparkleContainer.appendChild(sparkle);
    
    sparkle.addEventListener('animationend', () => {
        sparkle.remove();
    });
}

setInterval(createSparkle, 500);