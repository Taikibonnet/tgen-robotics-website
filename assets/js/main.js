/**
 * Main JavaScript for TGen Robotics Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Toggle hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Cart icon hover to show mini cart
    const cartIcon = document.querySelector('.cart-icon');
    const miniCart = document.querySelector('.mini-cart');
    
    if (cartIcon && miniCart) {
        cartIcon.addEventListener('mouseenter', function() {
            miniCart.style.display = 'block';
        });
        
        cartIcon.addEventListener('mouseleave', function(e) {
            // Check if the mouse is over the mini cart
            const relatedTarget = e.relatedTarget;
            if (!miniCart.contains(relatedTarget)) {
                miniCart.style.display = 'none';
            }
        });
        
        miniCart.addEventListener('mouseleave', function() {
            miniCart.style.display = 'none';
        });
    }
    
    // Cart notification
    window.showCartNotification = function() {
        const notification = document.getElementById('cart-notification');
        if (notification) {
            notification.classList.add('active');
            
            setTimeout(function() {
                notification.classList.remove('active');
            }, 3000);
        }
    };
    
    // Update cart count
    window.updateCartCount = function(count) {
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(function(cartCount) {
            cartCount.textContent = count;
        });
    };
    
    // Example animation for hero section
    const animateHero = function() {
        const heroElements = document.querySelectorAll('.hero .animated');
        heroElements.forEach(function(element, index) {
            setTimeout(function() {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    };
    
    // Run hero animation on page load
    animateHero();
    
    // Scroll animations
    const scrollElements = document.querySelectorAll('.animated:not(.hero *)');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    };
    
    const hideScrollElement = (element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // Initialize elements
    scrollElements.forEach(hideScrollElement);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Run once on load to show elements already in view
    handleScrollAnimation();
});