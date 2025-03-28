/**
 * Script de nettoyage radical des motifs de fond
 * Ce script s'exécute immédiatement et assure la suppression de tous les motifs 
 * de fond croisés qui pourraient interférer avec les images de fond
 */

// Fonction auto-exécutante pour éviter les collisions de variables
(function() {
    // S'exécute immédiatement (avant que le DOM soit complètement chargé)
    function cleanBackgroundsNow() {
        // Éléments à nettoyer
        var elementsToClean = [
            document.documentElement, // HTML
            document.body, // BODY
            // Tentative de trouver d'autres éléments sans attendre le chargement du DOM
            document.querySelector('body'),
            document.querySelector('.container'),
            document.querySelector('.hero')
        ];

        // Nettoyer chaque élément trouvé (non null)
        elementsToClean.forEach(function(el) {
            if (el) {
                // Supprimer tous les arrière-plans
                el.style.backgroundImage = 'none';
                el.style.background = 'none';
                el.classList.add('force-no-pattern');
            }
        });
    }

    // Fonction complète qui s'exécutera quand le DOM sera chargé
    function cleanBackgroundsCompletely() {
        console.log("Nettoyage des arrière-plans en cours...");
        
        // 1. Supprimer les backgrounds de tous les éléments sauf les héros
        document.querySelectorAll('*:not(.hero):not(.catalog-hero):not(.services-hero):not(.blog-hero):not(.about-hero):not(.contact-hero)').forEach(function(el) {
            el.style.backgroundImage = 'none';
            el.classList.add('force-no-pattern');
        });

        // 2. Réappliquer l'image de fond sur l'élément hero
        var heroElement = document.querySelector('.hero');
        if (heroElement) {
            heroElement.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.imgur.com/TZDg5HS.jpg')";
            heroElement.style.backgroundSize = 'cover';
            heroElement.style.backgroundPosition = 'center';
            heroElement.classList.add('force-hero-bg');
        }

        // 3. Supprimer tous les pseudo-éléments problématiques
        var styleEl = document.createElement('style');
        styleEl.textContent = `
            *::before, *::after {
                display: none !important;
                content: normal !important;
                background: none !important;
                background-image: none !important;
            }
        `;
        document.head.appendChild(styleEl);
        
        // 4. Observer les changements pour continuer à nettoyer
        observeDOMChanges();
    }

    // Observer les changements du DOM pour continuer à nettoyer si nécessaire
    function observeDOMChanges() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // ELEMENT_NODE
                            // Ne pas toucher aux éléments hero
                            if (!node.classList.contains('hero') && 
                                !node.classList.contains('catalog-hero') &&
                                !node.classList.contains('services-hero') &&
                                !node.classList.contains('blog-hero') &&
                                !node.classList.contains('about-hero') &&
                                !node.classList.contains('contact-hero')) {
                                
                                node.style.backgroundImage = 'none';
                                node.classList.add('force-no-pattern');
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    // Exécuter le nettoyage initial immédiatement
    cleanBackgroundsNow();

    // Exécuter le nettoyage complet une fois le DOM chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cleanBackgroundsCompletely);
    } else {
        cleanBackgroundsCompletely();
    }

    // Dernière vérification après chargement complet de la page
    window.addEventListener('load', function() {
        // S'assurer que le body n'a pas d'image de fond
        document.body.style.backgroundImage = 'none';
        document.body.style.background = 'none';
        
        // Réappliquer le fond au hero principal
        var heroElement = document.querySelector('.hero');
        if (heroElement) {
            heroElement.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.imgur.com/TZDg5HS.jpg')";
            heroElement.style.backgroundSize = 'cover';
            heroElement.style.backgroundPosition = 'center';
        }
    });
})();
