// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Close menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded',
        hamburger.classList.contains('active').toString()
    );
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Section transition logic
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const currentActive = document.querySelector('.active-section');
        
        // Determine navigation direction
        const sections = Array.from(document.querySelectorAll('section'));
        const currentIndex = sections.indexOf(currentActive);
        const targetIndex = sections.indexOf(targetSection);
        const direction = targetIndex > currentIndex ? 'right' : 'left';
        
        if (currentActive) {
            // Add direction-based inactive class
            currentActive.classList.add(direction === 'right' ? 'inactive-left' : 'inactive-right');
            currentActive.classList.remove('active-section');
        }
        
        // Activate new section with direction
        targetSection.classList.remove('inactive-left', 'inactive-right');
        targetSection.classList.add('active-section');
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Activate initial section on load
document.querySelector('#home').classList.add('active-section');

// Update URL hash without scrolling
window.addEventListener('popstate', () => {
    const targetSection = document.querySelector(location.hash);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }
});

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Greeting feature
const greetingElement = document.createElement('div');
greetingElement.style.fontSize = "2rem";
greetingElement.style.textAlign = "center";
greetingElement.style.position = "absolute"; // Positioning it absolutely
greetingElement.style.right = "20px"; // Aligning to the right
greetingElement.style.top = "40px"; // Adjusting the top position
document.body.appendChild(greetingElement);

function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "";

    if (hour >= 5 && hour < 12) {
        greeting = "🌅 Good Morning!";
    } else if (hour >= 12 && hour < 18) {
        greeting = "☀️ Good Afternoon!";
    } else {
        greeting = "🌙 Good Evening!";
    }
    greetingElement.innerHTML = greeting;
}

function updateBackground() {
    const now = new Date();
    const hour = now.getHours();
    let backgroundColor;

    if (hour >= 5 && hour < 12) {
        backgroundColor = "#FFFAE3"; // Morning light
    } else if (hour >= 12 && hour < 18) {
        backgroundColor = "#FFD700"; // Afternoon gold
    } else {
        backgroundColor = "#2E3B4E"; // Evening dark
    }
    document.body.style.backgroundColor = backgroundColor;
}

updateGreeting();
updateBackground();
