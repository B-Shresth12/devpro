/* ===========================
   DEVPRO REFINED JAVASCRIPT
   Enhanced Functionality & UX
   =========================== */

// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out'
});

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // NAVBAR FUNCTIONALITY
    // ===========================
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // ===========================
    // SMOOTH SCROLLING
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================
    // PRICING TABS
    // ===========================
    function initPricingTabs() {
        const pricingTabs = document.querySelectorAll('.pricing-tab');
        const pricingContents = document.querySelectorAll('.pricing-content');
        
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetType = this.textContent.toLowerCase().replace(' ', '-');
                
                // Remove active class from all tabs and contents
                pricingTabs.forEach(t => t.classList.remove('active'));
                pricingContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.getElementById(`${targetType}-pricing`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // Initialize pricing tabs if they exist
    if (document.querySelector('.pricing-tabs')) {
        initPricingTabs();
    }
    
    // ===========================
    // COMPARISON TABLE TABS
    // ===========================
    function initComparisonTabs() {
        const comparisonTabs = document.querySelectorAll('.comparison-tab');
        const comparisonContents = document.querySelectorAll('.comparison-content');
        
        comparisonTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // Remove active class from all tabs and contents
                comparisonTabs.forEach(t => t.classList.remove('active'));
                comparisonContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.getElementById(target);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // Initialize comparison tabs if they exist
    if (document.querySelector('.comparison-tabs')) {
        initComparisonTabs();
    }
    
    // ===========================
    // DELIVERY OPTIONS
    // ===========================
    function initDeliveryOptions() {
        const deliveryOptions = document.querySelectorAll('.delivery-option input[type="radio"]');
        
        deliveryOptions.forEach(option => {
            option.addEventListener('change', function() {
                const packageColumn = this.closest('.package-column');
                const basePrice = parseFloat(packageColumn.querySelector('.package-price').textContent.replace('US$', ''));
                const deliveryPrice = this.parentElement.querySelector('.delivery-price');
                
                let additionalCost = 0;
                if (deliveryPrice) {
                    additionalCost = parseFloat(deliveryPrice.textContent.match(/\d+/)[0]);
                }
                
                const total = basePrice + (this.checked && additionalCost ? additionalCost : 0);
                const totalElement = packageColumn.querySelector('.package-total');
                
                if (totalElement) {
                    totalElement.textContent = `Total: US$${total}`;
                }
            });
        });
    }
    
    // Initialize delivery options if they exist
    if (document.querySelector('.delivery-option')) {
        initDeliveryOptions();
    }
    
    // ===========================
    // CONTACT FORM
    // ===========================
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
                
                // Reset form
                this.reset();
            }, 2000);
        });
    }
    
    // ===========================
    // FORM VALIDATION
    // ===========================
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
            }
            
            // Phone validation
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Add validation to all forms
    document.querySelectorAll('form').forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    });
    
    // ===========================
    // NOTIFICATION SYSTEM
    // ===========================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#1dbf73' : type === 'error' ? '#e74c3c' : '#007bff'};
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // ===========================
    // PACKAGE BUTTONS
    // ===========================
    document.querySelectorAll('.package-button').forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.closest('.package-column').querySelector('.package-title').textContent;
            showNotification(`${packageName} package selected. Redirecting to checkout...`, 'success');
        });
    });
    
    document.querySelectorAll('.contact-button').forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'contact.html';
        });
    });
    
    // ===========================
    // LAZY LOADING IMAGES
    // ===========================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // ===========================
    // COUNTER ANIMATION
    // ===========================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.getAttribute('data-suffix') || '');
        }, 16);
    }
    
    // Initialize counters when visible
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    // ===========================
    // KEYBOARD NAVIGATION
    // ===========================
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
    
});

// ===========================
// CSS ANIMATIONS
// ===========================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .is-invalid {
        border-color: #e74c3c !important;
    }
    
    .is-invalid:focus {
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.25) !important;
    }
`;
document.head.appendChild(style);

// ===========================
// HELPER FUNCTIONS
// ===========================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    // Add any scroll-based functionality here
}, 100));