// Système d'authentification et de contrôle d'accès simple
// Ce script gère l'authentification de l'administrateur et les contrôles d'accès aux pages

// Fonction pour définir un cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Fonction pour obtenir un cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Fonction pour supprimer un cookie
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

// Vérifie si l'utilisateur est connecté en tant qu'administrateur
function isAdmin() {
    return getCookie("admin_logged_in") === "true";
}

// Vérifie si les services sont activés
function isServicesEnabled() {
    return localStorage.getItem("services_enabled") === "true" || isAdmin();
}

// Activer ou désactiver la visibilité de la page des services
function toggleServicesVisibility(enable) {
    localStorage.setItem("services_enabled", enable ? "true" : "false");
    alert(enable ? "La page des services est maintenant visible pour tous les utilisateurs." 
                : "La page des services est maintenant visible uniquement pour l'administrateur.");
}

// Fonction de connexion administrateur
function adminLogin(password) {
    // Mot de passe simplifié pour cet exemple - en production, utilisez un système sécurisé
    if (password === "tgen-admin-2025") {
        setCookie("admin_logged_in", "true", 1); // Connexion valide pour 1 jour
        return true;
    }
    return false;
}

// Fonction de déconnexion
function adminLogout() {
    eraseCookie("admin_logged_in");
    alert("Vous êtes déconnecté du mode administrateur.");
    // Rediriger vers la page d'accueil
    window.location.href = "index.html";
}

// Vérification de l'accès à la page des services
function checkServicesAccess() {
    // Si ce n'est pas un administrateur et que les services ne sont pas activés, rediriger
    if (!isAdmin() && !isServicesEnabled()) {
        // Rediriger vers une page de refus d'accès ou la page d'accueil
        window.location.href = "access-denied.html";
    }
}

// Initialisation des liens de navigation selon les droits d'accès
function initNavLinks() {
    // Masquer les liens vers la page des services si elle n'est pas accessible
    if (!isAdmin() && !isServicesEnabled()) {
        const serviceLinks = document.querySelectorAll('a[href="services.html"]');
        serviceLinks.forEach(link => {
            link.style.display = 'none';
        });
    }
}

// Au chargement du document, initialiser les liens de navigation
document.addEventListener('DOMContentLoaded', function() {
    initNavLinks();
});
