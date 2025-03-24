# TGen Robotics - Intégration des fonctionnalités globales

Ce guide explique comment intégrer les fonctionnalités de panier et d'authentification sur toutes les pages du site TGen Robotics.

## Intégration du système d'authentification et du panier

### 1. Fichiers CSS à inclure

Ajoutez ces fichiers CSS dans le `<head>` de chaque page HTML du site :

```html
<link rel="stylesheet" href="assets/css/cart.css">
<link rel="stylesheet" href="assets/css/cart-notification.css">
```

### 2. Barre de navigation avec panier

Pour ajouter la barre de navigation avec l'icône du panier dans toutes les pages du site, remplacez le contenu du `<header>` existant par le code suivant :

```html
<header>
    <div class="logo">
        <object type="image/svg+xml" data="assets/images/logo-tgen.svg" width="200" height="70">
            TGen ROBOTICS
        </object>
    </div>
    <nav>
        <ul>
            <li><a href="index.html" id="nav-home">Home</a></li>
            <li><a href="services.html" id="nav-services">Services</a></li>
            <li><a href="catalog.html" id="nav-catalog">Catalog</a></li>
            <li><a href="blog.html" id="nav-blog">Blog</a></li>
            <li><a href="about.html" id="nav-about">About Us</a></li>
            <li><a href="contact.html" id="nav-contact">Contact</a></li>
            <li><a href="login.html" id="login-link">Login</a></li>
            <li>
                <a href="cart.html" class="cart-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span class="cart-count">0</span>
                </a>
                <div class="mini-cart">
                    <div class="mini-cart-header">
                        <h3>Your Cart</h3>
                    </div>
                    <div class="mini-cart-items">
                        <!-- Cart items will be loaded here -->
                    </div>
                    <div class="mini-cart-footer">
                        <div class="mini-cart-total-label">Total:</div>
                        <div class="mini-cart-total">€0.00</div>
                        <div class="mini-cart-buttons">
                            <a href="cart.html" class="button">View Cart</a>
                            <a href="checkout.html" class="button primary">Checkout</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </nav>
    <div id="mobile-menu-toggle" class="mobile-menu-toggle">
        <span></span>
        <span></span>
        <span></span>
    </div>
</header>
```

### 3. Navigation mobile

Remplacez également la navigation mobile existante par celle-ci, qui inclut le lien vers le panier :

```html
<nav id="mobile-nav" class="mobile-nav">
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="catalog.html">Catalog</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="cart.html">Cart <span class="cart-count">0</span></a></li>
    </ul>
</nav>
```

### 4. Fichiers JavaScript à inclure

Ajoutez ces scripts JavaScript juste avant la fermeture de la balise `</body>` de chaque page HTML :

```html
<script src="assets/js/main.js"></script>
<script src="assets/js/auth.js"></script>
<script src="assets/js/cart.js"></script>
<script>
    // Update login link based on authentication status
    document.addEventListener('DOMContentLoaded', function() {
        // Check if auth utilities exist and user is logged in
        if (window.authUtils) {
            const user = window.authUtils.getCurrentUser();
            const loginLink = document.getElementById('login-link');
            
            if (user && loginLink) {
                // Change login link to account link
                loginLink.textContent = 'My Account';
                loginLink.href = user.role === 'admin' ? 'admin.html' : 'account.html';
            }
        }
        
        // Set active navigation item
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === '' || currentPage === 'index.html') {
            document.getElementById('nav-home')?.classList.add('active');
        } else if (currentPage === 'services.html') {
            document.getElementById('nav-services')?.classList.add('active');
        } else if (currentPage === 'catalog.html') {
            document.getElementById('nav-catalog')?.classList.add('active');
        } else if (currentPage === 'blog.html') {
            document.getElementById('nav-blog')?.classList.add('active');
        } else if (currentPage === 'about.html') {
            document.getElementById('nav-about')?.classList.add('active');
        } else if (currentPage === 'contact.html') {
            document.getElementById('nav-contact')?.classList.add('active');
        }
    });
</script>
```

### 5. Notification d'ajout au panier

Ajoutez ce HTML juste avant la fermeture de la balise `</body>` pour activer les notifications d'ajout au panier :

```html
<!-- Add to Cart Success Message -->
<div id="cart-notification" class="cart-notification">
    <div class="notification-content">
        <div class="notification-icon">✓</div>
        <div class="notification-message">Product added to cart!</div>
    </div>
</div>
```

## Informations importantes pour l'administrateur

### Accès administrateur
- **Email** : tgen.robotics@gmail.com
- **Mot de passe** : Admin123!

### Fonctionnalités administrateur
1. Gestion des utilisateurs
2. Gestion des produits du catalogue
3. Gestion des articles de blog
4. Paramètres du site

## Modèle HTML complet

Un modèle HTML complet pour la barre de navigation avec panier et authentification est disponible dans le fichier `header-template.html`. Vous pouvez copier-coller ce modèle dans toutes les pages du site pour assurer une expérience cohérente.

## Notes techniques

- Le système utilise le `localStorage` du navigateur pour stocker :
  - Les données utilisateur (`tgenUsers`)
  - La session active (`tgenUserSession`)
  - Le contenu du panier (`tgenCart`)
  - 
- Dans un environnement de production, ce système devrait être remplacé par des API backend et une base de données.
