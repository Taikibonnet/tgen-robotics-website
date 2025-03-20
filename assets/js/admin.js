// JavaScript pour l'interface d'administration

// Variables globales
let currentPostId = null;
let confirmCallback = null;

// Initialisation de la page admin
function initAdminPage() {
    // Initialiser les données du blog
    initBlogData();
    
    // Configurer les onglets
    setupTabs();
    
    // Charger les articles
    loadPosts();
    
    // Charger les catégories
    loadCategories();
    
    // Configurer les listeners
    setupEventListeners();
}

// Configuration des onglets
function setupTabs() {
    const tabButtons = document.querySelectorAll('.admin-menu li');
    const tabContents = document.querySelectorAll('.admin-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les onglets
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            button.classList.add('active');
            
            // Afficher le contenu correspondant
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Chargement des articles dans le tableau
function loadPosts() {
    const posts = getAllPosts();
    const tableBody = document.getElementById('posts-table-body');
    const filterSelect = document.getElementById('filter-category');
    
    // Vider le tableau
    tableBody.innerHTML = '';
    
    // Remplir le tableau avec les articles
    posts.forEach(post => {
        const categoriesHTML = post.categories.map(catId => {
            const category = getAllCategories().find(c => c.id === catId);
            return `<span class="category-tag">${category ? category.name : catId}</span>`;
        }).join('');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td><div class="category-tags">${categoriesHTML}</div></td>
            <td>${post.date}</td>
            <td class="table-actions">
                <button class="admin-button edit-post" data-id="${post.id}">Edit</button>
                <button class="admin-button danger delete-post" data-id="${post.id}">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Mettre à jour les options de filtre
    updateCategoryFilter(filterSelect);
}

// Mise à jour du sélecteur de catégories
function updateCategoryFilter(selectElement) {
    const categories = getAllCategories();
    
    // Garder l'option "All Categories"
    selectElement.innerHTML = '<option value="all">All Categories</option>';
    
    // Ajouter les catégories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        selectElement.appendChild(option);
    });
}

// Chargement des catégories dans le tableau
function loadCategories() {
    const categories = getAllCategories();
    const tableBody = document.getElementById('categories-table-body');
    const checkboxesContainer = document.getElementById('categories-checkboxes');
    
    // Vider le tableau et les checkboxes
    tableBody.innerHTML = '';
    checkboxesContainer.innerHTML = '';
    
    // Remplir le tableau avec les catégories
    categories.forEach(category => {
        // Compter le nombre d'articles dans cette catégorie
        const postCount = countPostsInCategory(category.id);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>${postCount}</td>
            <td class="table-actions">
                <button class="admin-button danger delete-category" data-id="${category.id}" ${postCount > 0 ? 'disabled' : ''}>Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
        
        // Ajouter la checkbox pour le formulaire d'article
        const checkboxWrapper = document.createElement('label');
        checkboxWrapper.className = 'category-checkbox';
        checkboxWrapper.innerHTML = `
            <input type="checkbox" name="category" value="${category.id}">
            ${category.name}
        `;
        
        checkboxesContainer.appendChild(checkboxWrapper);
    });
}

// Compter le nombre d'articles dans une catégorie
function countPostsInCategory(categoryId) {
    const posts = getAllPosts();
    return posts.filter(post => post.categories.includes(categoryId)).length;
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Bouton "Add New Post"
    const addPostBtn = document.getElementById('add-post-btn');
    if (addPostBtn) {
        addPostBtn.addEventListener('click', () => {
            // Passer à l'onglet d'ajout d'article
            document.querySelector('[data-tab="add-post"]').click();
            // Réinitialiser le formulaire
            resetPostForm();
        });
    }
    
    // Bouton "Cancel" du formulaire d'article
    const cancelPostBtn = document.getElementById('cancel-post');
    if (cancelPostBtn) {
        cancelPostBtn.addEventListener('click', () => {
            // Retourner à la liste des articles
            document.querySelector('[data-tab="manage-posts"]').click();
        });
    }
    
    // Formulaire d'article
    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            savePost();
        });
    }
    
    // Bouton d'ajout de catégorie
    const addCategoryBtn = document.getElementById('add-category');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', addCategory);
    }
    
    // Boutons de suppression d'article (ajoutés dynamiquement)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-post')) {
            const postId = parseInt(e.target.getAttribute('data-id'));
            showConfirmModal(`Are you sure you want to delete this post?`, () => deletePostConfirmed(postId));
        }
        
        if (e.target.classList.contains('edit-post')) {
            const postId = parseInt(e.target.getAttribute('data-id'));
            editPost(postId);
        }
        
        if (e.target.classList.contains('delete-category')) {
            const categoryId = e.target.getAttribute('data-id');
            // Vérifier si la catégorie est utilisée
            if (countPostsInCategory(categoryId) === 0) {
                showConfirmModal(`Are you sure you want to delete this category?`, () => deleteCategoryConfirmed(categoryId));
            }
        }
    });
    
    // Boutons du modal de confirmation
    const cancelConfirmBtn = document.getElementById('cancel-confirm');
    const confirmActionBtn = document.getElementById('confirm-action');
    
    if (cancelConfirmBtn) {
        cancelConfirmBtn.addEventListener('click', hideConfirmModal);
    }
    
    if (confirmActionBtn) {
        confirmActionBtn.addEventListener('click', () => {
            if (confirmCallback) {
                confirmCallback();
            }
            hideConfirmModal();
        });
    }
    
    // Champ de recherche
    const searchInput = document.getElementById('search-posts');
    if (searchInput) {
        searchInput.addEventListener('input', filterPosts);
    }
    
    // Sélecteur de filtre
    const filterSelect = document.getElementById('filter-category');
    if (filterSelect) {
        filterSelect.addEventListener('change', filterPosts);
    }
}

