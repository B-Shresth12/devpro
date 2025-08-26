// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Pricing tab functionality
function showPricing(type) {
    // Hide all pricing content
    document.querySelectorAll(".pricing-content").forEach(content => {
        content.classList.remove("active");
    });
    
    // Remove active class from all tabs
    document.querySelectorAll(".pricing-tab").forEach(tab => {
        tab.classList.remove("active");
    });
    
    // Show selected pricing content
    document.getElementById(type + "-pricing").classList.add("active");
    
    // Add active class to clicked tab
    event.target.classList.add("active");
}

// Smooth scrolling for navigation links
$(document).ready(function() {
    $("a[href^=\"#\"]").on("click", function(event) {
        var target = $(this.getAttribute("href"));
        if (target.length) {
            event.preventDefault();
            $("html, body").stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
    
    // Navbar background on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $(".navbar").addClass("scrolled");
        } else {
            $(".navbar").removeClass("scrolled");
        }
    });
    
    // Contact form submission
    $("form").on("submit", function(e) {
        e.preventDefault();
        alert("Thank you for your message! We will get back to you soon.");
        this.reset();
    });
});

