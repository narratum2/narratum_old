/**
 * Narratum.io - Enhanced Interactive JavaScript
 * Features interactive background, symbol interactions, and sound elements
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeLoader();
    initializeSignalParticles();
    initializeApp();
});

function initializeApp() {
    setTimeout(() => {
        initializeNavigation();
        initializeObservers();
        initializeParallax();
        initializeSymbolInteractions();
        initializeFormHandling();
        initializeAudioToggle();
        initializeColorMoodSwitcher();
        initializeInteractiveBackground();
        initializeLoyaltyJourney();
    }, 1000);
}

// Loading Screen
function initializeLoader() {
    const loader = document.querySelector('.loading-screen');
    
    if (loader) {
        // Simulate loading time for visual effect
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Navigation Dots
function initializeNavigation() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Click event for navigation dots
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = dot.getAttribute('data-section');
            const section = document.querySelector(`[data-section="${targetSection}"]`);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Scroll event to update active dot
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('data-section');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });
    });
}

// Intersection Observer for Animations
function initializeObservers() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Observer for capability blocks
    const capabilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
                // Add staggered animation delay
                const index = entry.target.getAttribute('data-index');
                entry.target.style.transitionDelay = `${(index - 1) * 0.2}s`;
            }
        });
    }, observerOptions);
    
    const capabilityBlocks = document.querySelectorAll('.capability-block');
    capabilityBlocks.forEach(block => {
        capabilityObserver.observe(block);
    });
    
    // Observer for journey nodes
    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
                // Add staggered animation delay
                const index = entry.target.getAttribute('data-node');
                entry.target.style.transitionDelay = `${(index - 1) * 0.3}s`;
            }
        });
    }, observerOptions);
    
    const journeyNodes = document.querySelectorAll('.journey-node');
    journeyNodes.forEach(node => {
        journeyObserver.observe(node);
    });
}

// Parallax Effect
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroArc = heroSection.querySelector('.section-arc');
            if (heroArc) {
                heroArc.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        }
        
        // Parallax for other section arcs
        const sectionArcs = document.querySelectorAll('.section-arc:not(.hero .section-arc)');
        sectionArcs.forEach(arc => {
            const section = arc.closest('.section');
            const sectionTop = section.offsetTop;
            const distanceFromTop = scrollY - sectionTop;
            
            if (arc.classList.contains('top')) {
                arc.style.transform = `translateY(${distanceFromTop * 0.2}px)`;
            } else if (arc.classList.contains('bottom')) {
                arc.style.transform = `translateY(${distanceFromTop * 0.1}px)`;
            }
        });
    });
}

// Symbol Interactions with Enhanced Magic
function initializeSymbolInteractions() {
    const symbols = document.querySelectorAll('.symbol-item');
    
    symbols.forEach(symbol => {
        symbol.addEventListener('click', function() {
            // Toggle active state
            const wasActive = this.classList.contains('active');
            
            // Close all other symbols
            symbols.forEach(s => s.classList.remove('active'));
            
            // Toggle current symbol
            if (!wasActive) {
                this.classList.add('active');
                
                // Add magical particle effect
                createMagicalParticles(this);
            }
        });
    });
    
    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.symbol-item') && !e.target.closest('.symbol-content')) {
            symbols.forEach(s => s.classList.remove('active'));
        }
    });
}

// Create magical particles for symbol interaction
function createMagicalParticles(symbolElement) {
    const rect = symbolElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('magical-particle');
        
        // Random position around the symbol
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 70;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Set particle properties
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = Math.random() > 0.5 ? 'var(--accent-gold)' : 'var(--accent-cyan)';
        particle.style.width = `${2 + Math.random() * 6}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.1 + Math.random() * 0.6;
        
        // Add to DOM
        document.body.appendChild(particle);
        
        // Animate and remove
        setTimeout(() => {
            particle.style.transform = `translate(${(Math.random() - 0.5) * 150}px, ${(Math.random() - 0.5) * 150}px) scale(0)`;
            particle.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(particle);
            }, 1500);
        }, 10);
    }
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="button-text">Sending...</span>';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Show success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="success-icon">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h3>Message Sent</h3>
                        <p>Thank you for reaching out. We'll be in touch soon.</p>
                    </div>
                `;
            }, 1500);
        });
    }
}

// Audio Toggle with Enhanced Sound
function initializeAudioToggle() {
    const audioToggle = document.querySelector('.audio-toggle');
    let audioContext;
    let masterGain;
    let oscillators = [];
    
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            const currentState = audioToggle.getAttribute('data-state');
            
            if (currentState === 'inactive') {
                // Initialize audio context if not already created
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    masterGain = audioContext.createGain();
                    masterGain.gain.value = 0;
                    masterGain.connect(audioContext.destination);
                    
                    // Create ambient sound
                    createAmbientSound();
                }
                
                // Fade in
                masterGain.gain.cancelScheduledValues(audioContext.currentTime);
                masterGain.gain.setValueAtTime(masterGain.gain.value, audioContext.currentTime);
                masterGain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 2);
                
                audioToggle.setAttribute('data-state', 'active');
            } else {
                // Fade out
                if (audioContext && masterGain) {
                    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
                    masterGain.gain.setValueAtTime(masterGain.gain.value, audioContext.currentTime);
                    masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
                }
                
                audioToggle.setAttribute('data-state', 'inactive');
            }
        });
    }
    
    function createAmbientSound() {
        // Base frequencies for a calming ambient sound
        const frequencies = [
            55, // A1
            110, // A2
            220, // A3
            330, // E4
            440, // A4
        ];
        
        // Create oscillators for each frequency
        frequencies.forEach(freq => {
            // Main oscillator
            const osc = audioContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            // Individual gain for this oscillator
            const gain = audioContext.createGain();
            gain.gain.value = 0.1 + Math.random() * 0.1;
            
            // Connect oscillator to its gain node
            osc.connect(gain);
            
            // Connect gain to master gain
            gain.connect(masterGain);
            
            // Start oscillator
            osc.start();
            
            // Store oscillator for later reference
            oscillators.push(osc);
            
            // Modulate the frequency slightly over time for organic feel
            setInterval(() => {
                const now = audioContext.currentTime;
                osc.frequency.setValueAtTime(osc.frequency.value, now);
                osc.frequency.linearRampToValueAtTime(
                    freq * (0.99 + Math.random() * 0.02), 
                    now + 2 + Math.random() * 3
                );
            }, 5000);
        });
        
        // Add subtle noise for texture
        const bufferSize = 2 * audioContext.sampleRate;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noise = audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        
        const noiseGain = audioContext.createGain();
        noiseGain.gain.value = 0.01;
        
        noise.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start();
    }
}

// Signal Particles Background
function initializeSignalParticles() {
    const container = document.querySelector('.signal-particles');
    
    if (container) {
        // Create initial particles
        for (let i = 0; i < 30; i++) {
            createParticle();
        }
        
        // Continue creating particles at intervals
        setInterval(createParticle, 2000);
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('signal-particle');
        
        // Random position, size, and duration
        const size = 1 + Math.random() * 3;
        const posX = Math.random() * 100;
        const duration = 15 + Math.random() * 20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.animationDuration = `${duration}s`;
        
        // Add to container
        container.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            container.removeChild(particle);
        }, duration * 1000);
    }
}

// Color Mood Switcher
function initializeColorMoodSwitcher() {
    const moodDots = document.querySelectorAll('.mood-dot');
    const root = document.documentElement;
    
    moodDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const mood = dot.getAttribute('data-mood');
            
            // Remove active class from all dots
            moodDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Apply color scheme based on mood
            switch (mood) {
                case 'default':
                    root.style.setProperty('--bg-primary', '#0a1520');
                    root.style.setProperty('--bg-secondary', '#0d1825');
                    root.style.setProperty('--accent-gold', '#fbbf24');
                    root.style.setProperty('--accent-cyan', '#7dd3fc');
                    break;
                case 'teal':
                    root.style.setProperty('--bg-primary', '#0a2025');
                    root.style.setProperty('--bg-secondary', '#0d2530');
                    root.style.setProperty('--accent-gold', '#2dd4bf');
                    root.style.setProperty('--accent-cyan', '#06b6d4');
                    break;
                case 'purple':
                    root.style.setProperty('--bg-primary', '#1a0a25');
                    root.style.setProperty('--bg-secondary', '#250d30');
                    root.style.setProperty('--accent-gold', '#a78bfa');
                    root.style.setProperty('--accent-cyan', '#8b5cf6');
                    break;
                case 'gold':
                    root.style.setProperty('--bg-primary', '#251a0a');
                    root.style.setProperty('--bg-secondary', '#302510');
                    root.style.setProperty('--accent-gold', '#f59e0b');
                    root.style.setProperty('--accent-cyan', '#fbbf24');
                    break;
            }
            
            // Create mood transition effect
            createMoodTransitionEffect(mood);
        });
    });
    
    function createMoodTransitionEffect(mood) {
        // Create a ripple effect when changing moods
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.width = '100vw';
        ripple.style.height = '100vh';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1000';
        
        // Set color based on mood
        let color;
        switch (mood) {
            case 'default': color = 'rgba(123, 211, 252, 0.05)'; break;
            case 'teal': color = 'rgba(45, 212, 191, 0.05)'; break;
            case 'purple': color = 'rgba(167, 139, 250, 0.05)'; break;
            case 'gold': color = 'rgba(245, 158, 11, 0.05)'; break;
        }
        
        ripple.style.background = `radial-gradient(circle at center, ${color} 0%, transparent 70%)`;
        ripple.style.opacity = '0';
        ripple.style.transition = 'all 1.5s ease';
        
        document.body.appendChild(ripple);
        
        // Animate the ripple
        setTimeout(() => {
            ripple.style.opacity = '1';
            ripple.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                ripple.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(ripple);
                }, 1000);
            }, 800);
        }, 10);
    }
}

// Interactive Background
function initializeInteractiveBackground() {
    const container = document.querySelector('.app-container');
    let mouseX = 0;
    let mouseY = 0;
    let stars = [];
    
    // Create stars
    for (let i = 0; i < 50; i++) {
        createStar();
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Occasionally have stars follow the cursor
        if (Math.random() < 0.05) {
            const starToFollow = stars[Math.floor(Math.random() * stars.length)];
            if (starToFollow) {
                followCursor(starToFollow);
            }
        }
    });
    
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.position = 'fixed';
        star.style.width = `${1 + Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.backgroundColor = Math.random() > 0.7 ? 'var(--accent-gold)' : 'var(--accent-cyan)';
        star.style.borderRadius = '50%';
        star.style.opacity = '0.2';
        star.style.pointerEvents = 'none';
        star.style.transition = 'all 3s cubic-bezier(0.05, 0.7, 0.1, 1)';
        
        // Random position
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        
        // Add to container
        container.appendChild(star);
        
        // Store reference
        stars.push(star);
        
        // Subtle random movement
        setInterval(() => {
            const currentLeft = parseFloat(star.style.left);
            const currentTop = parseFloat(star.style.top);
            
            star.style.left = `${currentLeft + (Math.random() - 0.5) * 1}vw`;
            star.style.top = `${currentTop + (Math.random() - 0.5) * 1}vh`;
            
            // Keep within viewport
            if (parseFloat(star.style.left) < 0) star.style.left = '0vw';
            if (parseFloat(star.style.left) > 100) star.style.left = '100vw';
            if (parseFloat(star.style.top) < 0) star.style.top = '0vh';
            if (parseFloat(star.style.top) > 100) star.style.top = '100vh';
            
        }, 5000 + Math.random() * 5000);
    }
    
    function followCursor(star) {
        // Make star follow cursor with some randomness
        const originalTransition = star.style.transition;
        star.style.transition = 'all 2s cubic-bezier(0.1, 0.8, 0.2, 1)';
        star.style.opacity = '0.8';
        
        // Calculate position relative to viewport
        const viewportX = (mouseX / window.innerWidth) * 100;
        const viewportY = (mouseY / window.innerHeight) * 100;
        
        // Add some randomness to the target position
        const targetX = viewportX + (Math.random() - 0.5) * 10;
        const targetY = viewportY + (Math.random() - 0.5) * 10;
        
        star.style.left = `${targetX}vw`;
        star.style.top = `${targetY}vh`;
        
        // Return to normal after following
        setTimeout(() => {
            star.style.opacity = '0.2';
            star.style.transition = originalTransition;
        }, 2000);
    }
}

// Loyalty Journey Animation
function initializeLoyaltyJourney() {
    const journeyNodes = document.querySelectorAll('.journey-node');
    const journeyLine = document.querySelector('.journey-line');
    
    if (journeyNodes.length > 0 && journeyLine) {
        // Set the height of the journey line based on the nodes
        const lastNode = journeyNodes[journeyNodes.length - 1];
        const firstNode = journeyNodes[0];
        const totalHeight = lastNode.offsetTop + lastNode.offsetHeight - firstNode.offsetTop;
        journeyLine.style.height = `${totalHeight}px`;
    }
}

// Dispatch card interaction
const dispatchCard = document.querySelector('.dispatch-card');
if (dispatchCard) {
   dispatchCard.addEventListener('click', () => {
       showNotification('Dispatch module coming soon', 'info');
   });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
   const sections = document.querySelectorAll('.section');
   const currentSection = Array.from(sections).findIndex(section => {
       const rect = section.getBoundingClientRect();
       return rect.top <= 100 && rect.bottom > 100;
   });
   
   if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
       e.preventDefault();
       sections[currentSection + 1]?.scrollIntoView({ behavior: 'smooth' });
   } else if (e.key === 'ArrowUp' && currentSection > 0) {
       e.preventDefault();
       sections[currentSection - 1]?.scrollIntoView({ behavior: 'smooth' });
   }
});

// Handle visibility change (pause animations when tab is not visible)
document.addEventListener('visibilitychange', () => {
   if (document.hidden) {
       // Pause animations
       document.querySelectorAll('[class*="animate"]').forEach(el => {
           el.style.animationPlayState = 'paused';
       });
   } else {
       // Resume animations
       document.querySelectorAll('[class*="animate"]').forEach(el => {
           el.style.animationPlayState = 'running';
       });
   }
});

// Error boundary for production
window.addEventListener('error', (e) => {
   console.error('Global error:', e.error);
   // In production, send to error tracking service
});

// Service Worker registration (for PWA support)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
   window.addEventListener('load', () => {
       navigator.serviceWorker.register('/sw.js').catch(err => {
           console.log('ServiceWorker registration failed:', err);
       });
   });
}
