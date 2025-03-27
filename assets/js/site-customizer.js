/**
 * TGen ROBOTICS Site Customizer
 * 
 * Ce script facilite la personnalisation du site, y compris les images de fond,
 * les couleurs et autres éléments visuels. Il n'est accessible qu'aux administrateurs.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si l'utilisateur est connecté en tant qu'admin
    const user = window.authUtils ? window.authUtils.getCurrentUser() : null;
    const isAdmin = user && user.role === 'admin';
    
    // Ne rien faire si l'utilisateur n'est pas admin
    if (!isAdmin) return;
    
    // Charger les personnalisations existantes
    const customizations = loadCustomizations();
    
    // Créer un bouton flottant pour ouvrir le panneau de personnalisation
    createCustomizerButton();
    
    // Initialiser le panneau de personnalisation
    initCustomizerPanel();
    
    /**
     * Charge les personnalisations depuis le localStorage
     */
    function loadCustomizations() {
        return JSON.parse(localStorage.getItem('tgenSiteCustomizations')) || {
            backgrounds: {
                hero: '',
                catalog: '',
                services: '',
                blog: '',
                about: '',
                contact: ''
            },
            colors: {
                primary: '#03A9F4',
                secondary: '#00E5FF',
                accent: '#29c6ff',
                dark: '#121212',
                light: '#f8f9fa',
                text: '#e0e0e0'
            }
        };
    }
    
    /**
     * Sauvegarde les personnalisations dans localStorage
     */
    function saveCustomizations(customizations) {
        localStorage.setItem('tgenSiteCustomizations', JSON.stringify(customizations));
    }
    
    /**
     * Crée un bouton flottant pour accéder au customizer
     */
    function createCustomizerButton() {
        const button = document.createElement('button');
        button.id = 'customizer-button';
        button.textContent = '✨';
        button.title = 'Personnaliser le site';
        
        // Style du bouton
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.borderRadius = '50%';
        button.style.background = 'linear-gradient(90deg, var(--primary), var(--secondary))';
        button.style.color = 'var(--dark)';
        button.style.border = 'none';
        button.style.fontSize = '24px';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        button.style.zIndex = '9999';
        
        // Effet hover
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
        
        // Ouvrir le customizer au clic
        button.addEventListener('click', () => {
            toggleCustomizerPanel();
        });
        
        document.body.appendChild(button);
    }
    
    /**
     * Initialise le panneau de personnalisation
     */
    function initCustomizerPanel() {
        const panel = document.createElement('div');
        panel.id = 'customizer-panel';
        
        // Style du panneau
        panel.style.position = 'fixed';
        panel.style.top = '0';
        panel.style.right = '-350px'; // Caché par défaut
        panel.style.width = '350px';
        panel.style.height = '100vh';
        panel.style.backgroundColor = 'var(--dark)';
        panel.style.borderLeft = '1px solid rgba(255, 255, 255, 0.1)';
        panel.style.padding = '20px';
        panel.style.overflowY = 'auto';
        panel.style.zIndex = '9998';
        panel.style.transition = 'right 0.3s ease';
        panel.style.boxShadow = '-5px 0 15px rgba(0, 0, 0, 0.3)';
        
        // Contenu du panneau
        panel.innerHTML = `
            <div class="customizer-header">
                <h2 style="margin: 0 0 20px 0; color: var(--primary); font-size: 24px;">Personnalisation du site</h2>
                <button id="close-customizer" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: var(--text); font-size: 20px; cursor: pointer;">&times;</button>
            </div>
            
            <div class="customizer-section">
                <h3 style="margin: 0 0 15px 0; font-size: 18px; color: var(--primary);">Images de fond</h3>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Page d'accueil</label>
                    <input type="text" id="hero-bg" placeholder="URL de l'image" style="width: 100%; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Catalogue</label>
                    <input type="text" id="catalog-bg" placeholder="URL de l'image" style="width: 100%; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Services</label>
                    <input type="text" id="services-bg" placeholder="URL de l'image" style="width: 100%; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Blog</label>
                    <input type="text" id="blog-bg" placeholder="URL de l'image" style="width: 100%; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">À propos</label>
                    <input type="text" id="about-bg" placeholder="URL de l'image" style="width: 100%; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Contact</label>
                    <input type="text" id="contact-bg" placeholder="URL de l'image" style="width: 100%; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                </div>
            </div>
            
            <div class="customizer-section" style="margin-top: 30px;">
                <h3 style="margin: 0 0 15px 0; font-size: 18px; color: var(--primary);">Couleurs</h3>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Couleur principale</label>
                    <input type="color" id="primary-color" style="width: 100%; padding: 0; height: 40px; border: none; border-radius: 5px; cursor: pointer;">
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Couleur secondaire</label>
                    <input type="color" id="secondary-color" style="width: 100%; padding: 0; height: 40px; border: none; border-radius: 5px; cursor: pointer;">
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Couleur d'accent</label>
                    <input type="color" id="accent-color" style="width: 100%; padding: 0; height: 40px; border: none; border-radius: 5px; cursor: pointer;">
                </div>
            </div>
            
            <div class="customizer-actions" style="margin-top: 30px; display: flex; justify-content: space-between;">
                <button id="reset-customizations" style="padding: 10px 20px; background: rgba(244, 67, 54, 0.1); color: #f44336; border: 1px solid rgba(244, 67, 54, 0.3); border-radius: 5px; cursor: pointer;">Réinitialiser</button>
                <button id="save-customizations" style="padding: 10px 20px; background: linear-gradient(90deg, var(--primary), var(--secondary)); color: var(--dark); border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Enregistrer</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Fermeture du panneau
        document.getElementById('close-customizer').addEventListener('click', () => {
            toggleCustomizerPanel(false);
        });
        
        // Charger les valeurs actuelles
        loadCurrentValues();
        
        // Événements pour les boutons
        document.getElementById('save-customizations').addEventListener('click', saveChanges);
        document.getElementById('reset-customizations').addEventListener('click', resetCustomizations);
    }
    
    /**
     * Charge les valeurs actuelles dans le formulaire
     */
    function loadCurrentValues() {
        const customizations = loadCustomizations();
        
        // Images de fond
        document.getElementById('hero-bg').value = customizations.backgrounds.hero || '';
        document.getElementById('catalog-bg').value = customizations.backgrounds.catalog || '';
        document.getElementById('services-bg').value = customizations.backgrounds.services || '';
        document.getElementById('blog-bg').value = customizations.backgrounds.blog || '';
        document.getElementById('about-bg').value = customizations.backgrounds.about || '';
        document.getElementById('contact-bg').value = customizations.backgrounds.contact || '';
        
        // Couleurs
        document.getElementById('primary-color').value = customizations.colors.primary;
        document.getElementById('secondary-color').value = customizations.colors.secondary;
        document.getElementById('accent-color').value = customizations.colors.accent;
    }
    
    /**
     * Affiche ou masque le panneau de personnalisation
     */
    function toggleCustomizerPanel(show) {
        const panel = document.getElementById('customizer-panel');
        if (!panel) return;
        
        if (show === undefined) {
            // Toggle si aucune valeur n'est spécifiée
            show = panel.style.right === '-350px';
        }
        
        panel.style.right = show ? '0' : '-350px';
    }
    
    /**
     * Sauvegarde les modifications
     */
    function saveChanges() {
        const customizations = {
            backgrounds: {
                hero: document.getElementById('hero-bg').value,
                catalog: document.getElementById('catalog-bg').value,
                services: document.getElementById('services-bg').value,
                blog: document.getElementById('blog-bg').value,
                about: document.getElementById('about-bg').value,
                contact: document.getElementById('contact-bg').value
            },
            colors: {
                primary: document.getElementById('primary-color').value,
                secondary: document.getElementById('secondary-color').value,
                accent: document.getElementById('accent-color').value,
                dark: '#121212', // Valeurs par défaut
                light: '#f8f9fa',
                text: '#e0e0e0'
            }
        };
        
        // Enregistrer les personnalisations
        saveCustomizations(customizations);
        
        // Appliquer les changements
        applyCustomizations(customizations);
        
        // Notification de succès
        showNotification('Les personnalisations ont été enregistrées avec succès !');
    }
    
    /**
     * Réinitialise toutes les personnalisations
     */
    function resetCustomizations() {
        if (!confirm('Êtes-vous sûr de vouloir réinitialiser toutes les personnalisations ?')) {
            return;
        }
        
        // Supprimer les personnalisations stockées
        localStorage.removeItem('tgenSiteCustomizations');
        
        // Recharger les valeurs par défaut
        loadCurrentValues();
        
        // Appliquer les valeurs par défaut
        applyCustomizations(loadCustomizations());
        
        // Notification
        showNotification('Les personnalisations ont été réinitialisées.');
    }
    
    /**
     * Applique les personnalisations à la page courante
     */
    function applyCustomizations(customizations) {
        // Appliquer les images de fond
        applyBackgroundImages(customizations.backgrounds);
        
        // Appliquer les couleurs
        applyColors(customizations.colors);
    }
    
    /**
     * Applique les images de fond aux sections appropriées
     */
    function applyBackgroundImages(backgrounds) {
        // Pour chaque section avec une image de fond
        for (const [key, url] of Object.entries(backgrounds)) {
            if (!url) continue;
            
            // Trouver l'élément correspondant
            let selector;
            switch (key) {
                case 'hero': selector = '.hero'; break;
                case 'catalog': selector = '.catalog-hero'; break;
                case 'services': selector = '.services-hero'; break;
                case 'blog': selector = '.blog-hero'; break;
                case 'about': selector = '.about-hero'; break;
                case 'contact': selector = '.contact-hero'; break;
                default: continue;
            }
            
            const element = document.querySelector(selector);
            if (!element) continue;
            
            // Appliquer l'image de fond
            element.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${url}')`;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
        }
    }
    
    /**
     * Applique les couleurs personnalisées
     */
    function applyColors(colors) {
        // Créer une feuille de style pour les couleurs personnalisées
        let styleElement = document.getElementById('custom-colors-style');
        
        // Créer l'élément s'il n'existe pas
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'custom-colors-style';
            document.head.appendChild(styleElement);
        }
        
        // Définir les variables CSS
        styleElement.textContent = `
            :root {
                --primary: ${colors.primary};
                --secondary: ${colors.secondary};
                --accent: ${colors.accent};
                --dark: ${colors.dark};
                --light: ${colors.light};
                --text: ${colors.text};
            }
        `;
    }
    
    /**
     * Affiche une notification
     */
    function showNotification(message) {
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = 'site-customizer-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">✓</div>
                <div class="notification-message">${message}</div>
            </div>
        `;
        
        // Style de la notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '20px';
        notification.style.padding = '15px 20px';
        notification.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
        notification.style.color = '#fff';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        notification.style.zIndex = '10000';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Icône de succès
        const icon = notification.querySelector('.notification-icon');
        icon.style.color = '#4CAF50';
        icon.style.marginRight = '10px';
        icon.style.fontSize = '20px';
        
        // Ajouter au document
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Supprimer l'élément après la fin de l'animation
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Appliquer les personnalisations au chargement
    applyCustomizations(customizations);
});
