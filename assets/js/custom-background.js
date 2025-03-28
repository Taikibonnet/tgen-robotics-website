/**
 * Script pour s'assurer qu'aucun motif de fond croisé ne vient interférer avec les images de fond
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // S'assurer que le body n'a pas d'images de fond non désirées
    document.body.style.backgroundImage = 'none';
    
    // Fonction pour vérifier et nettoyer les fonds
    function cleanBackgrounds() {
        // Supprimer tout motif croisé qui pourrait avoir été ajouté dynamiquement
        const crossPatterns = document.querySelectorAll('.cross-pattern, .background-pattern, .grid-pattern, .pattern-overlay');
        crossPatterns.forEach(element => {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
            element.style.opacity = '0';
        });
        
        // S'assurer que les images de fond sont correctement appliquées
        const heroElement = document.querySelector('.hero');
        if (heroElement && heroElement.style.backgroundImage) {
            // S'il y a une image de fond pour le hero, supprimer tout fond du body
            document.body.style.backgroundImage = 'none';
        }
    }
    
    // Exécuter au chargement
    cleanBackgrounds();
    
    // Configurer un MutationObserver pour surveiller les changements du DOM
    const observer = new MutationObserver(mutations => {
        cleanBackgrounds();
    });
    
    // Observer le body et ses enfants pour tout changement
    observer.observe(document.body, { 
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class']
    });
});
