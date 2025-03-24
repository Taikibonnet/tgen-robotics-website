/**
 * TGen ROBOTICS Catalog Administration
 * 
 * This file contains the functionality for administrators to manage the catalog:
 * - Adding new products
 * - Editing existing products
 * - Deleting products
 * - Exporting changes to JSON
 * 
 * To access admin mode: Double-click on the catalog title
 * Default admin password: admin123
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const catalogTitle = document.querySelector('.catalog-hero h1');
    const adminPanel = document.createElement('div');
    const catalogGrid = document.getElementById('catalog-grid');
    
    // Admin state
    let isAdminMode = false;
    let currentProductId = null;
    let workingProductsData = [...CATALOG_PRODUCTS]; // Make a copy for working with

    // Create the admin panel
    initAdminPanel();

    // Listen for double click on catalog title to activate admin mode
    catalogTitle.addEventListener('dblclick', () => {
        const adminPassword = prompt("Entrez le mot de passe administrateur:");
        if (adminPassword === "admin123") { // Change this to your preferred password
            toggleAdminMode(true);
        } else if (adminPassword !== null) {
            alert("Mot de passe incorrect.");
        }
    });

    // Initialize the admin panel
    function initAdminPanel() {
        adminPanel.className = 'admin-panel';
        adminPanel.style.display = 'none';
        adminPanel.innerHTML = `
            <div class="admin-header">
                <h2>Mode Administrateur</h2>
                <div class="admin-actions">
                    <button id="addProductBtn" class="admin-btn add-btn">Ajouter un Robot</button>
                    <button id="exportBtn" class="admin-btn export-btn">Exporter les Changements</button>
                    <button id="exitAdminBtn" class="admin-btn exit-btn">Quitter Mode Admin</button>
                </div>
            </div>
            
            <div id="productForm" class="product-form" style="display: none;">
                <h3 id="formTitle">Ajouter un Robot</h3>
                <form id="productDataForm">
                    <input type="hidden" id="productId">
                    
                    <div class="form-group">
                        <label for="productName">Nom du Robot:</label>
                        <input type="text" id="productName" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="productCategory">Catégorie:</label>
                        <select id="productCategory" required>
                            <option value="industrial">Industriel</option>
                            <option value="construction">Construction</option>
                            <option value="domestic">Domestique</option>
                            <option value="healthcare">Médical</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="productPrice">Prix:</label>
                        <input type="text" id="productPrice" placeholder="ex: €12,499.99 ou 'Contact pour prix'" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="productImage">Image URL:</label>
                        <input type="text" id="productImage" placeholder="/api/placeholder/400/300">
                        <p class="form-help">Chemin relatif vers l'image ou URL placeholder</p>
                    </div>
                    
                    <div class="form-group">
                        <label for="productShortDesc">Description Courte:</label>
                        <textarea id="productShortDesc" rows="3" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="productLongDesc">Description Détaillée:</label>
                        <textarea id="productLongDesc" rows="5" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Produit Vedette:</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="productFeatured" value="true"> Oui
                            </label>
                            <label>
                                <input type="radio" name="productFeatured" value="false" checked> Non
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="productSpecs">Spécifications (une par ligne, format "Nom: Valeur"):</label>
                        <textarea id="productSpecs" rows="7" placeholder="Charge utile: 7.5 kg&#10;Portée: 1850 mm&#10;Degrés de liberté: 6" required></textarea>
                    </div>
                    
                    <div class="form-buttons">
                        <button type="submit" class="form-btn submit-btn">Enregistrer</button>
                        <button type="button" id="cancelFormBtn" class="form-btn cancel-btn">Annuler</button>
                    </div>
                </form>
            </div>
        `;
        
        // Insert admin panel after catalog filter section
        const catalogFilter = document.querySelector('.catalog-filter');
        catalogFilter.parentNode.insertBefore(adminPanel, catalogFilter.nextSibling);
        
        // Add event listeners for admin panel buttons
        adminPanel.querySelector('#addProductBtn').addEventListener('click', showAddProductForm);
        adminPanel.querySelector('#exportBtn').addEventListener('click', exportProducts);
        adminPanel.querySelector('#exitAdminBtn').addEventListener('click', () => toggleAdminMode(false));
        adminPanel.querySelector('#cancelFormBtn').addEventListener('click', hideProductForm);
        
        // Add form submission handler
        const productDataForm = adminPanel.querySelector('#productDataForm');
        productDataForm.addEventListener('submit', handleProductFormSubmit);
    }

    // Toggle admin mode
    function toggleAdminMode(enable) {
        isAdminMode = enable;
        adminPanel.style.display = enable ? 'block' : 'none';
        
        // Reset working data when entering admin mode
        if (enable) {
            workingProductsData = [...CATALOG_PRODUCTS];
        }
        
        // Re-render products to add/remove admin controls
        renderProductsWithAdminControls();
    }

    // Show form for adding a new product
    function showAddProductForm() {
        // Reset form and set for adding mode
        const form = adminPanel.querySelector('#productDataForm');
        form.reset();
        
        adminPanel.querySelector('#formTitle').textContent = 'Ajouter un Robot';
        adminPanel.querySelector('#productId').value = '';
        adminPanel.querySelector('#productImage').value = '/api/placeholder/400/300';
        
        // Pre-select "Non" for featured products
        const featuredRadios = form.querySelectorAll('input[name="productFeatured"]');
        featuredRadios[1].checked = true;
        
        // Show the form
        adminPanel.querySelector('#productForm').style.display = 'block';
        
        // Scroll to form
        adminPanel.querySelector('#productForm').scrollIntoView({ behavior: 'smooth' });
        
        currentProductId = null;
    }

    // Show form for editing an existing product
    function showEditProductForm(productId) {
        // Find the product
        const product = workingProductsData.find(p => p.id === productId);
        if (!product) return;
        
        // Update form title and product ID
        adminPanel.querySelector('#formTitle').textContent = 'Modifier le Robot';
        adminPanel.querySelector('#productId').value = product.id;
        
        // Fill the form with product data
        adminPanel.querySelector('#productName').value = product.name;
        adminPanel.querySelector('#productCategory').value = product.category;
        adminPanel.querySelector('#productPrice').value = product.price;
        adminPanel.querySelector('#productImage').value = product.image;
        adminPanel.querySelector('#productShortDesc').value = product.shortDescription;
        adminPanel.querySelector('#productLongDesc').value = product.longDescription;
        
        // Set featured radio button
        const featuredRadios = adminPanel.querySelectorAll('input[name="productFeatured"]');
        featuredRadios[product.featured ? 0 : 1].checked = true;
        
        // Format specifications for text area
        const specsText = product.specifications.map(spec => 
            `${spec.name}: ${spec.value}`
        ).join('\n');
        adminPanel.querySelector('#productSpecs').value = specsText;
        
        // Show the form
        adminPanel.querySelector('#productForm').style.display = 'block';
        
        // Scroll to form
        adminPanel.querySelector('#productForm').scrollIntoView({ behavior: 'smooth' });
        
        currentProductId = product.id;
    }
