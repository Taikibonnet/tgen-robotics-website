// Système de gestion de blog pour TGen Robotics

// Configuration du stockage local pour simuler une base de données
const BLOG_POSTS_KEY = 'tgen_blog_posts';
const BLOG_CATEGORIES_KEY = 'tgen_blog_categories';

// Catégories par défaut
const DEFAULT_CATEGORIES = [
    { id: 'robotics', name: 'Robotics' },
    { id: 'ai', name: 'Artificial Intelligence' },
    { id: 'automation', name: 'Automation' },
    { id: 'industry', name: 'Industry News' }
];

// Articles par défaut
const DEFAULT_POSTS = [
    {
        id: 1,
        title: 'The Future of Autonomous Robots in Manufacturing',
        excerpt: 'How autonomous robots are transforming the manufacturing industry with enhanced AI capabilities and advanced sensors.',
        content: `
            <p>The manufacturing industry is on the verge of a major transformation, driven by advancements in autonomous robotics. These sophisticated machines are no longer just performing repetitive tasks – they're making decisions, adapting to changing environments, and working alongside humans more safely and efficiently than ever before.</p>
            
            <h2>AI-Powered Decision Making</h2>
            <p>Modern autonomous robots are equipped with advanced AI algorithms that enable them to make decisions based on real-time data. This capability allows them to optimize workflows, identify quality issues, and even predict maintenance needs before equipment failures occur.</p>
            
            <p>According to recent studies, manufacturing facilities that have implemented AI-driven autonomous robots have seen productivity increases of up to 30% and defect reduction rates of 25%.</p>
            
            <h2>Enhanced Sensing Capabilities</h2>
            <p>The latest generation of industrial robots comes equipped with an impressive array of sensors, including 3D vision systems, pressure sensors, and even tactile feedback mechanisms. These sensory inputs provide robots with unprecedented awareness of their surroundings.</p>
            
            <p>This enhanced perception allows robots to:</p>
            <ul>
                <li>Identify and pick up irregularly shaped objects</li>
                <li>Work safely alongside human workers</li>
                <li>Adapt to changes in the production environment</li>
                <li>Perform quality control inspections with greater accuracy</li>
            </ul>
            
            <h2>Collaborative Potential</h2>
            <p>Perhaps the most exciting development in autonomous robotics is the rise of collaborative robots, or "cobots." These machines are designed specifically to work alongside human operators, combining the strength and precision of robotics with the problem-solving skills and adaptability of humans.</p>
            
            <p>As safety technology improves, we're seeing more applications where robots and humans share workspaces without the need for physical barriers, leading to more flexible and efficient production layouts.</p>
            
            <h2>The Road Ahead</h2>
            <p>While challenges remain in terms of initial investment costs and integration with legacy systems, the trajectory is clear. Autonomous robots will continue to become more capable, more flexible, and more integrated into manufacturing processes.</p>
            
            <p>For manufacturers looking to stay competitive in the coming decade, investment in autonomous robotics isn't just an option – it's increasingly becoming a necessity.</p>
        `,
        image: '/api/placeholder/800/400',
        author: 'Dr. Elena Kazan',
        date: 'March 15, 2025',
        categories: ['robotics', 'automation', 'industry'],
        featured: true
    },
    {
        id: 2,
        title: 'Breakthrough in Robot Learning Algorithms',
        excerpt: 'New research at TGen Robotics has led to significant improvements in how robots learn from their environments and human demonstrations.',
        content: `
            <p>In a significant breakthrough for the field of robotics, researchers at TGen Robotics have developed a new learning algorithm that dramatically reduces the time required for robots to master complex tasks.</p>
            
            <h2>Learning from Demonstration</h2>
            <p>Traditional robot programming requires extensive coding for each specific task a robot needs to perform. Our new approach, however, allows robots to learn by observing human demonstrations and then generalizing that knowledge to similar situations.</p>
            
            <p>"We've reduced the learning time by nearly 80% compared to previous methods," explains Dr. Takahashi, lead researcher on the project. "What used to take weeks of training can now be accomplished in days or even hours."</p>
            
            <h2>Transfer Learning Capabilities</h2>
            <p>One of the most promising aspects of this new algorithm is its ability to transfer knowledge between different tasks. Once a robot learns a basic skill, it can adapt that knowledge to new scenarios without starting from scratch.</p>
            
            <p>For example, a robot trained to pick up and place rectangular objects can quickly adapt to handling circular or irregularly shaped items with minimal additional training.</p>
            
            <h2>Real-World Applications</h2>
            <p>The implications for industry are substantial. Robots equipped with these learning capabilities can be deployed much faster in new environments and can adapt to changing production requirements without extensive reprogramming.</p>
            
            <p>Early adopters in the automotive sector have reported setup time reductions of up to 65% when implementing robots with our new learning algorithms.</p>
            
            <h2>Looking Forward</h2>
            <p>As we continue to refine these algorithms, we anticipate even greater improvements in learning efficiency and adaptability. The next phase of research focuses on enabling robots to collaborate and share their learned knowledge, creating a network effect that could accelerate learning even further.</p>
            
            <p>This breakthrough represents a significant step toward truly adaptive and intelligent robotic systems that can thrive in dynamic, real-world environments.</p>
        `,
        image: '/api/placeholder/800/400',
        author: 'Toshiro Mifune',
        date: 'March 5, 2025',
        categories: ['robotics', 'ai'],
        featured: true
    },
    {
        id: 3,
        title: 'How AI is Improving Robot Precision in Micro-Assembly',
        excerpt: 'Artificial intelligence algorithms are enabling robots to achieve unprecedented precision in micro-electronics assembly.',
        content: `
            <p>In the world of micro-electronics, where components are measured in micrometers, precision is everything. A new generation of AI-controlled robots is revolutionizing this field, achieving levels of accuracy that were previously thought impossible.</p>
            
            <h2>The Precision Challenge</h2>
            <p>Assembling modern electronic devices requires positioning components with tolerances as small as 10 micrometers—about one-tenth the width of a human hair. Traditional robotics struggle with consistency at this scale, where even tiny environmental factors can affect performance.</p>
            
            <p>AI-powered systems, however, are changing the game by continuously learning and adapting to these micro-variations.</p>
            
            <h2>Adaptive Control Systems</h2>
            <p>The key innovation lies in adaptive control systems that combine multiple sensor inputs with deep learning algorithms. These systems can detect and compensate for vibrations, thermal expansion, and even air currents that might affect positioning accuracy.</p>
            
            <p>"We're essentially giving robots the ability to 'feel' at the microscopic level," explains Dr. Li Wei, head of micro-assembly research at TGen Robotics. "They can sense and adjust for disturbances humans can't even perceive."</p>
            
            <h2>Real-Time Adaptation</h2>
            <p>Unlike traditional programmed robots, AI-powered assembly systems improve over time. They learn from each assembly operation, building a database of experiences that helps them anticipate and prevent potential errors.</p>
            
            <p>In one pilot project, error rates decreased by 87% over a three-month period as the system continuously refined its approach.</p>
            
            <h2>Industry Impact</h2>
            <p>The implications for electronics manufacturing are profound. More precise assembly means:</p>
            <ul>
                <li>Higher yield rates in production</li>
                <li>More reliable electronic components</li>
                <li>The ability to create even smaller and more complex devices</li>
                <li>Reduced waste and rework</li>
            </ul>
            
            <h2>Future Developments</h2>
            <p>As these AI systems continue to evolve, we expect to see them applied to increasingly demanding tasks, potentially including medical device assembly, optical component manufacturing, and quantum computing hardware.</p>
            
            <p>The fusion of artificial intelligence with high-precision robotics is opening new frontiers in manufacturing that will drive the next generation of electronic innovation.</p>
        `,
        image: '/api/placeholder/800/400',
        author: 'Maria Rodriguez',
        date: 'February 22, 2025',
        categories: ['robotics', 'ai'],
        featured: false
    }
];

