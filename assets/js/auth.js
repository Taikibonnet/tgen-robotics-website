/**
 * Authentication JavaScript for TGen Robotics Website
 * 
 * Note: This is a client-side implementation for demonstration purposes only.
 * In a real application, authentication should be handled server-side.
 */

const authUtils = (function() {
    // Private variables
    const USER_STORAGE_KEY = 'tgen_user';
    const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Mock user database
    const users = [
        {
            id: 1,
            email: 'admin@tgenrobotics.com',
            password: 'admin123', // In a real app, this would be hashed
            name: 'Admin User',
            role: 'admin'
        },
        {
            id: 2,
            email: 'user@example.com',
            password: 'user123', // In a real app, this would be hashed
            name: 'Test User',
            role: 'customer'
        }
    ];
    
    // Get current user from local storage
    const getCurrentUser = function() {
        const userData = localStorage.getItem(USER_STORAGE_KEY);
        
        if (!userData) {
            return null;
        }
        
        const user = JSON.parse(userData);
        
        // Check if session has expired
        if (user.expiresAt && new Date().getTime() > user.expiresAt) {
            localStorage.removeItem(USER_STORAGE_KEY);
            return null;
        }
        
        return user;
    };
    
    // Public methods
    return {
        // Login user
        login: function(email, password) {
            // Find user
            const user = users.find(u => u.email === email && u.password === password);
            
            if (!user) {
                return {
                    success: false,
                    message: 'Invalid email or password'
                };
            }
            
            // Create session
            const session = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                expiresAt: new Date().getTime() + SESSION_DURATION
            };
            
            // Save session
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session));
            
            return {
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            };
        },
        
        // Logout user
        logout: function() {
            localStorage.removeItem(USER_STORAGE_KEY);
            window.location.href = 'index.html';
        },
        
        // Check if user is logged in
        isLoggedIn: function() {
            return getCurrentUser() !== null;
        },
        
        // Get current user
        getCurrentUser: getCurrentUser,
        
        // Check if user is admin
        isAdmin: function() {
            const user = getCurrentUser();
            return user && user.role === 'admin';
        },
        
        // Register user (not implemented, for demonstration purposes only)
        register: function(userData) {
            // This would typically be a server-side operation
            return {
                success: false,
                message: 'Registration is not implemented in this demo'
            };
        }
    };
})();

// Make auth utilities available globally
window.authUtils = authUtils;

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Handle login form
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the appropriate email field based on which one is visible
            let email = '';
            const loginEmail = document.getElementById('login-email');
            const loginPhone = document.getElementById('login-phone');
            
            if (loginEmail && loginEmail.parentElement.style.display !== 'none') {
                email = loginEmail.value;
            } else if (loginPhone && loginPhone.parentElement.style.display !== 'none') {
                email = loginPhone.value; // For simplicity, we'll treat phone as email in this demo
            }
            
            const password = document.getElementById('login-password').value;
            
            const result = authUtils.login(email, password);
            
            if (result.success) {
                // Redirect based on user role
                if (result.user.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'account.html';
                }
            } else {
                // Show error message
                const errorDiv = document.getElementById('login-message');
                if (errorDiv) {
                    errorDiv.textContent = result.message;
                    errorDiv.style.display = 'block';
                    errorDiv.classList.add('error');
                }
            }
        });
    }
    
    // Handle login method selection
    const loginMethod = document.getElementById('login-method');
    if (loginMethod) {
        loginMethod.addEventListener('change', function() {
            const emailField = document.getElementById('login-email').parentElement;
            const phoneField = document.getElementById('login-phone').parentElement;
            
            if (this.value === 'email') {
                emailField.style.display = 'block';
                phoneField.style.display = 'none';
            } else {
                emailField.style.display = 'none';
                phoneField.style.display = 'block';
            }
        });
    }
    
    // Handle logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            authUtils.logout();
        });
    }
    
    // Also handle mobile logout
    const mobileLogoutButton = document.getElementById('admin-logout-mobile');
    if (mobileLogoutButton) {
        mobileLogoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            authUtils.logout();
        });
    }
    
    // Handle admin logout
    const adminLogoutButton = document.getElementById('admin-logout');
    if (adminLogoutButton) {
        adminLogoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            authUtils.logout();
        });
    }
    
    // Protect admin pages
    const adminPages = ['admin.html', 'admin-products.html', 'admin-orders.html', 'admin-users.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (adminPages.includes(currentPage) && !authUtils.isAdmin()) {
        window.location.href = 'login.html?redirect=' + currentPage;
    }
    
    // Protect account pages
    const accountPages = ['account.html', 'orders.html', 'profile.html'];
    
    if (accountPages.includes(currentPage) && !authUtils.isLoggedIn()) {
        window.location.href = 'login.html?redirect=' + currentPage;
    }
});