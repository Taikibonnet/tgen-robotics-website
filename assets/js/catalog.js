/**
 * TGen ROBOTICS Catalog Functionality
 * 
 * This file contains all the JavaScript functionality for the catalog page:
 * - Rendering products from catalog-data.js or data/robots.json
 * - Filtering products by category
 * - Searching products
 * - Product details modal
 * - Category navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const catalogGrid = document.getElementById('catalog-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('search-input');
    const productModal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalProductDetails = document.getElementById('modal-product-details');

    // Initial state
    let currentCategory = 'all';
    let currentSearchTerm = '';
    let catalogProducts = [];

    // Initialize the catalog
    initCatalog();

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current category and render products
            currentCategory = button.getAttribute('data-category');
            renderProducts();
        });
    });

    // Event listeners for category buttons in the explore section
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update filter buttons to match the category
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === category) {
                    btn.click(); // Trigger the click event on the corresponding filter button
                }
            });
            
            // Scroll to the product grid
            document.querySelector('.catalog-products').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        currentSearchTerm = searchInput.value.trim().toLowerCase();
        renderProducts();
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Initialize the catalog
    async function initCatalog() {
        // First try to load data from robots.json
        try {
            const response = await fetch('data/robots.json');
            if (response.ok) {
                const data = await response.json();
                catalogProducts = data;
                console.log('Products loaded from robots.json');
            } else {
                throw new Error('robots.json not found');
            }
        } catch (error) {
            console.log('Could not load from robots.json, using catalog-data.js instead');
            // Fallback to catalog-data.js if available
            if (typeof CATALOG_PRODUCTS !== 'undefined') {
                catalogProducts = CATALOG_PRODUCTS;
            } else {
                console.error('No product data available');
                catalogProducts = [];
            }
        }

        // Make the catalog products available globally
        window.CATALOG_PRODUCTS = catalogProducts;
        
        // Check if we have a category in the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam) {
            // If we have a category parameter, find and click the corresponding filter button
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === categoryParam) {
                    btn.click(); // This will update the currentCategory and render products
                    return;
                }
            });
        } else {
            // Otherwise, just render all products
            renderProducts();
        }
    }

    // Render products based on current filters
    function renderProducts() {
        // Clear the catalog grid
        catalogGrid.innerHTML = '';

        // Filter products based on category and search term
        let filteredProducts = catalogProducts;

        // Filter by category if not 'all'
        if (currentCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === currentCategory
            );
        }

        // Filter by search term if not empty
        if (currentSearchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(currentSearchTerm) || 
                product.shortDescription.toLowerCase().includes(currentSearchTerm) ||
                product.category.toLowerCase().includes(currentSearchTerm)
            );
        }

        // Show message if no products match the filters
        if (filteredProducts.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <p>No products match your search criteria.</p>
                <button class="reset-btn">Reset Filters</button>
            `;
            catalogGrid.appendChild(noResults);

            // Add event listener to reset button
            const resetBtn = noResults.querySelector('.reset-btn');
            resetBtn.addEventListener('click', () => {
                // Reset filters
                currentCategory = 'all';
                currentSearchTerm = '';
                searchInput.value = '';
                
                // Update active filter button
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-category') === 'all') {
                        btn.classList.add('active');
                    }
                });
                
                // Re-render products
                renderProducts();
            });
            
            return;
        }

        // Sort products: featured products first, then alphabetically
        filteredProducts.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.name.localeCompare(b.name);
        });

        // Render each product
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            catalogGrid.appendChild(productCard);
        });
    }

    // Create a product card element
    function createProductCard(product) {
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

        // Add event listener to view details button
        const viewDetailsBtn = productCard.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', () => {
            openProductModal(product);
        });

        // Add event listener to inquiry button
        const inquiryBtn = productCard.querySelector('.inquiry-btn');
        inquiryBtn.addEventListener('click', () => {
            window.location.href = `contact.html?product=${product.id}`;
        });

        return productCard;
    }

    // Open product modal with details
    function openProductModal(product) {
        // Create specifications table rows
        const specsRows = product.specifications.map(spec => `
            <tr>
                <td>${spec.name}</td>
                <td>${spec.value}</td>
            </tr>
        `).join('');

        // Populate modal with product details
        modalProductDetails.innerHTML = `
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-info">
                <h2 class="modal-product-title">${product.name}</h2>
                <span class="modal-product-category">${product.category}</span>
                <div class="modal-product-price">${product.price}</div>
                <p class="modal-product-description">${product.longDescription}</p>
                <div class="modal-product-specs">
                    <h3>Specifications</h3>
                    <table class="specs-table">
                        ${specsRows}
                    </table>
                </div>
                <div class="modal-product-actions">
                    <button class="inquiry-btn-lg" data-product-id="${product.id}">Inquire About This Product</button>
                    <button class="contact-btn">Contact Sales Team</button>
                </div>
            </div>
        `;

        // Add event listeners to modal buttons
        const inquiryBtnLg = modalProductDetails.querySelector('.inquiry-btn-lg');
        inquiryBtnLg.addEventListener('click', () => {
            window.location.href = `contact.html?product=${product.id}`;
        });

        const contactBtn = modalProductDetails.querySelector('.contact-btn');
        contactBtn.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });

        // Display the modal
        productModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
});
