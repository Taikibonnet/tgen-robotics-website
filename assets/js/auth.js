/**
 * Authentication System for TGen ROBOTICS
 * 
 * This file handles user authentication, registration, and account management.
 * It uses browser localStorage to simulate a database for demonstration purposes.
 * In a production environment, this would connect to a backend API.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');
    const passwordToggle = document.getElementById('show-password');
    const passwordInput = document.getElementById('login-password');
    const registerPassword = document.getElementById('register-password');
    const confirmPassword = document.getElementById('register-confirm');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');

    // Switch between login and register tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabTarget = tab.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabTarget}-form`) {
                    form.classList.add('active');
                }
            });
            
            // Clear messages
            loginMessage.textContent = '';
            loginMessage.className = 'auth-message';
            registerMessage.textContent = '';
            registerMessage.className = 'auth-message';
        });
    });

    // Toggle password visibility
    if (passwordToggle) {
        passwordToggle.addEventListener('change', () => {
            passwordInput.type = passwordToggle.checked ? 'text' : 'password';
        });
    }

    // Password strength meter
    if (registerPassword) {
        registerPassword.addEventListener('input', checkPasswordStrength);
    }

    function checkPasswordStrength() {
        const password = registerPassword.value;
        let strength = 0;
        
        // Reset the meter
        strengthMeter.className = 'strength-meter';
        
        if (password.length === 0) {
            strengthText.textContent = 'Password strength';
            return;
        }
        
        // Check password length
        if (password.length >= 8) strength += 1;
        
        // Check for mixed case characters
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
        
        // Check for numbers
        if (password.match(/\d/)) strength += 1;
        
        // Check for special characters
        if (password.match(/[^a-zA-Z\d]/)) strength += 1;
        
        // Update the meter
        if (strength <= 2) {
            strengthMeter.classList.add('weak');
            strengthText.textContent = 'Weak password';
        } else if (strength === 3) {
            strengthMeter.classList.add('medium');
            strengthText.textContent = 'Medium strength password';
        } else {
            strengthMeter.classList.add('strong');
            strengthText.textContent = 'Strong password';
        }
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Validate inputs
            if (!email || !password) {
                showMessage(loginMessage, 'Please fill in all fields', 'error');
                return;
            }
            
            // Attempt login
            login(email, password, rememberMe);
        });
    }

    // Handle registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPass = document.getElementById('register-confirm').value;
            const termsAgreed = document.getElementById('terms').checked;
            
            // Validate inputs
            if (!name || !email || !password || !confirmPass) {
                showMessage(registerMessage, 'Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPass) {
                showMessage(registerMessage, 'Passwords do not match', 'error');
                return;
            }
            
            if (!termsAgreed) {
                showMessage(registerMessage, 'You must agree to the Terms and Conditions', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(registerMessage, 'Please enter a valid email address', 'error');
                return;
            }
            
            // Validate password strength
            if (password.length < 8) {
                showMessage(registerMessage, 'Password must be at least 8 characters long', 'error');
                return;
            }
            
            // Register the user
            register(name, email, password);
        });
    }

    // Login function
    function login(email, password, rememberMe) {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        // Find the user
        const user = users.find(u => u.email === email);
        
        if (!user) {
            showMessage(loginMessage, 'Email not found', 'error');
            return;
        }
        
        // Check password
        if (user.password !== password) {
            showMessage(loginMessage, 'Incorrect password', 'error');
            return;
        }
        
        // User authenticated - create session
        const session = {
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'customer',
            loggedIn: true,
            timestamp: new Date().getTime()
        };
        
        // Store session data
        if (rememberMe) {
            localStorage.setItem('tgenUserSession', JSON.stringify(session));
        } else {
            sessionStorage.setItem('tgenUserSession', JSON.stringify(session));
        }
        
        showMessage(loginMessage, 'Login successful! Redirecting...', 'success');
        
        // Redirect to appropriate page based on role
        setTimeout(() => {
            if (user.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'account.html';
            }
        }, 1500);
    }

    // Registration function
    function register(name, email, password) {
        // Get existing users
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            showMessage(registerMessage, 'Email is already registered', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: generateUserId(),
            name,
            email,
            password,
            role: 'customer', // Default role
            cart: [],
            wishlist: [],
            createdAt: new Date().toISOString()
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('tgenUsers', JSON.stringify(users));
        
        // Show success message
        showMessage(registerMessage, 'Account created successfully! Please log in.', 'success');
        
        // Clear form and switch to login tab after delay
        setTimeout(() => {
            registerForm.reset();
            document.querySelector('[data-tab="login"]').click();
        }, 2000);
    }

    // Helper functions
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `auth-message ${type}`;
    }

    function generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    // Check if user is already logged in
    function checkLoggedIn() {
        const session = JSON.parse(localStorage.getItem('tgenUserSession')) || 
                        JSON.parse(sessionStorage.getItem('tgenUserSession'));
        
        if (session && session.loggedIn) {
            // User is already logged in, redirect to appropriate page
            if (session.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'account.html';
            }
        }
    }

    // Run initial check
    checkLoggedIn();
});