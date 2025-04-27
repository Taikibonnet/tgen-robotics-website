// Encyclopedia JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the encyclopedia
    initEncyclopedia();
});

// Mock data for robots - in a real scenario, this would come from a backend API
const robotsData = [
    {
        id: 1,
        name: "TG-5000 Industrial Arm",
        category: "Industrial",
        description: "High-precision industrial robotic arm designed for manufacturing and assembly tasks.",
        shortDescription: "High-precision industrial robotic arm for manufacturing",
        images: [
            "images/robots/industrial-arm-1.jpg",
            "images/robots/industrial-arm-2.jpg",
            "images/robots/industrial-arm-3.jpg",
            "images/robots/industrial-arm-4.jpg"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        specifications: {
            "Physical": {
                "Weight": "450 kg",
                "Reach": "2.5 m",
                "Payload": "250 kg",
                "Mounting": "Floor, ceiling, wall"
            },
            "Performance": {
                "Max Speed": "180 degrees/sec",
                "Repeatability": "±0.02 mm",
                "Precision": "±0.05 mm",
                "Axes": "6-axis"
            },
            "Electrical": {
                "Power Supply": "380-480V, 3 Phase",
                "Power Consumption": "1.8 kW typical",
                "Protection Class": "IP65"
            }
        },
        features: [
            "Advanced collision detection system",
            "Integrated vision system for precision tasks",
            "Customizable end effectors for various applications",
            "Programmable through intuitive interface or API",
            "Remote monitoring and diagnostics"
        ],
        applications: [
            "Automotive assembly",
            "Electronics manufacturing",
            "Heavy material handling",
            "Precision welding",
            "CNC machine tending"
        ],
        createdAt: "2023-06-15T14:30:00Z"
    },
    {
        id: 2,
        name: "TG-Scout Explorer",
        category: "Mobile",
        description: "Autonomous mobile robot designed for exploration in challenging environments and terrains.",
        shortDescription: "Autonomous mobile robot for challenging terrain exploration",
        images: [
            "images/robots/explorer-1.jpg",
            "images/robots/explorer-2.jpg",
            "images/robots/explorer-3.jpg",
            "images/robots/explorer-4.jpg"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        specifications: {
            "Physical": {
                "Weight": "68 kg",
                "Dimensions": "80 × 60 × 40 cm",
                "Ground Clearance": "15 cm",
                "Chassis": "Ruggedized aluminum"
            },
            "Performance": {
                "Max Speed": "12 km/h",
                "Battery Life": "8 hours",
                "Climbing Ability": "45° incline",
                "Payload Capacity": "25 kg"
            },
            "Sensors": {
                "Cameras": "360° 4K vision system",
                "LIDAR": "30m range 3D scanner",
                "Other": "Thermal imaging, gas sensors, radiation detector"
            }
        },
        features: [
            "All-terrain tracked mobility system",
            "AI-powered obstacle avoidance",
            "Real-time data transmission",
            "Modular sensor platform",
            "Autonomous navigation or remote operation"
        ],
        applications: [
            "Disaster response",
            "Environmental monitoring",
            "Mining exploration",
            "Search and rescue",
            "Infrastructure inspection"
        ],
        createdAt: "2024-01-10T09:45:00Z"
    },
    {
        id: 3,
        name: "TG-Companion Home",
        category: "Service",
        description: "Friendly interactive service robot designed to assist with everyday tasks in home environments.",
        shortDescription: "Interactive service robot for home assistance",
        images: [
            "images/robots/companion-1.jpg",
            "images/robots/companion-2.jpg",
            "images/robots/companion-3.jpg",
            "images/robots/companion-4.jpg"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        specifications: {
            "Physical": {
                "Weight": "28 kg",
                "Height": "120 cm",
                "Base Diameter": "35 cm",
                "Display": "10\" touchscreen"
            },
            "Performance": {
                "Battery Life": "14 hours",
                "Max Speed": "5 km/h",
                "Voice Recognition": "8m range",
                "Lift Capacity": "3 kg"
            },
            "Connectivity": {
                "Wi-Fi": "802.11ac",
                "Bluetooth": "5.0",
                "Smart Home": "Compatible with major platforms",
                "Cellular": "4G LTE backup"
            }
        },
        features: [
            "Natural language processing for conversation",
            "Facial recognition for personalized interactions",
            "Smart home integration",
            "Health monitoring capabilities",
            "Telepresence for remote communication"
        ],
        applications: [
            "Elder care assistance",
            "Home security monitoring",
            "Entertainment and companionship",
            "Schedule management",
            "Smart home control hub"
        ],
        createdAt: "2023-11-05T16:20:00Z"
    },
    {
        id: 4,
        name: "TG-Surgical Assistant",
        category: "Medical",
        description: "Ultra-precise robotic system designed to assist surgeons in complex minimally invasive procedures.",
        shortDescription: "Robotic system for minimally invasive surgical procedures",
        images: [
            "images/robots/surgical-1.jpg",
            "images/robots/surgical-2.jpg",
            "images/robots/surgical-3.jpg",
            "images/robots/surgical-4.jpg"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        specifications: {
            "Physical": {
                "Arms": "4 independent manipulators",
                "Weight": "820 kg",
                "Footprint": "2.2 × 1.8 m",
                "Sterility": "Full sterilization compatible"
            },
            "Performance": {
                "Precision": "±0.01 mm",
                "Motion Scaling": "3:1 to 5:1",
                "Tremor Reduction": "7-Hz filter",
                "Wrist Articulation": "7 degrees of freedom"
            },
            "Visualization": {
                "Camera": "4K 3D endoscope",
                "Magnification": "10-15×",
                "Imaging Integration": "MRI, CT overlay capability"
            }
        },
        features: [
            "Haptic feedback for surgeon",
            "AI-assisted procedure guidance",
            "Sub-millimeter precision control",
            "Ergonomic surgeon console",
            "Integrated vital monitoring"
        ],
        applications: [
            "Cardiac surgery",
            "Neurological procedures",
            "Orthopedic surgery",
            "General minimally invasive surgery",
            "Telesurgery capabilities"
        ],
        createdAt: "2023-08-22T11:15:00Z"
    }
];

// Function to initialize the encyclopedia
function initEncyclopedia() {
    // Populate category filter options
    populateCategoryFilter();

    // Display robots and update UI
    displayRobots(robotsData);

    // Add event listeners for filtering and sorting
    addFilterListeners();

    // Initialize modal functionality
    initModal();
}

// Function to populate the category filter
function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(robotsData.map(robot => robot.category))];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to display robots
function displayRobots(robots) {
    const robotsGrid = document.getElementById('robotsGrid');
    
    // Clear previous content
    robotsGrid.innerHTML = '';
    
    if (robots.length === 0) {
        robotsGrid.innerHTML = '<div class="no-results">No robots found matching your criteria.</div>';
        return;
    }
    
    // Create robot cards
    robots.forEach(robot => {
        const robotCard = document.createElement('div');
        robotCard.className = 'robot-card';
        robotCard.setAttribute('data-id', robot.id);
        
        robotCard.innerHTML = `
            <div class="robot-image">
                <img src="${robot.images[0]}" alt="${robot.name}">
            </div>
            <div class="robot-info">
                <h3>${robot.name}</h3>
                <span class="robot-category">${robot.category}</span>
                <p class="robot-description">${robot.shortDescription}</p>
                <span class="view-details">View Details <i class="fas fa-arrow-right"></i></span>
            </div>
        `;
        
        robotsGrid.appendChild(robotCard);
        
        // Add click event to open modal
        robotCard.addEventListener('click', () => {
            openRobotModal(robot);
        });
    });
}

// Function to filter and sort robots
function filterRobots() {
    const searchTerm = document.getElementById('robotSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    
    // Filter robots
    let filteredRobots = robotsData.filter(robot => {
        const matchesSearch = robot.name.toLowerCase().includes(searchTerm) || 
                             robot.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || robot.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    // Sort robots
    filteredRobots = sortRobots(filteredRobots, sortBy);
    
    // Display filtered robots
    displayRobots(filteredRobots);
}

// Function to sort robots
function sortRobots(robots, sortBy) {
    switch (sortBy) {
        case 'name':
            return robots.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return robots.sort((a, b) => b.name.localeCompare(a.name));
        case 'newest':
            return robots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'oldest':
            return robots.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        default:
            return robots;
    }
}

// Function to add filter event listeners
function addFilterListeners() {
    document.getElementById('robotSearch').addEventListener('input', filterRobots);
    document.getElementById('categoryFilter').addEventListener('change', filterRobots);
    document.getElementById('sortBy').addEventListener('change', filterRobots);
}

// Function to initialize modal functionality
function initModal() {
    const modal = document.getElementById('robotModal');
    const closeButton = modal.querySelector('.close-button');
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Function to open robot modal with details
function openRobotModal(robot) {
    const modal = document.getElementById('robotModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // Create modal content
    modalBody.innerHTML = `
        <div class="robot-detail">
            <div class="robot-header">
                <div class="robot-title">
                    <h2>${robot.name}</h2>
                    <div class="robot-categories">
                        <span class="robot-category">${robot.category}</span>
                    </div>
                </div>
            </div>
            
            <div class="robot-media">
                <div class="robot-gallery">
                    <div class="main-image">
                        <img src="${robot.images[0]}" alt="${robot.name}" id="mainImage">
                    </div>
                    <div class="thumbnails">
                        ${robot.images.map((img, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <img src="${img}" alt="${robot.name} image ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="robot-video">
                    <iframe src="${robot.videoUrl}" allowfullscreen></iframe>
                </div>
            </div>
            
            <div class="robot-info-detail">
                <div class="robot-tabs">
                    <div class="robot-tab active" data-tab="overview">Overview</div>
                    <div class="robot-tab" data-tab="specifications">Specifications</div>
                    <div class="robot-tab" data-tab="applications">Applications</div>
                </div>
                
                <div class="tab-content active" id="overview">
                    <p>${robot.description}</p>
                    <h3>Key Features</h3>
                    <ul>
                        ${robot.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="tab-content" id="specifications">
                    <div class="specifications">
                        ${Object.entries(robot.specifications).map(([category, specs]) => `
                            <div class="spec-group">
                                <h4>${category}</h4>
                                ${Object.entries(specs).map(([key, value]) => `
                                    <div class="spec-item">
                                        <span class="spec-label">${key}</span>
                                        <span class="spec-value">${value}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="tab-content" id="applications">
                    <h3>Recommended Applications</h3>
                    <ul>
                        ${robot.applications.map(app => `<li>${app}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'block';
    
    // Add tab switching functionality
    const tabs = modalBody.querySelectorAll('.robot-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            modalBody.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            modalBody.querySelector(`#${tabId}`).classList.add('active');
        });
    });
    
    // Add thumbnail click functionality
    const thumbnails = modalBody.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Update main image
            const index = thumbnail.getAttribute('data-index');
            document.getElementById('mainImage').src = robot.images[index];
        });
    });
}

// For admin functionality - these would connect to backend APIs
// in a real implementation

// Function to add a new robot (for admin)
function addRobot(robotData) {
    // In a real implementation, this would send data to a backend API
    console.log('Adding new robot:', robotData);
    // For demo purposes, just add to the local array and refresh
    robotData.id = robotsData.length + 1;
    robotData.createdAt = new Date().toISOString();
    robotsData.push(robotData);
    
    // Refresh the display
    populateCategoryFilter();
    displayRobots(robotsData);
}

// Function to update a robot (for admin)
function updateRobot(robotId, updatedData) {
    // In a real implementation, this would send data to a backend API
    console.log('Updating robot with ID:', robotId, updatedData);
    
    // For demo purposes, update in the local array
    const index = robotsData.findIndex(robot => robot.id === robotId);
    if (index !== -1) {
        robotsData[index] = { ...robotsData[index], ...updatedData };
        
        // Refresh the display
        populateCategoryFilter();
        displayRobots(robotsData);
    }
}

// Function to delete a robot (for admin)
function deleteRobot(robotId) {
    // In a real implementation, this would send a request to a backend API
    console.log('Deleting robot with ID:', robotId);
    
    // For demo purposes, remove from the local array
    const index = robotsData.findIndex(robot => robot.id === robotId);
    if (index !== -1) {
        robotsData.splice(index, 1);
        
        // Refresh the display
        populateCategoryFilter();
        displayRobots(robotsData);
    }
}

// Function to check if user is admin (simplified for demo)
function isAdmin() {
    // In a real implementation, this would check session/token/cookie
    return localStorage.getItem('isAdmin') === 'true';
}

// If admin, add admin controls to the encyclopedia page
if (isAdmin()) {
    document.addEventListener('DOMContentLoaded', function() {
        addAdminControls();
    });
}

// Function to add admin controls
function addAdminControls() {
    // Create admin controls container
    const adminControls = document.createElement('div');
    adminControls.className = 'admin-controls';
    adminControls.innerHTML = `
        <div class="container">
            <h2>Admin Controls</h2>
            <button id="addRobotBtn" class="admin-btn">Add New Robot</button>
        </div>
    `;
    
    // Insert after filters section
    const filtersSection = document.querySelector('.encyclopedia-filters');
    filtersSection.after(adminControls);
    
    // Add event listener for add button
    document.getElementById('addRobotBtn').addEventListener('click', showAddRobotForm);
    
    // Add edit and delete buttons to robot cards
    addEditDeleteControls();
}

// Function to add edit/delete controls to robot cards
function addEditDeleteControls() {
    document.querySelectorAll('.robot-card').forEach(card => {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'admin-card-controls';
        controlsDiv.innerHTML = `
            <button class="edit-btn" data-id="${card.getAttribute('data-id')}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" data-id="${card.getAttribute('data-id')}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        card.appendChild(controlsDiv);
        
        // Add event listeners
        controlsDiv.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening modal
            const robotId = parseInt(e.currentTarget.getAttribute('data-id'));
            showEditRobotForm(robotId);
        });
        
        controlsDiv.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening modal
            const robotId = parseInt(e.currentTarget.getAttribute('data-id'));
            confirmDeleteRobot(robotId);
        });
    });
}

// Function to show add robot form
function showAddRobotForm() {
    // Create modal for adding robot
    const modal = document.createElement('div');
    modal.className = 'admin-modal';
    modal.innerHTML = `
        <div class="admin-modal-content">
            <span class="admin-close-button">&times;</span>
            <h2>Add New Robot</h2>
            <form id="addRobotForm">
                <!-- Form fields for robot data -->
                <div class="form-group">
                    <label for="robotName">Name:</label>
                    <input type="text" id="robotName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="robotCategory">Category:</label>
                    <input type="text" id="robotCategory" name="category" required>
                </div>
                <div class="form-group">
                    <label for="robotDescription">Description:</label>
                    <textarea id="robotDescription" name="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="robotShortDescription">Short Description:</label>
                    <input type="text" id="robotShortDescription" name="shortDescription" required>
                </div>
                <!-- More fields would be added for all robot properties -->
                
                <button type="submit" class="submit-btn">Add Robot</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close button functionality
    modal.querySelector('.admin-close-button').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Form submission
    document.getElementById('addRobotForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const robotData = {
            name: formData.get('name'),
            category: formData.get('category'),
            description: formData.get('description'),
            shortDescription: formData.get('shortDescription'),
            // More fields would be processed here
            images: ['images/robots/placeholder.jpg'],
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            specifications: {
                "Basic": {
                    "Type": "New Robot",
                    "Model": "Prototype"
                }
            },
            features: ["New Feature 1", "New Feature 2"],
            applications: ["New Application 1", "New Application 2"]
        };
        
        addRobot(robotData);
        document.body.removeChild(modal);
    });
}

// Function to show edit robot form
function showEditRobotForm(robotId) {
    const robot = robotsData.find(r => r.id === robotId);
    if (!robot) return;
    
    // Create modal for editing robot
    const modal = document.createElement('div');
    modal.className = 'admin-modal';
    modal.innerHTML = `
        <div class="admin-modal-content">
            <span class="admin-close-button">&times;</span>
            <h2>Edit Robot: ${robot.name}</h2>
            <form id="editRobotForm">
                <!-- Form fields with robot data -->
                <div class="form-group">
                    <label for="robotName">Name:</label>
                    <input type="text" id="robotName" name="name" value="${robot.name}" required>
                </div>
                <div class="form-group">
                    <label for="robotCategory">Category:</label>
                    <input type="text" id="robotCategory" name="category" value="${robot.category}" required>
                </div>
                <div class="form-group">
                    <label for="robotDescription">Description:</label>
                    <textarea id="robotDescription" name="description" required>${robot.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="robotShortDescription">Short Description:</label>
                    <input type="text" id="robotShortDescription" name="shortDescription" value="${robot.shortDescription}" required>
                </div>
                <!-- More fields would be added for all robot properties -->
                
                <button type="submit" class="submit-btn">Update Robot</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close button functionality
    modal.querySelector('.admin-close-button').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Form submission
    document.getElementById('editRobotForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = {
            name: formData.get('name'),
            category: formData.get('category'),
            description: formData.get('description'),
            shortDescription: formData.get('shortDescription')
            // More fields would be processed here
        };
        
        updateRobot(robotId, updatedData);
        document.body.removeChild(modal);
    });
}

// Function to confirm robot deletion
function confirmDeleteRobot(robotId) {
    const robot = robotsData.find(r => r.id === robotId);
    if (!robot) return;
    
    if (confirm(`Are you sure you want to delete "${robot.name}"?`)) {
        deleteRobot(robotId);
    }
}