// Réinitialiser le formulaire d'article
function resetPostForm() {
    const form = document.getElementById('post-form');
    const formTitle = document.getElementById('post-form-title');
    
    form.reset();
    currentPostId = null;
    document.getElementById('post-id').value = '';
    document.getElementById('post-image').value = '/api/placeholder/800/400';
    
    // Décocher toutes les catégories
    const categoryCheckboxes = document.querySelectorAll('#categories-checkboxes input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    formTitle.textContent = 'Add New Post';
}

// Éditer un article existant
function editPost(postId) {
    const post = getPostById(postId);
    
    if (!post) {
        alert('Post not found!');
        return;
    }
    
    // Passer à l'onglet d'édition
    document.querySelector('[data-tab="add-post"]').click();
    
    // Remplir le formulaire
    document.getElementById('post-id').value = post.id;
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-author').value = post.author;
    document.getElementById('post-excerpt').value = post.excerpt;
    document.getElementById('post-content').value = post.content;
    document.getElementById('post-image').value = post.image;
    document.getElementById('post-featured').checked = post.featured || false;
    
    // Cocher les catégories
    const categoryCheckboxes = document.querySelectorAll('#categories-checkboxes input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.checked = post.categories.includes(checkbox.value);
    });
    
    // Mettre à jour le titre du formulaire
    document.getElementById('post-form-title').textContent = 'Edit Post';
    
    // Stocker l'ID de l'article en cours d'édition
    currentPostId = post.id;
}

// Sauvegarder un article (nouveau ou édité)
function savePost() {
    // Récupérer les valeurs du formulaire
    const postId = document.getElementById('post-id').value;
    const title = document.getElementById('post-title').value;
    const author = document.getElementById('post-author').value;
    const excerpt = document.getElementById('post-excerpt').value;
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').value;
    const featured = document.getElementById('post-featured').checked;
    
    // Récupérer les catégories sélectionnées
    const selectedCategories = [];
    const categoryCheckboxes = document.querySelectorAll('#categories-checkboxes input[type="checkbox"]:checked');
    categoryCheckboxes.forEach(checkbox => {
        selectedCategories.push(checkbox.value);
    });
    
    // Créer l'objet article
    const post = {
        title,
        author,
        excerpt,
        content,
        image,
        featured,
        categories: selectedCategories
    };
    
    // Mettre à jour ou ajouter l'article
    if (postId) {
        post.id = parseInt(postId);
        updatePost(post);
    } else {
        addPost(post);
    }
    
    // Recharger les articles et retourner à la liste
    loadPosts();
    document.querySelector('[data-tab="manage-posts"]').click();
}

