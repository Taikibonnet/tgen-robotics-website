// Main JavaScript

// Toggle mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Check if the encyclopedia page loads with a robot ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const robotId = urlParams.get('robot');
    
    if (robotId && document.getElementById('robotModal')) {
        // Find the robot with the matching ID
        const robot = robotsData.find(r => r.id === parseInt(robotId));
        
        if (robot) {
            // Open the modal with this robot's details
            openRobotModal(robot);
        }
    }
    
    // Handle authentication state for admin pages (simplified demo)
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple demo authentication (in a real app, this would be server-side)
            if (username === 'admin' && password === 'password') {
                localStorage.setItem('isAdmin', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }
    
    // Handle logout
    const logoutBtn = document.querySelector('.logout a');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isAdmin');
            window.location.href = 'login.html';
        });
    }
    
    // Check if user is logged in for admin pages
    const adminWrapper = document.querySelector('.admin-wrapper');
    if (adminWrapper && localStorage.getItem('isAdmin') !== 'true') {
        window.location.href = 'login.html';
    }
});