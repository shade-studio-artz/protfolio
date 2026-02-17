
// ==================== FADE UP SCROLL ANIMATION ====================
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');

    // Add visible class to home section immediately
    const homeSection = document.getElementById('home');
    if (homeSection) {
        setTimeout(() => {
            homeSection.classList.add('visible');
        }, 100);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections except home
    sections.forEach(section => {
        if (section.id !== 'home') {
            observer.observe(section);
        }
    });
});

// ==================== HOME BACKGROUND SLIDESHOW ====================
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.bg-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Start slideshow
    setInterval(nextSlide, 5000);

    // Initialize first slide
    slides[0].classList.add('active');
});

// ==================== NAVIGATION SCROLL SPY ====================
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('#navMenu');
    const scrollUpBtn = document.getElementById('scrollUp');

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll spy to highlight active section
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Show/hide scroll up button
        if (window.scrollY > 500) {
            scrollUpBtn.classList.add('visible');
        } else {
            scrollUpBtn.classList.remove('visible');
        }
    });

    // Scroll up button functionality
    scrollUpBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// ==================== TYPING ANIMATION ====================
const typingText = document.querySelector('.typing-text');
const titles = ['UI/UX Designer','Frontend Developer', 'Environment Designer', 'Graphic Designer', '3D Artist'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// ==================== UPDATED PROJECT POPUP FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    const popup = document.getElementById('projectPopup');
    const closePopup = document.getElementById('closePopup');
    const popupImage = document.getElementById('popupImage');
    const popupVideo = document.getElementById('popupVideo');
    const playVideoBtn = document.getElementById('playVideo');
    const pauseVideoBtn = document.getElementById('pauseVideo');
    const fullscreenBtn = document.getElementById('fullscreen');

    // Project data for popup
    const projects = {
        1: {
            title: "Mobile Banking App",
            category: "UI Design",
            image: "img/project/UI-1.png",
            video: "", // Add video URL if available
        },
        2: {
            title: "Mobile Betting App",
            category: "UI Design",
            image: "img/project/UI-2.png",
            video: "", // Add video URL if available
        },
        3: {
            title: "Food Delivery App",
            category: "UI Design",
            image: "img/project/UI-3.png",
            video: "", // Add video URL if available
        },
        4: {
            title: "SAAS Dashboard",
            category: "UI Design",
            image: "img/project/UI-4.png",
            video: "", // Add video URL if available
        },
        5: {
            title: "Burger Add",
            category: "Graphic Design",
            image: "img/project/burger.png",
            video: "", // Add video URL if available
        },
        6: {
            title: "Perfume Add",
            category: "Graphic Design",
            image: "img/project/perfume.png",
            video: "", // Add video URL if available
        },
    };

    // Open popup when project card is clicked
    projectCards.forEach(card => {
        card.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];

            if (project) {
                // Set popup content
                document.getElementById('popupTitle').textContent = project.title;
                document.getElementById('popupCategory').textContent = project.category;

                // Set image
                popupImage.src = project.image;
                popupImage.alt = project.title;

                // Show image, hide video by default
                popupImage.style.display = 'block';
                popupVideo.style.display = 'none';
                playVideoBtn.style.display = project.video ? 'inline-block' : 'none';
                pauseVideoBtn.style.display = 'none';

                // Open popup
                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close popup
    closePopup.addEventListener('click', function () {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Pause video if playing
        popupVideo.pause();
        playVideoBtn.style.display = 'inline-block';
        pauseVideoBtn.style.display = 'none';
    });

    // Close popup when clicking outside content
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Pause video if playing
            popupVideo.pause();
            playVideoBtn.style.display = 'inline-block';
            pauseVideoBtn.style.display = 'none';
        }
    });

    // Video controls
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', function () {
            const projectId = document.querySelector('.project-popup.active').getAttribute('data-project');
            const project = projects[projectId];

            if (project && project.video) {
                popupVideo.src = project.video;
                popupImage.style.display = 'none';
                popupVideo.style.display = 'block';
                popupVideo.play();
                playVideoBtn.style.display = 'none';
                pauseVideoBtn.style.display = 'inline-block';
            }
        });
    }

    if (pauseVideoBtn) {
        pauseVideoBtn.addEventListener('click', function () {
            popupVideo.pause();
            playVideoBtn.style.display = 'inline-block';
            pauseVideoBtn.style.display = 'none';
        });
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function () {
            const mediaContainer = document.querySelector('.popup-media');
            if (!document.fullscreenElement) {
                if (mediaContainer.requestFullscreen) {
                    mediaContainer.requestFullscreen();
                } else if (mediaContainer.webkitRequestFullscreen) {
                    mediaContainer.webkitRequestFullscreen();
                } else if (mediaContainer.msRequestFullscreen) {
                    mediaContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Pause video if playing
            popupVideo.pause();
            playVideoBtn.style.display = 'inline-block';
            pauseVideoBtn.style.display = 'none';
        }
    });
});

