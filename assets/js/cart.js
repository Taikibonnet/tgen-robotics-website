/**
 * Shopping Cart System for TGen ROBOTICS
 * 
 * This file handles shopping cart functionality including adding/removing items,
 * updating quantities, calculating totals, and checkout process.
 */

// Cart object to handle all cart functionality
const Cart = {
    // Get the current cart from localStorage
    getCart: function() {
        const cart = JSON.parse(localStorage.getItem('tgenCart')) || [];
        return cart;
    },
    
    // Save the cart to localStorage
    saveCart: function(cart) {
        localStorage.setItem('tgenCart', JSON.stringify(cart));
    },
    
    // Add item to cart
    addItem: function(product, quantity = 1) {
        // Validate input
        if (!product || !product.id) {
            console.error('Invalid product object');
            return false;
        }
        
        quantity = parseInt(quantity);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }
        
        let cart = this.getCart();
        
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item => item.productId === product.id);
        
        if (existingItemIndex !== -1) {
            // Update quantity if product already in cart
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new product to cart
            cart.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        // Save updated cart
        this.saveCart(cart);
        
        // Trigger cart updated event
        this.triggerCartUpdated();
        
        return true;
    },
    
    // Remove item from cart
    removeItem: function(productId) {
        let cart = this.getCart();
        
        // Filter out the product
        cart = cart.filter(item => item.productId !== productId);
        
        // Save updated cart
        this.saveCart(cart);
        
        // Trigger cart updated event
        this.triggerCartUpdated();
        
        return true;
    },
    
    // Update item quantity
    updateQuantity: function(productId, quantity) {
        quantity = parseInt(quantity);
        if (isNaN(quantity) || quantity < 1) {
            return false;
        }
        
        let cart = this.getCart();
        
        // Find the product
        const itemIndex = cart.findIndex(item => item.productId === productId);
        
        if (itemIndex === -1) {
            return false;
        }
        
        // Update quantity
        cart[itemIndex].quantity = quantity;
        
        // Save updated cart
        this.saveCart(cart);
        
        // Trigger cart updated event
        this.triggerCartUpdated();
        
        return true;
    },
    
    // Clear the entire cart
    clearCart: function() {
        localStorage.removeItem('tgenCart');
        
        // Trigger cart updated event
        this.triggerCartUpdated();
    },
    
    // Get the number of items in cart
    getItemCount: function() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },
    
    // Calculate the cart total
    getTotal: function() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Trigger custom event when cart is updated
    triggerCartUpdated: function() {
        const event = new CustomEvent('cartUpdated', {
            detail: {
                itemCount: this.getItemCount(),
                total: this.getTotal()
            }
        });
        document.dispatchEvent(event);
    },
    
    // Initialize the cart UI
    initCartUI: function() {
        // Update cart count in header
        this.updateCartCount();
        
        // Listen for cart updates
        document.addEventListener('cartUpdated', () => {
            this.updateCartCount();
        });
        
        // Initialize cart page if we're on it
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
        
        // Initialize mini-cart
        this.initMiniCart();
    },
    
    // Update cart count display in header
    updateCartCount: function() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const itemCount = this.getItemCount();
        
        cartCountElements.forEach(element => {
            element.textContent = itemCount;
            
            // Show/hide based on whether there are items
            if (itemCount > 0) {
                element.classList.add('has-items');
            } else {
                element.classList.remove('has-items');
            }
        });
    },
    
    // Render the cart page
    renderCartPage: function() {
        const cartContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        
        if (!cartContainer) return;
        
        const cart = this.getCart();
        
        if (cart.length === 0) {
            // Cart is empty
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <h3>Your cart is empty</h3>
                    <p>You haven't added any products to your cart yet.</p>
                    <a href="catalog.html" class="button">Browse Products</a>
                </div>
            `;
            
            if (cartSummary) {
                cartSummary.style.display = 'none';
            }
            
            return;
        }
        
        // Cart has items
        let cartHTML = '';
        
        cart.forEach(item => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            
            cartHTML += `
                <div class="cart-item" data-id="${item.productId}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <div class="cart-item-total">€${itemTotal}</div>
                    <button class="remove-item">✕</button>
                </div>
            `;
        });
        
        cartContainer.innerHTML = cartHTML;
        
        // Calculate and display summary
        if (cartSummary) {
            const subtotal = this.getTotal();
            const shippingFee = subtotal > 500 ? 0 : 30; // Free shipping over €500
            const total = subtotal + shippingFee;
            
            cartSummary.innerHTML = `
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>€${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>${shippingFee === 0 ? 'Free' : '€' + shippingFee.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>€${total.toFixed(2)}</span>
                </div>
                <button id="checkout-button" class="button primary">Proceed to Checkout</button>
            `;
            
            cartSummary.style.display = 'block';
            
            // Add checkout button event
            document.getElementById('checkout-button').addEventListener('click', () => {
                // Check if user is logged in
                const session = window.authUtils ? window.authUtils.getCurrentUser() : null;
                
                if (session && session.loggedIn) {
                    // Proceed to checkout
                    window.location.href = 'checkout.html';
                } else {
                    // Redirect to login
                    window.location.href = 'login.html?redirect=checkout';
                }
            });
        }
        
        // Add event listeners for cart item actions
        this.initCartPageEvents();
    },
    
    // Initialize events for cart page
    initCartPageEvents: function() {
        // Quantity decrease buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                const container = e.target.closest('.cart-item');
                const productId = container.getAttribute('data-id');
                const input = container.querySelector('.quantity-input');
                let quantity = parseInt(input.value) - 1;
                
                if (quantity < 1) quantity = 1;
                input.value = quantity;
                
                this.updateQuantity(productId, quantity);
                this.updateCartItemTotal(container, quantity);
            });
        });
        
        // Quantity increase buttons
        document.querySelectorAll('.quantity-btn.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                const container = e.target.closest('.cart-item');
                const productId = container.getAttribute('data-id');
                const input = container.querySelector('.quantity-input');
                let quantity = parseInt(input.value) + 1;
                
                input.value = quantity;
                
                this.updateQuantity(productId, quantity);
                this.updateCartItemTotal(container, quantity);
            });
        });
        
        // Quantity input changes
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const container = e.target.closest('.cart-item');
                const productId = container.getAttribute('data-id');
                let quantity = parseInt(e.target.value);
                
                if (isNaN(quantity) || quantity < 1) {
                    quantity = 1;
                    e.target.value = 1;
                }
                
                this.updateQuantity(productId, quantity);
                this.updateCartItemTotal(container, quantity);
            });
        });
        
        // Remove item buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const container = e.target.closest('.cart-item');
                const productId = container.getAttribute('data-id');
                
                this.removeItem(productId);
                
                // Re-render the cart page
                this.renderCartPage();
            });
        });
    },
    
    // Update the total for a cart item
    updateCartItemTotal: function(container, quantity) {
        const productId = container.getAttribute('data-id');
        const cart = this.getCart();
        const item = cart.find(item => item.productId === productId);
        
        if (!item) return;
        
        const itemTotal = (item.price * quantity).toFixed(2);
        container.querySelector('.cart-item-total').textContent = `€${itemTotal}`;
        
        // Update summary
        if (document.getElementById('cart-summary')) {
            const subtotal = this.getTotal();
            const shippingFee = subtotal > 500 ? 0 : 30;
            const total = subtotal + shippingFee;
            
            document.querySelector('#cart-summary .summary-row:nth-child(1) span:last-child').textContent = `€${subtotal.toFixed(2)}`;
            document.querySelector('#cart-summary .summary-row:nth-child(2) span:last-child').textContent = shippingFee === 0 ? 'Free' : `€${shippingFee.toFixed(2)}`;
            document.querySelector('#cart-summary .summary-row.total span:last-child').textContent = `€${total.toFixed(2)}`;
        }
    },
    
    // Initialize mini-cart dropdown
    initMiniCart: function() {
        const cartIcon = document.querySelector('.cart-icon');
        const miniCart = document.querySelector('.mini-cart');
        
        if (!cartIcon || !miniCart) return;
        
        // Toggle mini-cart on cart icon click
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            miniCart.classList.toggle('active');
            
            // Update mini-cart content
            Cart.updateMiniCart();
        });
        
        // Close mini-cart when clicking outside
        document.addEventListener('click', function(e) {
            if (!cartIcon.contains(e.target) && !miniCart.contains(e.target)) {
                miniCart.classList.remove('active');
            }
        });
    },
    
    // Update mini-cart content
    updateMiniCart: function() {
        const miniCart = document.querySelector('.mini-cart');
        if (!miniCart) return;
        
        const cart = this.getCart();
        const miniCartItems = miniCart.querySelector('.mini-cart-items');
        const miniCartTotal = miniCart.querySelector('.mini-cart-total');
        
        if (cart.length === 0) {
            // Empty cart
            miniCartItems.innerHTML = '<div class="empty-mini-cart">Your cart is empty</div>';
            miniCartTotal.textContent = '€0.00';
            return;
        }
        
        // Display cart items
        let itemsHTML = '';
        
        cart.forEach(item => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            
            itemsHTML += `
                <div class="mini-cart-item" data-id="${item.productId}">
                    <div class="mini-cart-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="mini-cart-details">
                        <h4>${item.name}</h4>
                        <div class="mini-cart-price">
                            <span>${item.quantity} × €${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="mini-cart-remove">✕</button>
                </div>
            `;
        });
        
        miniCartItems.innerHTML = itemsHTML;
        miniCartTotal.textContent = `€${this.getTotal().toFixed(2)}`;
        
        // Add event listeners for removing items
        document.querySelectorAll('.mini-cart-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const container = e.target.closest('.mini-cart-item');
                const productId = container.getAttribute('data-id');
                
                this.removeItem(productId);
                
                // Update mini-cart
                this.updateMiniCart();
            });
        });
    }
};

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    Cart.initCartUI();
});
