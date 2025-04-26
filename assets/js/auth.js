/**
 * Authentication Utilities for TGen ROBOTICS
 * 
 * This file contains authentication functionality including login, registration,
 * session management, and admin authorization.
 */

// Initialize authentication utilities
window.authUtils = {
    // Save a user session to localStorage
    saveSession: function(user) {
        // Create a session object with basic user info
        const session = {
            userId: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            loggedIn: true,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('tgenUserSession', JSON.stringify(session));
        return session;
    },
    
    // Get the current user session
    getCurrentUser: function() {
        try {
            return JSON.parse(localStorage.getItem('tgenUserSession')) || null;
        } catch (e) {
            return null;
        }
    },
    
    // Check if a user is logged in
    isLoggedIn: function() {
        const session = this.getCurrentUser();
        return session && session.loggedIn === true;
    },
    
    // Check if current user is an admin
    isAdmin: function() {
        const session = this.getCurrentUser();
        return session && session.loggedIn === true && session.role === 'admin';
    },
    
    // Authenticate a user
    login: function(email, password) {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        // Find user by email
        const user = users.find(u => u.email === email && u.password === password);
        
        // If user found, create session
        if (user) {
            return this.saveSession(user);
        }
        
        return null;
    },
    
    // Register a new user
    register: function(userData) {
        if (!userData.name || (!userData.email && !userData.phone) || !userData.password) {
            return {
                success: false,
                message: 'Missing required fields'
            };
        }
        
        // Get existing users
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        // Check for duplicate email
        if (userData.email && users.some(u => u.email === userData.email)) {
            return {
                success: false,
                message: 'Email already registered'
            };
        }
        
        // Check for duplicate phone
        if (userData.phone && users.some(u => u.phone === userData.phone)) {
            return {
                success: false,
                message: 'Phone number already registered'
            };
        }
        
        // Create a new user
        const newUser = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            name: userData.name,
            email: userData.email || '',
            phone: userData.phone || '',
            password: userData.password,
            role: 'customer', // Default role
            cart: [],
            wishlist: [],
            createdAt: new Date().toISOString()
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('tgenUsers', JSON.stringify(users));
        
        // Create a session for the new user
        this.saveSession(newUser);
        
        return {
            success: true,
            user: newUser
        };
    },
    
    // Log out the current user
    logout: function() {
        localStorage.removeItem('tgenUserSession');
        window.location.href = 'index.html';
    },
    
    // Initialize a default admin account if none exists
    initDefaultAdmin: function() {
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        // Check if admin account exists
        const adminExists = users.some(user => user.role === 'admin');
        
        if (!adminExists) {
            // Create default admin
            const adminUser = {
                id: 'admin_' + Math.random().toString(36).substr(2, 9),
                name: 'Administrator',
                email: 'tgen.robotics@gmail.com',
                phone: '',
                password: 'Admin123!',
                role: 'admin',
                cart: [],
                wishlist: [],
                createdAt: new Date().toISOString()
            };
            
            users.push(adminUser);
            localStorage.setItem('tgenUsers', JSON.stringify(users));
            console.log('Default admin account created');
        }
    }
};

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize default admin account
    window.authUtils.initDefaultAdmin();
    
    // Show appropriate account links based on login status
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        const user = window.authUtils.getCurrentUser();
        
        if (user && user.loggedIn) {
            loginLink.textContent = 'My Account';
            loginLink.href = user.role === 'admin' ? 'admin.html' : 'account.html';
        }
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const messageEl = document.getElementById('login-message');
            
            const user = window.authUtils.login(email, password);
            
            if (user) {
                // Successful login
                messageEl.textContent = 'Login successful! Redirecting...';
                messageEl.className = 'auth-message success';
                
                // Check for redirect parameter
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect');
                
                // Redirect after a short delay
                setTimeout(() => {
                    if (redirect) {
                        window.location.href = redirect + '.html';
                    } else if (user.role === 'admin') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 1500);
            } else {
                // Failed login
                messageEl.textContent = 'Invalid email or password';
                messageEl.className = 'auth-message error';
            }
        });
    }
    
    // Handle registration form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userData = {
                name: document.getElementById('register-name').value,
                email: document.getElementById('register-email').value,
                password: document.getElementById('register-password').value
            };
            
            const confirmPassword = document.getElementById('register-confirm').value;
            const messageEl = document.getElementById('register-message');
            
            // Check if passwords match
            if (userData.password !== confirmPassword) {
                messageEl.textContent = 'Passwords do not match';
                messageEl.className = 'auth-message error';
                return;
            }
            
            // Register the user
            const result = window.authUtils.register(userData);
            
            if (result.success) {
                // Successful registration
                messageEl.textContent = 'Account created successfully! Redirecting...';
                messageEl.className = 'auth-message success';
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // Failed registration
                messageEl.textContent = result.message;
                messageEl.className = 'auth-message error';
            }
        });
    }
    
    // Handle tab switching
    const authTabs = document.querySelectorAll('.auth-tab');
    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                authTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get the tab id
                const tabId = this.getAttribute('data-tab');
                
                // Hide all forms
                document.querySelectorAll('.auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                
                // Show the selected form
                document.getElementById(tabId + '-form').classList.add('active');
            });
        });
    }
    
    // Handle method selection (email/phone)
    const loginMethodSelect = document.getElementById('login-method');
    if (loginMethodSelect) {
        loginMethodSelect.addEventListener('change', function() {
            const method = this.value;
            
            if (method === 'email') {
                document.getElementById('login-email').parentElement.style.display = 'block';
                document.getElementById('login-phone').parentElement.style.display = 'none';
                document.getElementById('login-email').required = true;
                document.getElementById('login-phone').required = false;
            } else {
                document.getElementById('login-email').parentElement.style.display = 'none';
                document.getElementById('login-phone').parentElement.style.display = 'block';
                document.getElementById('login-email').required = false;
                document.getElementById('login-phone').required = true;
            }
        });
    }
    
    const registerMethodSelect = document.getElementById('register-method');
    if (registerMethodSelect) {
        registerMethodSelect.addEventListener('change', function() {
            const method = this.value;
            
            if (method === 'email') {
                document.getElementById('register-email').parentElement.style.display = 'block';
                document.getElementById('register-phone').parentElement.style.display = 'none';
                document.getElementById('register-email').required = true;
                document.getElementById('register-phone').required = false;
            } else {
                document.getElementById('register-email').parentElement.style.display = 'none';
                document.getElementById('register-phone').parentElement.style.display = 'block';
                document.getElementById('register-email').required = false;
                document.getElementById('register-phone').required = true;
            }
        });
    }
    
    // Handle password visibility toggle
    const showPasswordCheckbox = document.getElementById('show-password');
    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener('change', function() {
            const passwordInput = document.getElementById('login-password');
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    }
});