// ==================== UPDATED FORM SUBMISSION (Send to WhatsApp) ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Format the message for WhatsApp
        const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;

        // Phone number to send to (9677113333)
        const phoneNumber = '9677113333';

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

        submitBtn.textContent = 'Sending...';
        submitBtn.style.transform = 'scale(0.95)';

        setTimeout(() => {
            // Open WhatsApp with pre-filled message
            window.open(whatsappURL, '_blank');

            submitBtn.textContent = '✓ Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #2AFF6D, #00E676)';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.transform = 'scale(1)';
                submitBtn.style.background = '';
                this.reset();
            }, 2000);
        }, 1500);
    });
}

// ==================== UPDATED ROCKET GAME ====================
const canvas = document.getElementById('gameCanvas');
const gameCtx = canvas.getContext('2d');
const gameOver = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const gameStartOverlay = document.getElementById('game-start-overlay');
const startGameBtn = document.getElementById('startGameBtn');

let gameRunning = false;
let score = 0;
let animationId;

/* LOAD CHARACTER IMAGE */
const characterImg = new Image();
characterImg.src = 'img/head.png';

function resizeGameCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeGameCanvas();
window.addEventListener('resize', resizeGameCanvas);

/* PLAYER (FACE CHARACTER) */
const rocket = {
    x: 80,
    y: 0,
    width: 88,
    height: 88,
    velocity: 0,
    gravity: 0.08,
    jump: -3.2,

    draw() {
        gameCtx.save();
        gameCtx.shadowBlur = 15;
        gameCtx.shadowColor = 'rgba(42, 255, 109, 0.6)';

        gameCtx.drawImage(
            characterImg,
            this.x,
            this.y,
            this.width,
            this.height
        );

        gameCtx.restore();
    },

    update() {
        this.velocity += this.gravity;

        // Smooth falling limit
        if (this.velocity > 2.2) this.velocity = 2.2;

        this.y += this.velocity;

        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) {
            endGame();
        }
    }

};

/* OBSTACLES */
let obstacles = [];
const obstacleWidth = 40;
const obstacleGap = 230;
let frameCount = 0;

function createObstacle() {
    const minHeight = 50;
    const maxHeight = canvas.height - obstacleGap - 50;
    const height = Math.random() * (maxHeight - minHeight) + minHeight;

    obstacles.push({
        x: canvas.width,
        topHeight: height,
        bottomY: height + obstacleGap,
        width: obstacleWidth,
        speed: Math.min(2.4 + score * 0.05, 4),
        passed: false
    });
}