// Initialiser les données du blog si elles n'existent pas
function initBlogData() {
    if (!localStorage.getItem(BLOG_POSTS_KEY)) {
        localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(DEFAULT_POSTS));
    }
    
    if (!localStorage.getItem(BLOG_CATEGORIES_KEY)) {
        localStorage.setItem(BLOG_CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    }
}

// Récupérer tous les articles
function getAllPosts() {
    const posts = JSON.parse(localStorage.getItem(BLOG_POSTS_KEY) || '[]');
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date (plus récent en premier)
}

// Récupérer un article par son ID
function getPostById(id) {
    const posts = getAllPosts();
    return posts.find(post => post.id === parseInt(id));
}

// Récupérer les articles par catégorie
function getPostsByCategory(categoryId) {
    if (categoryId === 'all') {
        return getAllPosts();
    }
    
    const posts = getAllPosts();
    return posts.filter(post => post.categories.includes(categoryId));
}

// Récupérer toutes les catégories
function getAllCategories() {
    return JSON.parse(localStorage.getItem(BLOG_CATEGORIES_KEY) || '[]');
}

// Ajouter un nouvel article
function addPost(post) {
    const posts = getAllPosts();
    
    // Générer un nouvel ID
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    post.id = newId;
    
    // Ajouter la date si elle n'est pas fournie
    if (!post.date) {
        const now = new Date();
        post.date = now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    // Ajouter le nouvel article
    posts.push(post);
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
    
    return newId;
}

// Mettre à jour un article existant
function updatePost(updatedPost) {
    const posts = getAllPosts();
    const index = posts.findIndex(post => post.id === updatedPost.id);
    
    if (index !== -1) {
        posts[index] = updatedPost;
        localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
        return true;
    }
    
    return false;
}

// Supprimer un article
function deletePost(id) {
    const posts = getAllPosts();
    const filteredPosts = posts.filter(post => post.id !== parseInt(id));
    
    if (filteredPosts.length < posts.length) {
        localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(filteredPosts));
        return true;
    }
    
    return false;
}

