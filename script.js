// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email} soon!`);
    
    // Reset form
    form.reset();
}

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(255,149,0,0.95), rgba(255,204,0,0.95))';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #ff9500, #ffcc00)';
        header.style.backdropFilter = 'none';
    }
});

// Add click handlers to navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Add animation on scroll for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and about items
    const animatedElements = document.querySelectorAll('.service-card, .about-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Create floating solar particles effect
    createSolarParticles();
    
    // Add hover effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(255, 149, 0, 0.4)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 20px rgba(255, 149, 0, 0.3)';
        });
    }
});

// Create floating particles effect
function createSolarParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = '☀️';
            particle.style.position = 'absolute';
            particle.style.fontSize = Math.random() * 20 + 10 + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.opacity = '0.3';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '0';
            
            hero.appendChild(particle);
            
            // Animate particle
            const animation = particle.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0.3 },
                { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0 }
            ], {
                duration: 15000 + Math.random() * 10000,
                easing: 'linear'
            });
            
            animation.onfinish = () => {
                particle.remove();
            };
        }, i * 3000);
    }
    
    // Repeat the effect
    setTimeout(createSolarParticles, 20000);
}

// Add energy savings calculator (simple version)
function calculateSavings() {
    const monthlyBill = prompt("Enter your average monthly electricity bill ($):");
    if (monthlyBill && !isNaN(monthlyBill)) {
        const annualSavings = monthlyBill * 12 * 0.7; // Assume 70% savings
        const twentyYearSavings = annualSavings * 20;
        alert(`Potential Savings:\nAnnual: $${annualSavings.toFixed(2)}\n20 Years: $${twentyYearSavings.toFixed(2)}`);
    }
}

// Expose calculator function globally
window.calculateSavings = calculateSavings;