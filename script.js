document.addEventListener('DOMContentLoaded', () => {

    // --- INTERACTIVE GARDEN ---
    const interactiveGarden = document.getElementById('interactive-garden');
    const gardenElementsContainer = document.querySelector('.garden-elements');
    
    // EDIT THIS: Add your memories, compliments, or birthday wishes here.
    const messages = [
        "Simula pa nung first meetup, I really fell sa yapper side mo",
        "Ur pikit mata smile pag napapatitig ako sayo",
        "tapang mo at di ka nahihiya sa madaming bagay except for that tiktok repost XD",
        "Ur humor. i love it.",
        "ANGAS PARIN TALAGA KAHIT MALANDI",
        "mga iwas tingin mo ><",
        "surface level pa nakikita ko pero andami na",
        "very observative",
        "comforting words.",
        "quirky na medyo useful: memory mo",
        "bravely opens up IDOL",
        "roblox diss sa bisaya "
    ];
    
    // EDIT THIS: Add paths to the images you want to appear in the garden.
    const elementImages = ['images/leaf.png', 'images/flower1.png', 'images/flower2.png', 'images/firefly.png'];
    let messageIndex = 0;

    interactiveGarden.addEventListener('click', (event) => {
        const rect = interactiveGarden.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createGardenElement(x, y);
        createMessagePopup(x, y);
    });

    function createGardenElement(x, y) {
        const img = document.createElement('img');
        const randomImage = elementImages[Math.floor(Math.random() * elementImages.length)];
        
        img.src = randomImage;
        img.classList.add('garden-element');
        if (randomImage.includes('firefly')) {
            img.classList.add('firefly');
        }

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        gardenElementsContainer.appendChild(img);

        // THE CODE TO REMOVE THE IMAGE HAS BEEN DELETED FROM HERE.
        // The image will now stay permanently.
    }

    function createMessagePopup(x, y) {
        const popup = document.createElement('div');
        popup.classList.add('message-popup');
        popup.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;

        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        gardenElementsContainer.appendChild(popup);

        // This setTimeout remains, so the message will disappear after 3 seconds.
        setTimeout(() => {
            popup.style.opacity = '0';
            setTimeout(() => gardenElementsContainer.removeChild(popup), 500);
        }, 3000);
    }

    // --- SWIPE GALLERY SECTION ---
    // (This section remains unchanged)
    const galleryContainer = document.querySelector('.gallery-container');
    const slider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.gallery-slide');
    const dotsContainer = document.querySelector('.gallery-dots');
    let currentIndex = 0; let isDragging = false; let startPos = 0; let currentTranslate = 0; let prevTranslate = 0; let animationID = 0;
    slides.forEach((_, i) => { const dot = document.createElement('div'); dot.classList.add('dot'); if (i === 0) dot.classList.add('active'); dot.addEventListener('click', () => { currentIndex = i; goToSlide(); }); dotsContainer.appendChild(dot); });
    const dots = document.querySelectorAll('.dot');
    function updateDots() { dots.forEach(dot => dot.classList.remove('active')); dots[currentIndex].classList.add('active'); }
    galleryContainer.addEventListener('mousedown', dragStart); galleryContainer.addEventListener('touchstart', dragStart); galleryContainer.addEventListener('mouseup', dragEnd); galleryContainer.addEventListener('touchend', dragEnd); galleryContainer.addEventListener('mouseleave', dragEnd); galleryContainer.addEventListener('mousemove', drag); galleryContainer.addEventListener('touchmove', drag);
    function dragStart(event) { isDragging = true; startPos = getPositionX(event); animationID = requestAnimationFrame(animation); slider.style.transition = 'none'; }
    function drag(event) { if (isDragging) { const currentPosition = getPositionX(event); currentTranslate = prevTranslate + currentPosition - startPos; } }
    function dragEnd() { cancelAnimationFrame(animationID); isDragging = false; const movedBy = currentTranslate - prevTranslate; if (movedBy < -50 && currentIndex < slides.length - 1) currentIndex++; if (movedBy > 50 && currentIndex > 0) currentIndex--; goToSlide(); }
    function goToSlide() { slider.style.transition = 'transform 0.5s ease-in-out'; currentTranslate = currentIndex * -slider.clientWidth; prevTranslate = currentTranslate; setSliderPosition(); updateDots(); }
    function getPositionX(event) { return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX; }
    function animation() { setSliderPosition(); if (isDragging) requestAnimationFrame(animation); }
    function setSliderPosition() { slider.style.transform = `translateX(${currentTranslate}px)`; }


    // --- CONSTELLATION OF STRENGTHS ---
    // (This section remains unchanged)
    const stars = document.querySelectorAll('.star');
    const strengthDisplay = document.getElementById('strength-display');
    stars.forEach(star => { star.addEventListener('click', (event) => { event.stopPropagation(); if (star.classList.contains('active')) { return; } stars.forEach(s => s.classList.remove('active')); star.classList.add('active'); strengthDisplay.textContent = star.getAttribute('data-strength'); strengthDisplay.classList.add('visible'); }); });
    document.addEventListener('click', () => { stars.forEach(s => s.classList.remove('active')); strengthDisplay.classList.remove('visible'); });

    // --- IPAD ORIENTATION ---
    // (This section remains unchanged)
    const gardenContainer = document.getElementById('garden-container');
    function checkOrientation() { if (window.matchMedia("(min-width: 768px) and (orientation: landscape)").matches) { gardenContainer.classList.add('landscape'); } else { gardenContainer.classList.remove('landscape'); } }
    window.addEventListener('resize', checkOrientation);
    checkOrientation();

});