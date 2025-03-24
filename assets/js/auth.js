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
    const loginMethodSelect = document.getElementById('login-method');
    const phoneInput = document.getElementById('login-phone');
    const emailInput = document.getElementById('login-email');
    const registerEmailInput = document.getElementById('register-email');
    const registerPhoneInput = document.getElementById('register-phone');
    const registerMethodSelect = document.getElementById('register-method');

    // Initialize login and register method toggles
    initializeMethodToggles();

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
            if (loginMessage) loginMessage.textContent = '';
            if (loginMessage) loginMessage.className = 'auth-message';
            if (registerMessage) registerMessage.textContent = '';
            if (registerMessage) registerMessage.className = 'auth-message';
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
        if (password.match(/\\d/)) strength += 1;
        
        // Check for special characters
        if (password.match(/[^a-zA-Z\\d]/)) strength += 1;
        
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
            
            const loginMethod = document.getElementById('login-method').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            let identifier;
            if (loginMethod === 'email') {
                identifier = document.getElementById('login-email').value;
                
                // Validate email format
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                if (!emailRegex.test(identifier)) {
                    showMessage(loginMessage, 'Please enter a valid email address', 'error');
                    return;
                }
            } else {
                identifier = document.getElementById('login-phone').value;
                
                // Validate phone format (simple validation, can be enhanced)
                const phoneRegex = /^\+?[0-9]{10,15}$/;
                if (!phoneRegex.test(identifier)) {
                    showMessage(loginMessage, 'Please enter a valid phone number', 'error');
                    return;
                }
            }
            
            // Validate inputs
            if (!identifier || !password) {
                showMessage(loginMessage, 'Please fill in all fields', 'error');
                return;
            }
            
            // Attempt login
            login(identifier, password, rememberMe, loginMethod);
        });
    }

    // Handle registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const registerMethod = document.getElementById('register-method').value;
            const password = document.getElementById('register-password').value;
            const confirmPass = document.getElementById('register-confirm').value;
            const termsAgreed = document.getElementById('terms').checked;
            
            let email = '';
            let phone = '';
            
            if (registerMethod === 'email') {
                email = document.getElementById('register-email').value;
                
                // Validate email format
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                if (!emailRegex.test(email)) {
                    showMessage(registerMessage, 'Please enter a valid email address', 'error');
                    return;
                }
            } else {
                phone = document.getElementById('register-phone').value;
                
                // Validate phone format
                const phoneRegex = /^\+?[0-9]{10,15}$/;
                if (!phoneRegex.test(phone)) {
                    showMessage(registerMessage, 'Please enter a valid phone number', 'error');
                    return;
                }
            }
            
            // Validate inputs
            if (!name || (!email && !phone) || !password || !confirmPass) {
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
            
            // Validate password strength
            if (password.length < 8) {
                showMessage(registerMessage, 'Password must be at least 8 characters long', 'error');
                return;
            }
            
            // Register the user
            register(name, email, phone, password);
        });
    }

    // Login function
    function login(identifier, password, rememberMe, method) {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        // Find the user by email or phone
        let user;
        if (method === 'email') {
            user = users.find(u => u.email === identifier);
        } else {
            user = users.find(u => u.phone === identifier);
        }
        
        if (!user) {
            showMessage(loginMessage, method === 'email' ? 'Email not found' : 'Phone number not found', 'error');
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
            phone: user.phone,
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
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'account.html';
            }
        }, 1500);
    }

    // Registration function
    function register(name, email, phone, password) {
        // Get existing users
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        // Check if email already exists
        if (email && users.some(user => user.email === email)) {
            showMessage(registerMessage, 'Email is already registered', 'error');
            return;
        }
        
        // Check if phone already exists
        if (phone && users.some(user => user.phone === phone)) {
            showMessage(registerMessage, 'Phone number is already registered', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: generateUserId(),
            name,
            email: email || '',
            phone: phone || '',
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

    // Method toggle initialization
    function initializeMethodToggles() {
        // Handle login method change
        if (loginMethodSelect) {
            loginMethodSelect.addEventListener('change', function() {
                toggleLoginMethod(this.value);
            });
            
            // Initialize with current value
            toggleLoginMethod(loginMethodSelect.value);
        }
        
        // Handle register method change
        if (registerMethodSelect) {
            registerMethodSelect.addEventListener('change', function() {
                toggleRegisterMethod(this.value);
            });
            
            // Initialize with current value
            toggleRegisterMethod(registerMethodSelect.value);
        }
    }

    // Toggle login method between email and phone
    function toggleLoginMethod(method) {
        if (!emailInput || !phoneInput) return;
        
        if (method === 'email') {
            emailInput.parentElement.style.display = '';
            phoneInput.parentElement.style.display = 'none';
            phoneInput.value = '';
        } else {
            emailInput.parentElement.style.display = 'none';
            phoneInput.parentElement.style.display = '';
            emailInput.value = '';
        }
    }

    // Toggle register method between email and phone
    function toggleRegisterMethod(method) {
        if (!registerEmailInput || !registerPhoneInput) return;
        
        if (method === 'email') {
            registerEmailInput.parentElement.style.display = '';
            registerPhoneInput.parentElement.style.display = 'none';
            registerPhoneInput.value = '';
        } else {
            registerEmailInput.parentElement.style.display = 'none';
            registerPhoneInput.parentElement.style.display = '';
            registerEmailInput.value = '';
        }
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
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'account.html';
            }
        }
    }

    // Run initial check
    if (window.location.pathname.includes('login.html')) {
        checkLoggedIn();
    }
});

// Add utility functions to window scope for other scripts to use
window.authUtils = {
    // Check if a user is logged in and return the session
    getCurrentUser: function() {
        const session = JSON.parse(localStorage.getItem('tgenUserSession')) || 
                        JSON.parse(sessionStorage.getItem('tgenUserSession'));
        
        if (session && session.loggedIn) {
            return session;
        }
        return null;
    },
    
    // Check if the current user is an admin
    isAdmin: function() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },
    
    // Logout the current user
    logout: function() {
        localStorage.removeItem('tgenUserSession');
        sessionStorage.removeItem('tgenUserSession');
        window.location.href = 'login.html';
    },
    
    // Create an admin account if it doesn't exist
    initializeAdmin: function() {
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        // Check if admin exists
        const adminExists = users.some(user => user.role === 'admin');
        
        if (!adminExists) {
            // Create admin account
            const adminUser = {
                id: 'admin_' + Math.random().toString(36).substr(2, 9),
                name: 'Administrator',
                email: 'admin@tgen-robotics.com',
                phone: '',
                password: 'Admin123!',
                role: 'admin',
                createdAt: new Date().toISOString()
            };
            
            users.push(adminUser);
            localStorage.setItem('tgenUsers', JSON.stringify(users));
            console.log('Admin account created');
        }
    }
};

// Initialize admin account on page load
document.addEventListener('DOMContentLoaded', () => {
    window.authUtils.initializeAdmin();
});