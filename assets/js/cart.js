/**
 * Cart JavaScript for TGen Robotics Website
 */

const cartUtils = (function() {
    // Private variables
    const CART_STORAGE_KEY = 'tgen_cart';
    
    // Get cart from local storage
    const getCart = function() {
        const cartData = localStorage.getItem(CART_STORAGE_KEY);
        return cartData ? JSON.parse(cartData) : [];
    };
    
    // Save cart to local storage
    const saveCart = function(cart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    };
    
    // Calculate cart total
    const calculateTotal = function(cart) {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };
    
    // Update cart UI
    const updateCartUI = function() {
        const cart = getCart();
        const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
        const cartTotal = calculateTotal(cart);
        
        // Update cart count
        if (window.updateCartCount) {
            window.updateCartCount(cartCount);
        }
        
        // Update mini cart
        const miniCartItems = document.querySelector('.mini-cart-items');
        const miniCartTotal = document.querySelector('.mini-cart-total');
        
        if (miniCartItems) {
            if (cart.length === 0) {
                miniCartItems.innerHTML = '<div class="mini-cart-empty">Your cart is empty</div>';
            } else {
                let itemsHTML = '';
                
                cart.forEach(item => {
                    itemsHTML += `
                        <div class="mini-cart-item" data-id="${item.id}">
                            <img src="${item.image}" alt="${item.name}" class="mini-cart-item-image">
                            <div class="mini-cart-item-info">
                                <div class="mini-cart-item-title">${item.name}</div>
                                <div class="mini-cart-item-price">€${item.price.toFixed(2)}</div>
                                <div class="mini-cart-item-quantity">Qty: ${item.quantity}</div>
                            </div>
                            <button class="mini-cart-item-remove" data-id="${item.id}">×</button>
                        </div>
                    `;
                });
                
                miniCartItems.innerHTML = itemsHTML;
                
                // Add event listeners for remove buttons
                const removeButtons = miniCartItems.querySelectorAll('.mini-cart-item-remove');
                removeButtons.forEach(button => {
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        const id = this.getAttribute('data-id');
                        cartUtils.removeFromCart(id);
                    });
                });
            }
        }
        
        if (miniCartTotal) {
            miniCartTotal.textContent = `€${cartTotal.toFixed(2)}`;
        }
    };
    
    // Public methods
    return {
        // Add item to cart
        addToCart: function(item) {
            const cart = getCart();
            const existingItem = cart.find(cartItem => cartItem.id === item.id);
            
            if (existingItem) {
                existingItem.quantity += item.quantity || 1;
            } else {
                cart.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: item.quantity || 1
                });
            }
            
            saveCart(cart);
            updateCartUI();
            
            // Show notification
            if (window.showCartNotification) {
                window.showCartNotification();
            }
        },
        
        // Remove item from cart
        removeFromCart: function(itemId) {
            let cart = getCart();
            cart = cart.filter(item => item.id !== itemId);
            saveCart(cart);
            updateCartUI();
        },
        
        // Update item quantity
        updateQuantity: function(itemId, quantity) {
            const cart = getCart();
            const item = cart.find(item => item.id === itemId);
            
            if (item) {
                item.quantity = quantity;
                
                if (item.quantity <= 0) {
                    return this.removeFromCart(itemId);
                }
            }
            
            saveCart(cart);
            updateCartUI();
        },
        
        // Clear cart
        clearCart: function() {
            saveCart([]);
            updateCartUI();
        },
        
        // Get cart
        getCart: getCart,
        
        // Calculate total
        calculateTotal: calculateTotal,
        
        // Initialize cart
        init: function() {
            updateCartUI();
            
            // Add event listeners for add to cart buttons
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const productCard = this.closest('.product-card');
                    if (!productCard) return;
                    
                    const id = productCard.getAttribute('data-id');
                    const name = productCard.querySelector('.product-title').textContent;
                    const priceText = productCard.querySelector('.product-price').textContent;
                    const price = parseFloat(priceText.replace('€', '').trim());
                    const image = productCard.querySelector('.product-image').getAttribute('src');
                    
                    cartUtils.addToCart({
                        id: id,
                        name: name,
                        price: price,
                        image: image,
                        quantity: 1
                    });
                });
            });
        }
    };
})();

// Initialize cart on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    cartUtils.init();
});