// Fonction pour créer un élément HTML d'article
function createPostElement(post) {
    const postElement = document.createElement('article');
    postElement.className = 'blog-post';
    
    // Créer les catégories
    const categoriesHTML = post.categories.map(catId => {
        const category = getAllCategories().find(c => c.id === catId);
        return `<span class="blog-post-category">${category ? category.name : catId}</span>`;
    }).join('');
    
    postElement.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-post-image">
        <div class="blog-post-content">
            <div class="blog-post-meta">
                <span>${post.date}</span>
                <span>By ${post.author}</span>
            </div>
            <div class="blog-post-categories">
                ${categoriesHTML}
            </div>
            <h2>${post.title}</h2>
            <p>${post.excerpt}</p>
            <a href="article.html?id=${post.id}" class="read-more-btn">Read full article <span>→</span></a>
        </div>
    `;
    
    return postElement;
}

// Fonction pour afficher les articles sur la page
function displayPosts(posts, container) {
    container.innerHTML = '';
    
    if (posts.length === 0) {
        container.innerHTML = '<div class="no-posts">No articles found for this category.</div>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
    
    // Ajouter la pagination si nécessaire
    if (posts.length > 5) {
        const paginationElement = document.createElement('div');
        paginationElement.className = 'pagination';
        paginationElement.innerHTML = `
            <a href="#" class="pagination-btn active">1</a>
            <a href="#" class="pagination-btn">2</a>
            <a href="#" class="pagination-btn">3</a>
            <a href="#" class="pagination-btn">→</a>
        `;
        container.appendChild(paginationElement);
    }
}

// Fonction pour afficher les articles récents dans la sidebar
function displayRecentPosts(container) {
    const posts = getAllPosts().slice(0, 5); // Prendre les 5 articles les plus récents
    container.innerHTML = '';
    
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="article.html?id=${post.id}">${post.title}</a>
            <span class="recent-post-date">${post.date}</span>
        `;
        container.appendChild(listItem);
    });
}

// Fonction pour gérer le filtrage par catégorie
function setupCategoryFilters() {
    const categoryLinks = document.querySelectorAll('.category-list a');
    const postsContainer = document.getElementById('blog-posts-container');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Mettre à jour la classe active
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Filtrer les articles
            const categoryId = link.getAttribute('data-category');
            const filteredPosts = getPostsByCategory(categoryId);
            
            // Afficher les articles filtrés
            displayPosts(filteredPosts, postsContainer);
        });
    });
}

// Fonction pour configurer le formulaire d'inscription à la newsletter
function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            // Simuler l'envoi d'un email (dans une application réelle, cela enverrait à un serveur)
            console.log(`Newsletter subscription for: ${email}`);
            
            // Afficher un message de confirmation
            form.innerHTML = '<p class="success-message">Thank you for subscribing to our newsletter!</p>';
        });
    }
}

// Fonction d'initialisation de la page blog
function initBlogPage() {
    // Initialiser les données
    initBlogData();
    
    // Récupérer les conteneurs
    const postsContainer = document.getElementById('blog-posts-container');
    const recentPostsList = document.getElementById('recent-posts-list');
    
    if (postsContainer) {
        // Afficher tous les articles
        const posts = getAllPosts();
        displayPosts(posts, postsContainer);
    }
    
    if (recentPostsList) {
        // Afficher les articles récents
        displayRecentPosts(recentPostsList);
    }
    
    // Configurer les filtres par catégorie
    setupCategoryFilters();
    
    // Configurer le formulaire de newsletter
    setupNewsletterForm();
    
    // Ajouter le bouton d'administration si l'utilisateur est connecté
    // Dans une application réelle, on vérifierait les droits d'accès
    const adminButton = document.createElement('a');
    adminButton.href = 'admin.html';
    adminButton.className = 'admin-link';
    adminButton.textContent = 'Admin';
    document.body.appendChild(adminButton);
}

// Démarrer l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initBlogPage);