function drawObstacles() {
    obstacles.forEach(obs => {
        const topGradient = gameCtx.createLinearGradient(obs.x, 0, obs.x + obs.width, 0);
        topGradient.addColorStop(0, '#0F2A1D');
        topGradient.addColorStop(1, '#2A5F46');
        gameCtx.fillStyle = topGradient;
        gameCtx.fillRect(obs.x, 0, obs.width, obs.topHeight);

        const bottomGradient = gameCtx.createLinearGradient(obs.x, obs.bottomY, obs.x + obs.width, obs.bottomY);
        bottomGradient.addColorStop(0, '#0F2A1D');
        bottomGradient.addColorStop(1, '#2A5F46');
        gameCtx.fillStyle = bottomGradient;
        gameCtx.fillRect(obs.x, obs.bottomY, obs.width, canvas.height - obs.bottomY);

        gameCtx.strokeStyle = '#2AFF6D';
        gameCtx.lineWidth = 2;
        gameCtx.shadowBlur = 5;
        gameCtx.shadowColor = 'rgba(42, 255, 109, 0.3)';
        gameCtx.strokeRect(obs.x, 0, obs.width, obs.topHeight);
        gameCtx.strokeRect(obs.x, obs.bottomY, obs.width, canvas.height - obs.bottomY);
        gameCtx.shadowBlur = 0;
    });
}

function updateObstacles() {
    obstacles.forEach((obs, index) => {
        obs.x -= obs.speed;

        if (
            rocket.x < obs.x + obs.width &&
            rocket.x + rocket.width > obs.x &&
            (rocket.y < obs.topHeight || rocket.y + rocket.height > obs.bottomY)
        ) {
            endGame();
        }

        if (!obs.passed && obs.x + obs.width < rocket.x) {
            obs.passed = true;
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }

        if (obs.x + obs.width < 0) {
            obstacles.splice(index, 1);
        }
    });
}

/* BACKGROUND STARS */
let stars = [];
for (let i = 0; i < 50; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.5
    });
}

function drawStars() {
    stars.forEach(star => {
        gameCtx.fillStyle = `rgba(42, 255, 109, ${star.opacity * 0.5})`;
        gameCtx.shadowBlur = 3;
        gameCtx.shadowColor = 'rgba(42, 255, 109, 0.3)';
        gameCtx.beginPath();
        gameCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        gameCtx.fill();
        gameCtx.shadowBlur = 0;

        star.x -= star.speed;
        if (star.x < 0) {
            star.x = canvas.width;
            star.y = Math.random() * canvas.height;
        }
    });
}

/* GAME LOOP */
function gameLoop() {
    if (!gameRunning) return;

    gameCtx.fillStyle = '#0B0F0E';
    gameCtx.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();
    rocket.update();
    rocket.draw();

    frameCount++;
    if (frameCount % 90 === 0) createObstacle();

    drawObstacles();
    updateObstacles();

    animationId = requestAnimationFrame(gameLoop);
}

/* GAME CONTROL */
function startGame() {
    gameRunning = true;
    score = 0;
    obstacles = [];
    frameCount = 0;
    rocket.y = canvas.height / 2;
    rocket.velocity = 0;
    gameStartOverlay.classList.add('hidden');
    gameOver.classList.add('hidden');
    scoreDisplay.textContent = 'Score: 0';
    gameLoop();
}

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    finalScoreDisplay.textContent = score;
    gameOver.classList.remove('hidden');
}

function jump() {
    if (gameRunning) {
        rocket.velocity = rocket.jump; // direct jump (smooth)
    }
}


// Start game button
startGameBtn.addEventListener('click', startGame);

// Canvas click for jump
canvas.addEventListener('click', () => {
    if (!gameRunning && gameStartOverlay.classList.contains('hidden')) {
        startGame();
    } else if (gameRunning) {
        jump();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!gameRunning && gameStartOverlay.classList.contains('hidden')) {
            startGame();
        } else if (gameRunning) {
            jump();
        }
    }
});

restartBtn.addEventListener('click', function () {
    gameOver.classList.add('hidden');
    startGame();
});

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Prevent scroll issues on mobile
document.addEventListener('touchmove', (e) => {
    if (document.querySelector('#home')) {
        e.preventDefault();
    }
}, { passive: false });