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

    // Hide product form
    function hideProductForm() {
        adminPanel.querySelector('#productForm').style.display = 'none';
        currentProductId = null;
    }

    // Handle product form submission
    function handleProductFormSubmit(event) {
        event.preventDefault();
        
        // Gather form data
        const formData = {
            name: adminPanel.querySelector('#productName').value,
            category: adminPanel.querySelector('#productCategory').value,
            price: adminPanel.querySelector('#productPrice').value,
            image: adminPanel.querySelector('#productImage').value || '/api/placeholder/400/300',
            shortDescription: adminPanel.querySelector('#productShortDesc').value,
            longDescription: adminPanel.querySelector('#productLongDesc').value,
            featured: adminPanel.querySelector('input[name="productFeatured"]:checked').value === 'true',
            specifications: parseSpecifications(adminPanel.querySelector('#productSpecs').value)
        };
        
        if (currentProductId) {
            // Update existing product
            updateProduct(currentProductId, formData);
        } else {
            // Add new product
            addProduct(formData);
        }
        
        // Hide form
        hideProductForm();
        
        // Re-render products
        renderProductsWithAdminControls();
    }

    // Parse specifications from text area
    function parseSpecifications(specsText) {
        const specs = [];
        const lines = specsText.split('\n');
        
        lines.forEach(line => {
            line = line.trim();
            if (!line) return;
            
            const separatorIndex = line.indexOf(':');
            if (separatorIndex > 0) {
                const name = line.substring(0, separatorIndex).trim();
                const value = line.substring(separatorIndex + 1).trim();
                if (name && value) {
                    specs.push({ name, value });
                }
            }
        });
        
        return specs;
    }

    // Add a new product
    function addProduct(productData) {
        // Generate a new ID (max ID + 1)
        const maxId = workingProductsData.reduce((max, product) => 
            Math.max(max, product.id), 0);
        
        const newProduct = {
            id: maxId + 1,
            ...productData
        };
        
        // Add to working data
        workingProductsData.push(newProduct);
        
        // Show success message
        alert(`Le robot "${newProduct.name}" a été ajouté avec succès!`);
    }

    // Update an existing product
    function updateProduct(productId, productData) {
        const index = workingProductsData.findIndex(p => p.id === parseInt(productId));
        if (index === -1) return;
        
        // Update product while keeping its ID
        workingProductsData[index] = {
            ...workingProductsData[index],
            ...productData
        };
        
        // Show success message
        alert(`Le robot "${productData.name}" a été mis à jour avec succès!`);
    }

    // Delete a product
    function deleteProduct(productId) {
        const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce robot du catalogue?");
        if (!confirmDelete) return;
        
        const index = workingProductsData.findIndex(p => p.id === productId);
        if (index === -1) return;
        
        const deletedName = workingProductsData[index].name;
        
        // Remove from working data
        workingProductsData.splice(index, 1);
        
        // Re-render products
        renderProductsWithAdminControls();
        
        // Show success message
        alert(`Le robot "${deletedName}" a été supprimé avec succès!`);
    }

    // Export products to JSON
    function exportProducts() {
        // Format JSON with indentation
        const jsonString = JSON.stringify(workingProductsData, null, 2);
        
        // Create a modal to show the export data
        const exportModal = document.createElement('div');
        exportModal.className = 'export-modal';
        exportModal.innerHTML = `
            <div class="export-modal-content">
                <span class="close-export-modal">&times;</span>
                <h2>Exporter les Données</h2>
                <p>Pour sauvegarder les modifications, copiez ce code JSON et mettez à jour le fichier <strong>catalog-data.js</strong></p>
                <div class="export-instructions">
                    <ol>
                        <li>Copiez le contenu ci-dessous (utilisez Ctrl+A puis Ctrl+C)</li>
                        <li>Ouvrez le fichier <strong>assets/js/catalog-data.js</strong> dans votre dépôt GitHub</li>
                        <li>Remplacez le contenu de l'array <strong>CATALOG_PRODUCTS</strong> par ce nouveau contenu</li>
                    </ol>
                </div>
                <div class="json-container">
                    <pre>${jsonString}</pre>
                </div>
                <div class="export-buttons">
                    <button id="copyJsonBtn" class="export-btn copy-btn">Copier le JSON</button>
                    <button id="closeExportBtn" class="export-btn close-btn">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(exportModal);
        
        // Show the modal
        exportModal.style.display = 'flex';
        
        // Add event listener to close button
        const closeExportBtn = exportModal.querySelector('.close-export-modal');
        closeExportBtn.addEventListener('click', () => {
            document.body.removeChild(exportModal);
        });
        
        // Add event listener to copy button
        const copyJsonBtn = exportModal.querySelector('#copyJsonBtn');
        copyJsonBtn.addEventListener('click', () => {
            const jsonContainer = exportModal.querySelector('pre');
            const range = document.createRange();
            range.selectNode(jsonContainer);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            copyJsonBtn.textContent = 'Copié!';
            setTimeout(() => {
                copyJsonBtn.textContent = 'Copier le JSON';
            }, 2000);
        });
        
        // Add event listener to close button
        const closeBtn = exportModal.querySelector('#closeExportBtn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(exportModal);
        });
        
        // Close modal when clicking outside
        exportModal.addEventListener('click', (event) => {
            if (event.target === exportModal) {
                document.body.removeChild(exportModal);
            }
        });
    }

    // Render products with admin controls
    function renderProductsWithAdminControls() {
        // Prevent interference with normal catalog rendering
        const originalCatalogProducts = window.CATALOG_PRODUCTS;
        window.CATALOG_PRODUCTS = workingProductsData;
        
        // Call original render function if it exists
        if (typeof renderProducts === 'function') {
            renderProducts();
        } else {
            // Fallback if original render function is not available
            renderProductsDefault();
        }
        
        // Restore original catalog data
        window.CATALOG_PRODUCTS = originalCatalogProducts;
        
        // Add admin controls to products
        if (isAdminMode) {
            addAdminControlsToProducts();
        }
    }

    // Fallback render function
    function renderProductsDefault() {
        catalogGrid.innerHTML = '';
        
        workingProductsData.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.productId = product.id;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-category">${product.category}</div>
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price}</div>
                    <p class="product-description">${product.shortDescription}</p>
                    <div class="product-actions">
                        <button class="view-details-btn" data-product-id="${product.id}">View Details</button>
                        <button class="inquiry-btn" data-product-id="${product.id}">Inquire</button>
                    </div>
                </div>
            `;
            
            catalogGrid.appendChild(productCard);
        });
    }

    // Add admin controls to products
    function addAdminControlsToProducts() {
        const productCards = catalogGrid.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productId = parseInt(card.dataset.productId);
            
            // Create admin controls container
            const adminControls = document.createElement('div');
            adminControls.className = 'product-admin-controls';
            
            // Add edit and delete buttons
            adminControls.innerHTML = `
                <button class="admin-control-btn edit-btn" data-id="${productId}">
                    <span class="control-icon">✏️</span> Éditer
                </button>
                <button class="admin-control-btn delete-btn" data-id="${productId}">
                    <span class="control-icon">🗑️</span> Supprimer
                </button>
            `;
            
            // Add to card as first child
            card.insertBefore(adminControls, card.firstChild);
            
            // Add event listeners
            const editBtn = adminControls.querySelector('.edit-btn');
            const deleteBtn = adminControls.querySelector('.delete-btn');
            
            editBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                showEditProductForm(productId);
            });
            
            deleteBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                deleteProduct(productId);
            });
        });
    }
});

