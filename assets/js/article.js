// JavaScript pour la page d'article individuel

// Fonction pour obtenir les paramètres d'URL
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    for (const pair of pairs) {
        const [key, value] = pair.split('=');
        if (key) {
            params[key] = decodeURIComponent(value || '');
        }
    }
    
    return params;
}

// Fonction pour afficher un article
function displayArticle(article) {
    const articleContainer = document.getElementById('article-content');
    
    if (!article) {
        articleContainer.innerHTML = '<div class="error-message">Article not found.</div>';
        return;
    }
    
    // Formater les catégories
    const categoriesHTML = article.categories.map(catId => {
        const category = getAllCategories().find(c => c.id === catId);
        return `<span class="blog-post-category">${category ? category.name : catId}</span>`;
    }).join('');
    
    // Mise à jour du contenu
    articleContainer.innerHTML = `
        <div class="back-to-blog">
            <a href="blog.html">← Back to Blog</a>
        </div>
        <img src="${article.image}" alt="${article.title}" class="blog-post-image">
        <div class="blog-post-meta">
            <span>${article.date}</span>
            <span>By ${article.author}</span>
        </div>
        <div class="blog-post-categories">
            ${categoriesHTML}
        </div>
        <h1>${article.title}</h1>
        <div class="article-content">
            ${article.content}
        </div>
        <div class="article-share">
            <span>Share this article:</span>
            <div class="share-buttons">
                <a href="#" aria-label="Share on Twitter">🐦</a>
                <a href="#" aria-label="Share on Facebook">📱</a>
                <a href="#" aria-label="Share on LinkedIn">📋</a>
                <a href="#" aria-label="Share by Email">✉️</a>
            </div>
        </div>
    `;
    
    // Mettre à jour le titre de la page
    document.title = `${article.title} - TGen ROBOTICS`;
}

// Fonction pour trouver les articles suivants et précédents
function findAdjacentArticles(currentId) {
    const allPosts = getAllPosts();
    const currentIndex = allPosts.findIndex(post => post.id === parseInt(currentId));
    
    let prevArticle = null;
    let nextArticle = null;
    
    if (currentIndex > 0) {
        prevArticle = allPosts[currentIndex - 1];
    }
    
    if (currentIndex < allPosts.length - 1) {
        nextArticle = allPosts[currentIndex + 1];
    }
    
    return { prevArticle, nextArticle };
}

// Fonction pour mettre à jour les liens de navigation entre articles
function updateArticleNavigation(prevArticle, nextArticle) {
    const prevLink = document.getElementById('prev-article');
    const nextLink = document.getElementById('next-article');
    const prevTitle = document.getElementById('prev-article-title');
    const nextTitle = document.getElementById('next-article-title');
    
    if (prevArticle) {
        prevLink.href = `article.html?id=${prevArticle.id}`;
        prevTitle.textContent = prevArticle.title;
        prevLink.style.display = 'block';
    } else {
        prevLink.style.display = 'none';
    }
    
    if (nextArticle) {
        nextLink.href = `article.html?id=${nextArticle.id}`;
        nextTitle.textContent = nextArticle.title;
        nextLink.style.display = 'block';
    } else {
        nextLink.style.display = 'none';
    }
}

// Fonction pour trouver des articles similaires (basés sur les catégories)
function findRelatedArticles(currentArticle, maxCount = 3) {
    if (!currentArticle) return [];
    
    const allPosts = getAllPosts();
    
    // Exclure l'article actuel
    const otherPosts = allPosts.filter(post => post.id !== currentArticle.id);
    
    // Calculer un score de similarité basé sur les catégories communes
    const scoredPosts = otherPosts.map(post => {
        const commonCategories = post.categories.filter(cat => 
            currentArticle.categories.includes(cat)
        );
        
        return {
            post,
            score: commonCategories.length
        };
    });
    
    // Trier par score (plus de catégories communes = plus similaire)
    scoredPosts.sort((a, b) => b.score - a.score);
    
    // Prendre les N premiers articles avec au moins une catégorie en commun
    return scoredPosts
        .filter(item => item.score > 0)
        .slice(0, maxCount)
        .map(item => item.post);
}

// Fonction pour afficher les articles similaires
function displayRelatedArticles(relatedArticles) {
    const container = document.getElementById('related-articles-container');
    
    if (!relatedArticles || relatedArticles.length === 0) {
        container.innerHTML = '<p>No related articles found.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    relatedArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'related-article';
        
        articleElement.innerHTML = `
            <a href="article.html?id=${article.id}">
                <img src="${article.image}" alt="${article.title}">
                <h4>${article.title}</h4>
                <span class="related-article-date">${article.date}</span>
            </a>
        `;
        
        container.appendChild(articleElement);
    });
}

// Fonction d'initialisation de la page d'article
function initArticlePage() {
    // Initialiser les données du blog
    initBlogData();
    
    // Obtenir l'ID de l'article depuis l'URL
    const urlParams = getUrlParams();
    const articleId = urlParams.id;
    
    if (!articleId) {
        // Rediriger vers la page de blog si aucun ID n'est spécifié
        window.location.href = 'blog.html';
        return;
    }
    
    // Récupérer l'article
    const article = getPostById(parseInt(articleId));
    
    if (!article) {
        // Article non trouvé
        const articleContainer = document.getElementById('article-content');
        articleContainer.innerHTML = `
            <div class="error-message">
                <h2>Article not found</h2>
                <p>The article you are looking for might have been removed or doesn't exist.</p>
                <a href="blog.html" class="cta-button">Back to Blog</a>
            </div>
        `;
        
        // Masquer les sections non pertinentes
        document.querySelector('.article-navigation').style.display = 'none';
        document.querySelector('.related-articles').style.display = 'none';
        
        return;
    }
    
    // Afficher l'article
    displayArticle(article);
    
    // Trouver et afficher les articles adjacents
    const { prevArticle, nextArticle } = findAdjacentArticles(articleId);
    updateArticleNavigation(prevArticle, nextArticle);
    
    // Trouver et afficher les articles similaires
    const relatedArticles = findRelatedArticles(article);
    displayRelatedArticles(relatedArticles);
}

// Démarrer l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initArticlePage);