// Supprimer un article (après confirmation)
function deletePostConfirmed(postId) {
    deletePost(postId);
    loadPosts();
}

// Ajouter une nouvelle catégorie
function addCategory() {
    const categoryId = document.getElementById('category-id').value.trim();
    const categoryName = document.getElementById('category-name').value.trim();
    
    if (!categoryId || !categoryName) {
        alert('Please enter both ID and Name for the category.');
        return;
    }
    
    // Vérifier si l'ID existe déjà
    const categories = getAllCategories();
    if (categories.some(cat => cat.id === categoryId)) {
        alert('A category with this ID already exists.');
        return;
    }
    
    // Ajouter la nouvelle catégorie
    categories.push({ id: categoryId, name: categoryName });
    localStorage.setItem(BLOG_CATEGORIES_KEY, JSON.stringify(categories));
    
    // Réinitialiser le formulaire et recharger les catégories
    document.getElementById('category-id').value = '';
    document.getElementById('category-name').value = '';
    loadCategories();
    
    // Mettre à jour le filtre des articles
    const filterSelect = document.getElementById('filter-category');
    updateCategoryFilter(filterSelect);
}

// Supprimer une catégorie (après confirmation)
function deleteCategoryConfirmed(categoryId) {
    const categories = getAllCategories();
    const filteredCategories = categories.filter(cat => cat.id !== categoryId);
    
    localStorage.setItem(BLOG_CATEGORIES_KEY, JSON.stringify(filteredCategories));
    
    loadCategories();
    
    // Mettre à jour le filtre des articles
    const filterSelect = document.getElementById('filter-category');
    updateCategoryFilter(filterSelect);
}

// Filtrer les articles par recherche et catégorie
function filterPosts() {
    const searchQuery = document.getElementById('search-posts').value.toLowerCase();
    const categoryFilter = document.getElementById('filter-category').value;
    
    // Obtenir tous les articles
    let posts = getAllPosts();
    
    // Filtrer par catégorie
    if (categoryFilter !== 'all') {
        posts = posts.filter(post => post.categories.includes(categoryFilter));
    }
    
    // Filtrer par recherche
    if (searchQuery) {
        posts = posts.filter(post => 
            post.title.toLowerCase().includes(searchQuery) ||
            post.excerpt.toLowerCase().includes(searchQuery) ||
            post.author.toLowerCase().includes(searchQuery)
        );
    }
    
    // Afficher les résultats
    const tableBody = document.getElementById('posts-table-body');
    tableBody.innerHTML = '';
    
    if (posts.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No posts found matching your criteria.</td></tr>';
        return;
    }
    
    // Remplir le tableau avec les articles filtrés
    posts.forEach(post => {
        const categoriesHTML = post.categories.map(catId => {
            const category = getAllCategories().find(c => c.id === catId);
            return `<span class="category-tag">${category ? category.name : catId}</span>`;
        }).join('');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td><div class="category-tags">${categoriesHTML}</div></td>
            <td>${post.date}</td>
            <td class="table-actions">
                <button class="admin-button edit-post" data-id="${post.id}">Edit</button>
                <button class="admin-button danger delete-post" data-id="${post.id}">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Afficher le modal de confirmation
function showConfirmModal(message, callback) {
    const modal = document.getElementById('confirm-modal');
    const messageEl = document.getElementById('confirm-message');
    
    messageEl.textContent = message;
    confirmCallback = callback;
    
    modal.classList.add('active');
}

// Cacher le modal de confirmation
function hideConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    modal.classList.remove('active');
    confirmCallback = null;
}

// Démarrer l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initAdminPage);