// Add admin styles
document.addEventListener('DOMContentLoaded', () => {
    const adminStyles = document.createElement('style');
    adminStyles.textContent = `
        /* Admin Panel Styles */
        .admin-panel {
            background: rgba(12, 235, 235, 0.1);
            border: 1px solid #0cebeb;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
        }

        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .admin-header h2 {
            color: #0cebeb;
            margin: 0;
        }

        .admin-actions {
            display: flex;
            gap: 10px;
        }

        .admin-btn {
            padding: 8px 15px;
            border-radius: 5px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .add-btn {
            background: linear-gradient(90deg, #0cebeb, #20e3b2);
            color: var(--dark);
        }

        .add-btn:hover {
            box-shadow: 0 5px 15px rgba(12, 235, 235, 0.3);
        }

        .export-btn {
            background: #ffb300;
            color: var(--dark);
        }

        .export-btn:hover {
            background: #ffa000;
        }

        .exit-btn {
            background: rgba(255, 255, 255, 0.2);
            color: var(--light);
        }

        .exit-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        /* Product Form Styles */
        .product-form {
            background: rgba(18, 18, 18, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }

        .product-form h3 {
            color: #0cebeb;
            margin-top: 0;
            margin-bottom: 20px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: var(--light);
            font-weight: 500;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            background: rgba(18, 18, 18, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            color: var(--light);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #0cebeb;
        }

        .form-help {
            font-size: 12px;
            color: var(--text);
            margin-top: 5px;
        }

        .radio-group {
            display: flex;
            gap: 20px;
        }

        .radio-group label {
            display: flex;
            align-items: center;
            gap: 5px;
            cursor: pointer;
        }

        .form-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 30px;
        }

        .form-btn {
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .submit-btn {
            background: linear-gradient(90deg, #0cebeb, #20e3b2);
            color: var(--dark);
        }

        .submit-btn:hover {
            box-shadow: 0 5px 15px rgba(12, 235, 235, 0.3);
        }

        .cancel-btn {
            background: rgba(255, 255, 255, 0.2);
            color: var(--light);
        }

        .cancel-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        /* Product Admin Controls */
        .product-admin-controls {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            z-index: 10;
        }

        .admin-control-btn {
            padding: 5px 10px;
            border-radius: 5px;
            border: none;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .edit-btn {
            background: rgba(12, 235, 235, 0.8);
            color: var(--dark);
        }

        .edit-btn:hover {
            background: rgba(12, 235, 235, 1);
        }

        .delete-btn {
            background: rgba(255, 87, 87, 0.8);
            color: white;
        }

        .delete-btn:hover {
            background: rgba(255, 87, 87, 1);
        }

        .control-icon {
            font-size: 14px;
        }

        /* Make room for admin controls */
        .product-card {
            position: relative;
            padding-top: 40px;
        }

        /* Export Modal Styles */
        .export-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .export-modal-content {
            background: rgba(18, 18, 18, 0.95);
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            border-radius: 10px;
            padding: 30px;
            position: relative;
            border: 1px solid #0cebeb;
            overflow: auto;
        }

        .close-export-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            color: var(--light);
            cursor: pointer;
        }

        .close-export-modal:hover {
            color: #0cebeb;
        }

        .export-modal h2 {
            color: #0cebeb;
            margin-top: 0;
            margin-bottom: 15px;
        }

        .export-modal p {
            color: var(--light);
            margin-bottom: 20px;
        }

        .export-instructions {
            background: rgba(12, 235, 235, 0.1);
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
        }

        .export-instructions ol {
            margin: 0;
            padding-left: 20px;
            color: var(--light);
        }

        .export-instructions li {
            margin-bottom: 8px;
        }

        .export-instructions li:last-child {
            margin-bottom: 0;
        }

        .json-container {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            padding: 15px;
            overflow: auto;
            max-height: 400px;
            margin-bottom: 20px;
        }

        .json-container pre {
            color: var(--text);
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .export-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        .export-btn {
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .copy-btn {
            background: linear-gradient(90deg, #0cebeb, #20e3b2);
            color: var(--dark);
        }

        .copy-btn:hover {
            box-shadow: 0 5px 15px rgba(12, 235, 235, 0.3);
        }

        .close-btn {
            background: rgba(255, 255, 255, 0.2);
            color: var(--light);
        }

        .close-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        /* Responsive styles */
        @media (max-width: 768px) {
            .admin-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
            
            .admin-actions {
                flex-wrap: wrap;
            }
            
            .product-admin-controls {
                flex-direction: column;
                gap: 5px;
            }
            
            .export-modal-content {
                padding: 20px;
            }
        }
    `;
    
    document.head.appendChild(adminStyles);
});
