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
                    <div style="display: flex; align-items: center; margin-bottom: 5px;">
                        <input type="text" id="hero-bg" placeholder="URL de l'image" style="flex-grow: 1; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <input type="file" id="hero-bg-upload" accept="image/*" style="display: none;">
                        <button id="hero-bg-upload-btn" style="width: 100%; padding: 8px; background: rgba(3, 169, 244, 0.1); border: 1px solid rgba(3, 169, 244, 0.3); color: var(--primary); border-radius: 5px; cursor: pointer; margin-top: 5px;">Choisir un fichier</button>
                    </div>
                    <div id="hero-bg-preview" style="width: 100%; height: 80px; margin-top: 5px; background-size: cover; background-position: center; border-radius: 5px; display: none;"></div>
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Catalogue</label>
                    <div style="display: flex; align-items: center; margin-bottom: 5px;">
                        <input type="text" id="catalog-bg" placeholder="URL de l'image" style="flex-grow: 1; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <input type="file" id="catalog-bg-upload" accept="image/*" style="display: none;">
                        <button id="catalog-bg-upload-btn" style="width: 100%; padding: 8px; background: rgba(3, 169, 244, 0.1); border: 1px solid rgba(3, 169, 244, 0.3); color: var(--primary); border-radius: 5px; cursor: pointer; margin-top: 5px;">Choisir un fichier</button>
                    </div>
                    <div id="catalog-bg-preview" style="width: 100%; height: 80px; margin-top: 5px; background-size: cover; background-position: center; border-radius: 5px; display: none;"></div>
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Services</label>
                    <div style="display: flex; align-items: center; margin-bottom: 5px;">
                        <input type="text" id="services-bg" placeholder="URL de l'image" style="flex-grow: 1; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <input type="file" id="services-bg-upload" accept="image/*" style="display: none;">
                        <button id="services-bg-upload-btn" style="width: 100%; padding: 8px; background: rgba(3, 169, 244, 0.1); border: 1px solid rgba(3, 169, 244, 0.3); color: var(--primary); border-radius: 5px; cursor: pointer; margin-top: 5px;">Choisir un fichier</button>
                    </div>
                    <div id="services-bg-preview" style="width: 100%; height: 80px; margin-top: 5px; background-size: cover; background-position: center; border-radius: 5px; display: none;"></div>
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Blog</label>
                    <div style="display: flex; align-items: center; margin-bottom: 5px;">
                        <input type="text" id="blog-bg" placeholder="URL de l'image" style="flex-grow: 1; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <input type="file" id="blog-bg-upload" accept="image/*" style="display: none;">
                        <button id="blog-bg-upload-btn" style="width: 100%; padding: 8px; background: rgba(3, 169, 244, 0.1); border: 1px solid rgba(3, 169, 244, 0.3); color: var(--primary); border-radius: 5px; cursor: pointer; margin-top: 5px;">Choisir un fichier</button>
                    </div>
                    <div id="blog-bg-preview" style="width: 100%; height: 80px; margin-top: 5px; background-size: cover; background-position: center; border-radius: 5px; display: none;"></div>
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">À propos</label>
                    <div style="display: flex; align-items: center; margin-bottom: 5px;">
                        <input type="text" id="about-bg" placeholder="URL de l'image" style="flex-grow: 1; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <input type="file" id="about-bg-upload" accept="image/*" style="display: none;">
                        <button id="about-bg-upload-btn" style="width: 100%; padding: 8px; background: rgba(3, 169, 244, 0.1); border: 1px solid rgba(3, 169, 244, 0.3); color: var(--primary); border-radius: 5px; cursor: pointer; margin-top: 5px;">Choisir un fichier</button>
                    </div>
                    <div id="about-bg-preview" style="width: 100%; height: 80px; margin-top: 5px; background-size: cover; background-position: center; border-radius: 5px; display: none;"></div>
                </div>
                
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--text);">Contact</label>
                    <div style="display: flex; align-items: center; margin-bottom: 5px;">
                        <input type="text" id="contact-bg" placeholder="URL de l'image" style="flex-grow: 1; padding: 8px; background: rgba(10, 10, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text); border-radius: 5px;">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <input type="file" id="contact-bg-upload" accept="image/*" style="display: none;">
                        <button id="contact-bg-upload-btn" style="width: 100%; padding: 8px; background: rgba(3, 169, 244, 0.1); border: 1px solid rgba(3, 169, 244, 0.3); color: var(--primary); border-radius: 5px; cursor: pointer; margin-top: 5px;">Choisir un fichier</button>
                    </div>
                    <div id="contact-bg-preview" style="width: 100%; height: 80px; margin-top: 5px; background-size: cover; background-position: center; border-radius: 5px; display: none;"></div>
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
        
        // Initialiser les gestionnaires d'événements pour les uploads de fichiers
        initFileUploads();
        
        // Charger les valeurs actuelles
        loadCurrentValues();
        
        // Événements pour les boutons
        document.getElementById('save-customizations').addEventListener('click', saveChanges);
        document.getElementById('reset-customizations').addEventListener('click', resetCustomizations);
    }
    
    /**
     * Initialise les gestionnaires d'événements pour les uploads de fichiers
     */
    function initFileUploads() {
        // Pages à configurer
        const pages = ['hero', 'catalog', 'services', 'blog', 'about', 'contact'];
        
        pages.forEach(page => {
            const uploadBtn = document.getElementById(`${page}-bg-upload-btn`);
            const fileInput = document.getElementById(`${page}-bg-upload`);
            const preview = document.getElementById(`${page}-bg-preview`);
            const urlInput = document.getElementById(`${page}-bg`);
            
            if (!uploadBtn || !fileInput) return;
            
            // Ouvrir le sélecteur de fichier au clic sur le bouton
            uploadBtn.addEventListener('click', () => {
                fileInput.click();
            });
            
            // Gérer la sélection de fichier
            fileInput.addEventListener('change', () => {
                if (fileInput.files && fileInput.files[0]) {
                    const file = fileInput.files[0];
                    
                    // Vérifier la taille du fichier
                    if (file.size > 5 * 1024 * 1024) { // 5MB
                        showNotification('L\'image est trop grande. Taille maximale: 5MB', 3000, true);
                        fileInput.value = '';
                        return;
                    }
                    
                    // Créer un aperçu de l'image
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (preview) {
                            preview.style.backgroundImage = `url('${e.target.result}')`;
                            preview.style.display = 'block';
                        }
                        
                        // Stocker temporairement la donnée de l'image (base64)
                        fileInput.dataset.imageData = e.target.result;
                        
                        // Mettre à jour le champ URL avec un message indiquant que l'image sera utilisée
                        urlInput.value = `data:uploaded:${file.name}`;
                        urlInput.style.color = '#4CAF50';
                    };
                    reader.readAsDataURL(file);
                    
                    // Changer le texte du bouton pour indiquer que le fichier est sélectionné
                    uploadBtn.textContent = `Fichier: ${file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}`;
                }
            });
            
            // Surveiller les changements dans le champ URL
            urlInput.addEventListener('input', () => {
                // Si l'utilisateur saisit quelque chose manuellement, réinitialiser la prévisualisation et les données d'image
                if (!urlInput.value.startsWith('data:uploaded:')) {
                    fileInput.value = '';
                    uploadBtn.textContent = 'Choisir un fichier';
                    if (preview) {
                        preview.style.display = 'none';
                    }
                    delete fileInput.dataset.imageData;
                    urlInput.style.color = '';
                }
            });
        });
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
        // Préparation des données de personnalisation
        const customizationData = {
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
        
        // Traitement des images téléchargées
        const pages = ['hero', 'catalog', 'services', 'blog', 'about', 'contact'];
        let hasUploads = false;
        
        pages.forEach(page => {
            const fileInput = document.getElementById(`${page}-bg-upload`);
            // Si une image a été téléchargée, utiliser directement les données base64
            if (fileInput && fileInput.dataset.imageData && customizationData.backgrounds[page].startsWith('data:uploaded:')) {
                customizationData.backgrounds[page] = fileInput.dataset.imageData;
                hasUploads = true;
            }
        });
        
        // Enregistrer les personnalisations
        saveCustomizations(customizationData);
        
        // Appliquer les changements
        applyCustomizations(customizationData);
        
        // Notification de succès
        showNotification('Les personnalisations ont été enregistrées avec succès !');
        
        // Information supplémentaire si des images ont été téléchargées
        if (hasUploads) {
            showNotification('Les images téléchargées sont stockées dans votre navigateur et ne seront visibles que par vous.', 6000);
        }
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
        
        // Réinitialiser les éléments d'interface
        const pages = ['hero', 'catalog', 'services', 'blog', 'about', 'contact'];
        pages.forEach(page => {
            const fileInput = document.getElementById(`${page}-bg-upload`);
            const uploadBtn = document.getElementById(`${page}-bg-upload-btn`);
            const preview = document.getElementById(`${page}-bg-preview`);
            
            if (fileInput) fileInput.value = '';
            if (uploadBtn) uploadBtn.textContent = 'Choisir un fichier';
            if (preview) preview.style.display = 'none';
            if (fileInput) delete fileInput.dataset.imageData;
        });
        
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
    function showNotification(message, duration = 3000, isError = false) {
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = 'site-customizer-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${isError ? '❌' : '✓'}</div>
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
        
        // Icône de succès ou d'erreur
        const icon = notification.querySelector('.notification-icon');
        icon.style.color = isError ? '#f44336' : '#4CAF50';
        icon.style.marginRight = '10px';
        icon.style.fontSize = '20px';
        
        // Ajouter au document
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Supprimer après le délai spécifié
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Supprimer l'élément après la fin de l'animation
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
    
    // Appliquer les personnalisations au chargement
    applyCustomizations(customizations);
});
