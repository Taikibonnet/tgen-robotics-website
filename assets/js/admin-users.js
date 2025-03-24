/**
 * Admin Users Management for TGen ROBOTICS
 * 
 * This file handles user management functions in the admin panel.
 * It allows administrators to view, add, edit, and delete user accounts.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is admin and has access to this page
    if (!window.authUtils || !window.authUtils.isAdmin()) {
        window.location.href = 'login.html';
        return;
    }

    // DOM Elements
    const userTableBody = document.getElementById('users-table-body');
    const userModal = document.getElementById('user-modal');
    const userForm = document.getElementById('user-form');
    const modalTitle = document.getElementById('modal-title');
    const userMessage = document.getElementById('user-message');
    const addUserBtn = document.getElementById('add-user-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const userSearch = document.getElementById('user-search');
    const userRoleFilter = document.getElementById('role-filter');
    
    // Add user button
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            openUserModal();
        });
    }
    
    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            userModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === userModal) {
            userModal.classList.remove('active');
        }
    });
    
    // User form submission
    if (userForm) {
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userId = userForm.getAttribute('data-user-id');
            const name = document.getElementById('user-name').value;
            const email = document.getElementById('user-email').value;
            const phone = document.getElementById('user-phone').value;
            const role = document.getElementById('user-role').value;
            const password = document.getElementById('user-password').value;
            
            if (!name || (!email && !phone)) {
                showMessage(userMessage, 'Please fill in required fields (name and email or phone)', 'error');
                return;
            }
            
            if (email) {
                // Validate email format
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                if (!emailRegex.test(email)) {
                    showMessage(userMessage, 'Please enter a valid email address', 'error');
                    return;
                }
            }
            
            if (phone) {
                // Validate phone format
                const phoneRegex = /^\+?[0-9]{10,15}$/;
                if (!phoneRegex.test(phone)) {
                    showMessage(userMessage, 'Please enter a valid phone number', 'error');
                    return;
                }
            }
            
            if (userId) {
                // Update existing user
                updateUser(userId, name, email, phone, role, password);
            } else {
                // Create new user
                if (!password) {
                    showMessage(userMessage, 'Password is required for new users', 'error');
                    return;
                }
                createUser(name, email, phone, role, password);
            }
        });
    }
    
    // User search
    if (userSearch) {
        userSearch.addEventListener('input', () => {
            filterUsers();
        });
    }
    
    // Role filter
    if (userRoleFilter) {
        userRoleFilter.addEventListener('change', () => {
            filterUsers();
        });
    }
    
    // Initial load
    loadUsers();
    
    // Load all users
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        if (userTableBody) {
            userTableBody.innerHTML = '';
            
            if (users.length === 0) {
                const noUserRow = document.createElement('tr');
                noUserRow.innerHTML = `<td colspan="6" class="text-center">No users found</td>`;
                userTableBody.appendChild(noUserRow);
                return;
            }
            
            users.forEach(user => {
                const row = document.createElement('tr');
                
                // Format creation date
                const createdDate = new Date(user.createdAt);
                const formattedDate = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
                
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email || '-'}</td>
                    <td>${user.phone || '-'}</td>
                    <td><span class="role-badge ${user.role}">${user.role}</span></td>
                    <td>${formattedDate}</td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${user.id}">Edit</button>
                        <button class="delete-btn" data-id="${user.id}" ${user.role === 'admin' ? 'disabled' : ''}>Delete</button>
                    </td>
                `;
                
                userTableBody.appendChild(row);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const userId = btn.getAttribute('data-id');
                    openUserModal(userId);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const userId = btn.getAttribute('data-id');
                    if (confirm('Are you sure you want to delete this user?')) {
                        deleteUser(userId);
                    }
                });
            });
        }
    }
    
    // Filter users based on search and role filter
    function filterUsers() {
        const searchTerm = userSearch.value.toLowerCase();
        const roleFilter = userRoleFilter.value;
        
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        const filteredUsers = users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                               (user.email && user.email.toLowerCase().includes(searchTerm)) ||
                               (user.phone && user.phone.includes(searchTerm));
            
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            
            return matchesSearch && matchesRole;
        });
        
        if (userTableBody) {
            userTableBody.innerHTML = '';
            
            if (filteredUsers.length === 0) {
                const noUserRow = document.createElement('tr');
                noUserRow.innerHTML = `<td colspan="6" class="text-center">No users found</td>`;
                userTableBody.appendChild(noUserRow);
                return;
            }
            
            filteredUsers.forEach(user => {
                const row = document.createElement('tr');
                
                // Format creation date
                const createdDate = new Date(user.createdAt);
                const formattedDate = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
                
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email || '-'}</td>
                    <td>${user.phone || '-'}</td>
                    <td><span class="role-badge ${user.role}">${user.role}</span></td>
                    <td>${formattedDate}</td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${user.id}">Edit</button>
                        <button class="delete-btn" data-id="${user.id}" ${user.role === 'admin' ? 'disabled' : ''}>Delete</button>
                    </td>
                `;
                
                userTableBody.appendChild(row);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const userId = btn.getAttribute('data-id');
                    openUserModal(userId);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const userId = btn.getAttribute('data-id');
                    if (confirm('Are you sure you want to delete this user?')) {
                        deleteUser(userId);
                    }
                });
            });
        }
    }
    
    // Open user modal for create/edit
    function openUserModal(userId = null) {
        if (!userModal || !userForm || !modalTitle) return;
        
        // Reset form
        userForm.reset();
        userMessage.textContent = '';
        userMessage.className = 'message';
        
        if (userId) {
            // Edit existing user
            const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
            const user = users.find(u => u.id === userId);
            
            if (!user) {
                alert('User not found');
                return;
            }
            
            modalTitle.textContent = 'Edit User';
            userForm.setAttribute('data-user-id', userId);
            
            document.getElementById('user-name').value = user.name;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-phone').value = user.phone;
            document.getElementById('user-role').value = user.role;
            
            // Password field is optional for edit
            document.getElementById('user-password').required = false;
            document.querySelector('label[for="user-password"]').textContent = 'Password (leave blank to keep current)';
        } else {
            // Create new user
            modalTitle.textContent = 'Add New User';
            userForm.removeAttribute('data-user-id');
            
            // Password field is required for new users
            document.getElementById('user-password').required = true;
            document.querySelector('label[for="user-password"]').textContent = 'Password *';
        }
        
        userModal.classList.add('active');
    }
    
    // Create a new user
    function createUser(name, email, phone, role, password) {
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        
        // Check if email already exists
        if (email && users.some(user => user.email === email)) {
            showMessage(userMessage, 'Email is already registered', 'error');
            return;
        }
        
        // Check if phone already exists
        if (phone && users.some(user => user.phone === phone)) {
            showMessage(userMessage, 'Phone number is already registered', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            name,
            email: email || '',
            phone: phone || '',
            password,
            role,
            cart: [],
            wishlist: [],
            createdAt: new Date().toISOString()
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('tgenUsers', JSON.stringify(users));
        
        // Show success message
        showMessage(userMessage, 'User created successfully', 'success');
        
        // Reload users list
        loadUsers();
        
        // Close modal after delay
        setTimeout(() => {
            userModal.classList.remove('active');
        }, 1500);
    }
    
    // Update existing user
    function updateUser(userId, name, email, phone, role, password) {
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            showMessage(userMessage, 'User not found', 'error');
            return;
        }
        
        // Check if email already exists for other users
        if (email && users.some(user => user.email === email && user.id !== userId)) {
            showMessage(userMessage, 'Email is already registered', 'error');
            return;
        }
        
        // Check if phone already exists for other users
        if (phone && users.some(user => user.phone === phone && user.id !== userId)) {
            showMessage(userMessage, 'Phone number is already registered', 'error');
            return;
        }
        
        // Update user data
        users[userIndex].name = name;
        users[userIndex].email = email || '';
        users[userIndex].phone = phone || '';
        users[userIndex].role = role;
        
        // Update password only if provided
        if (password) {
            users[userIndex].password = password;
        }
        
        // Save to localStorage
        localStorage.setItem('tgenUsers', JSON.stringify(users));
        
        // Update session if it's the current user
        const currentUser = window.authUtils.getCurrentUser();
        if (currentUser && currentUser.userId === userId) {
            const session = {
                ...currentUser,
                name: name,
                email: email || '',
                phone: phone || '',
                role: role
            };
            localStorage.setItem('tgenUserSession', JSON.stringify(session));
        }
        
        // Show success message
        showMessage(userMessage, 'User updated successfully', 'success');
        
        // Reload users list
        loadUsers();
        
        // Close modal after delay
        setTimeout(() => {
            userModal.classList.remove('active');
        }, 1500);
    }
    
    // Delete a user
    function deleteUser(userId) {
        const users = JSON.parse(localStorage.getItem('tgenUsers')) || [];
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            alert('User not found');
            return;
        }
        
        // Prevent deleting admin users
        if (users[userIndex].role === 'admin') {
            alert('Cannot delete admin users');
            return;
        }
        
        // Remove user from array
        users.splice(userIndex, 1);
        
        // Save to localStorage
        localStorage.setItem('tgenUsers', JSON.stringify(users));
        
        // Reload users list
        loadUsers();
    }
    
    // Show message in user modal
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `message ${type}`;
    }
});
