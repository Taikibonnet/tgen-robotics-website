// Admin Encyclopedia JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the admin encyclopedia page
    initAdminEncyclopedia();
});

// Mock data for robots - in a real scenario, this would come from a backend API
// This data is the same as in the main encyclopedia.js file
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
        createdAt: "2023-06-15T14:30:00Z",
        updatedAt: "2024-01-20T09:15:00Z"
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
        createdAt: "2024-01-10T09:45:00Z",
        updatedAt: "2024-03-05T15:30:00Z"
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
        createdAt: "2023-11-05T16:20:00Z",
        updatedAt: "2024-02-18T12:45:00Z"
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
        createdAt: "2023-08-22T11:15:00Z",
        updatedAt: "2024-01-30T14:20:00Z"
    }
];

// Function to initialize the admin encyclopedia page
function initAdminEncyclopedia() {
    // Populate robots table
    populateRobotsTable(robotsData);
    
    // Populate category filter options
    populateCategoryFilter();
    
    // Add event listeners for search and filter
    addSearchFilterListeners();
    
    // Initialize modal functionality
    initModalFunctionality();
    
    // Initialize add robot button
    document.getElementById('addRobotBtn').addEventListener('click', () => {
        openAddRobotModal();
    });
}

// Function to populate the robots table
function populateRobotsTable(robots) {
    const tableBody = document.getElementById('robotsTableBody');
    tableBody.innerHTML = '';
    
    robots.forEach(robot => {
        const row = document.createElement('tr');
        
        // Format date
        const updatedDate = new Date(robot.updatedAt);
        const formattedDate = updatedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        row.innerHTML = `
            <td>${robot.id}</td>
            <td><img src="../${robot.images[0]}" alt="${robot.name}" class="robot-image-thumbnail"></td>
            <td class="robot-name">${robot.name}</td>
            <td><span class="category-badge">${robot.category}</span></td>
            <td class="robot-date">${formattedDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" data-id="${robot.id}" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" data-id="${robot.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${robot.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    addActionButtonListeners();
}

// Function to add event listeners to action buttons
function addActionButtonListeners() {
    // View buttons
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', () => {
            const robotId = parseInt(button.getAttribute('data-id'));
            window.open(`../encyclopedia.html?robot=${robotId}`, '_blank');
        });
    });
    
    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const robotId = parseInt(button.getAttribute('data-id'));
            openEditRobotModal(robotId);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const robotId = parseInt(button.getAttribute('data-id'));
            openDeleteConfirmationModal(robotId);
        });
    });
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

// Function to add search and filter listeners
function addSearchFilterListeners() {
    const searchInput = document.getElementById('searchRobot');
    const categoryFilter = document.getElementById('categoryFilter');
    
    searchInput.addEventListener('input', filterRobots);
    categoryFilter.addEventListener('change', filterRobots);
}

// Function to filter robots based on search and category
function filterRobots() {
    const searchTerm = document.getElementById('searchRobot').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    const filteredRobots = robotsData.filter(robot => {
        const matchesSearch = robot.name.toLowerCase().includes(searchTerm) || 
                             robot.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || robot.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    populateRobotsTable(filteredRobots);
}

// Initialize modal functionality
function initModalFunctionality() {
    // Get modal elements
    const modal = document.getElementById('robotModal');
    const closeButton = modal.querySelector('.close-button');
    const cancelButton = document.getElementById('cancelBtn');
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking the cancel button
    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Initialize delete confirmation modal
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    
    cancelDeleteBtn.addEventListener('click', () => {
        confirmDeleteModal.style.display = 'none';
    });
    
    window.addEventListener('click', event => {
        if (event.target === confirmDeleteModal) {
            confirmDeleteModal.style.display = 'none';
        }
    });
    
    // Initialize form submission
    const robotForm = document.getElementById('robotForm');
    robotForm.addEventListener('submit', handleFormSubmit);
    
    // Initialize character counter for short description
    const shortDescInput = document.getElementById('robotShortDescription');
    const charCount = shortDescInput.nextElementSibling;
    
    shortDescInput.addEventListener('input', () => {
        const count = shortDescInput.value.length;
        charCount.textContent = `${count}/100`;
    });
    
    // Initialize add spec category button
    document.getElementById('addSpecCategory').addEventListener('click', addSpecificationCategory);
    
    // Initialize features and applications tags input
    initTagsInput('featuresInput', 'featuresTags');
    initTagsInput('applicationsInput', 'applicationsTags');
}

// Function to open add robot modal
function openAddRobotModal() {
    const modal = document.getElementById('robotModal');
    const modalTitle = document.getElementById('modalTitle');
    const robotForm = document.getElementById('robotForm');
    
    // Set modal title
    modalTitle.textContent = 'Add New Robot';
    
    // Reset form
    robotForm.reset();
    document.getElementById('robotId').value = '';
    
    // Clear specifications, features, and applications
    resetSpecifications();
    document.getElementById('featuresTags').innerHTML = '';
    document.getElementById('applicationsTags').innerHTML = '';
    
    // Clear image previews
    resetImagePreviews();
    
    // Show modal
    modal.style.display = 'block';
}

// Function to open edit robot modal
function openEditRobotModal(robotId) {
    const robot = robotsData.find(r => r.id === robotId);
    if (!robot) return;
    
    const modal = document.getElementById('robotModal');
    const modalTitle = document.getElementById('modalTitle');
    
    // Set modal title
    modalTitle.textContent = `Edit Robot: ${robot.name}`;
    
    // Populate form with robot data
    document.getElementById('robotId').value = robot.id;
    document.getElementById('robotName').value = robot.name;
    document.getElementById('robotCategory').value = robot.category;
    document.getElementById('robotShortDescription').value = robot.shortDescription;
    document.getElementById('robotDescription').value = robot.description;
    document.getElementById('videoUrl').value = robot.videoUrl || '';
    
    // Update character count
    const shortDescInput = document.getElementById('robotShortDescription');
    const charCount = shortDescInput.nextElementSibling;
    charCount.textContent = `${shortDescInput.value.length}/100`;
    
    // Populate specifications
    populateSpecifications(robot.specifications);
    
    // Populate features and applications
    populateTags('featuresTags', robot.features);
    populateTags('applicationsTags', robot.applications);
    
    // Set image previews (in a real implementation, this would handle actual images)
    setImagePreviews(robot.images);
    
    // Show modal
    modal.style.display = 'block';
}

// Function to open delete confirmation modal
function openDeleteConfirmationModal(robotId) {
    const robot = robotsData.find(r => r.id === robotId);
    if (!robot) return;
    
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    
    // Set robot ID for delete confirmation
    document.getElementById('confirmDeleteBtn').setAttribute('data-id', robotId);
    
    // Add event listener for confirm button (removing any existing ones first)
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    const confirmBtnClone = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(confirmBtnClone, confirmBtn);
    
    confirmBtnClone.addEventListener('click', () => {
        deleteRobot(robotId);
        confirmDeleteModal.style.display = 'none';
    });
    
    // Show modal
    confirmDeleteModal.style.display = 'block';
}

// Function to reset specifications container
function resetSpecifications() {
    const container = document.getElementById('specificationsContainer');
    
    // Keep only the first spec category as a template and the add button
    const addButton = document.getElementById('addSpecCategory');
    const firstSpecCategory = container.querySelector('.spec-category');
    
    container.innerHTML = '';
    container.appendChild(firstSpecCategory.cloneNode(true));
    container.appendChild(addButton);
    
    // Clear inputs in the template
    const inputs = container.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Add event listeners to the template buttons
    addSpecCategoryEventListeners(container.querySelector('.spec-category'));
}

// Function to populate specifications
function populateSpecifications(specifications) {
    // First reset the container
    resetSpecifications();
    
    const container = document.getElementById('specificationsContainer');
    const addButton = document.getElementById('addSpecCategory');
    const template = container.querySelector('.spec-category');
    
    // Remove the template
    container.removeChild(template);
    
    // Add specification categories
    Object.entries(specifications).forEach(([categoryName, specs]) => {
        const specCategory = template.cloneNode(true);
        specCategory.querySelector('.spec-category-name').value = categoryName;
        
        const specItems = specCategory.querySelector('.spec-items');
        const specItemTemplate = specItems.querySelector('.spec-item');
        const addSpecButton = specItems.querySelector('.add-spec');
        
        // Remove the template spec item
        specItems.removeChild(specItemTemplate);
        
        // Add specification items
        Object.entries(specs).forEach(([name, value]) => {
            const specItem = specItemTemplate.cloneNode(true);
            specItem.querySelector('.spec-name').value = name;
            specItem.querySelector('.spec-value').value = value;
            
            // Add remove button event listener
            specItem.querySelector('.remove-spec').addEventListener('click', function() {
                this.closest('.spec-item').remove();
            });
            
            specItems.insertBefore(specItem, addSpecButton);
        });
        
        // Add event listener for add spec button
        addSpecButton.addEventListener('click', function() {
            const newSpecItem = specItemTemplate.cloneNode(true);
            newSpecItem.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
            
            newSpecItem.querySelector('.remove-spec').addEventListener('click', function() {
                this.closest('.spec-item').remove();
            });
            
            specItems.insertBefore(newSpecItem, addSpecButton);
        });
        
        // Add event listener for remove category button
        specCategory.querySelector('.remove-spec-category').addEventListener('click', function() {
            this.closest('.spec-category').remove();
        });
        
        container.insertBefore(specCategory, addButton);
    });
}

// Function to add a new specification category
function addSpecificationCategory() {
    const container = document.getElementById('specificationsContainer');
    const addButton = document.getElementById('addSpecCategory');
    const template = container.querySelector('.spec-category');
    
    const newCategory = template.cloneNode(true);
    newCategory.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    
    addSpecCategoryEventListeners(newCategory);
    
    container.insertBefore(newCategory, addButton);
}

// Function to add event listeners to a specification category
function addSpecCategoryEventListeners(category) {
    // Add event listener for remove category button
    category.querySelector('.remove-spec-category').addEventListener('click', function() {
        this.closest('.spec-category').remove();
    });
    
    // Add event listener for add specification button
    category.querySelector('.add-spec').addEventListener('click', function() {
        const specItems = this.closest('.spec-items');
        const specItemTemplate = specItems.querySelector('.spec-item');
        const newSpecItem = specItemTemplate.cloneNode(true);
        
        newSpecItem.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        newSpecItem.querySelector('.remove-spec').addEventListener('click', function() {
            this.closest('.spec-item').remove();
        });
        
        specItems.insertBefore(newSpecItem, this);
    });
    
    // Add event listeners for remove spec buttons
    category.querySelectorAll('.remove-spec').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.spec-item').remove();
        });
    });
}

// Function to initialize tags input
function initTagsInput(inputId, tagsContainerId) {
    const input = document.getElementById(inputId);
    const tagsContainer = document.getElementById(tagsContainerId);
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            e.preventDefault();
            
            const tag = document.createElement('div');
            tag.className = 'tag';
            
            const tagText = input.value.trim();
            tag.innerHTML = `
                ${tagText}
                <button type="button" class="remove-tag"><i class="fas fa-times"></i></button>
            `;
            
            tag.querySelector('.remove-tag').addEventListener('click', () => {
                tagsContainer.removeChild(tag);
            });
            
            tagsContainer.appendChild(tag);
            input.value = '';
        }
    });
}

// Function to populate tags
function populateTags(containerId, tags) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    tags.forEach(tagText => {
        const tag = document.createElement('div');
        tag.className = 'tag';
        
        tag.innerHTML = `
            ${tagText}
            <button type="button" class="remove-tag"><i class="fas fa-times"></i></button>
        `;
        
        tag.querySelector('.remove-tag').addEventListener('click', () => {
            container.removeChild(tag);
        });
        
        container.appendChild(tag);
    });
}

// Function to reset image previews
function resetImagePreviews() {
    const mainImagePreview = document.getElementById('mainImagePreview');
    
    // Remove any existing image
    mainImagePreview.innerHTML = `
        <i class="fas fa-upload"></i>
        <span>Upload Image</span>
    `;
    mainImagePreview.classList.remove('has-image');
    
    // Reset additional images
    const additionalImages = document.querySelectorAll('.additional-image-upload');
    additionalImages.forEach(input => {
        const preview = input.previousElementSibling;
        preview.innerHTML = `<i class="fas fa-plus"></i>`;
        preview.classList.remove('has-image');
    });
}

// Function to set image previews (in a real implementation, this would handle actual images)
function setImagePreviews(images) {
    const mainImagePreview = document.getElementById('mainImagePreview');
    
    // Set main image
    if (images && images.length > 0) {
        mainImagePreview.innerHTML = `<img src="../${images[0]}" alt="Main Image">`;
        mainImagePreview.classList.add('has-image');
    }
    
    // Set additional images
    const additionalImgPreviews = document.querySelectorAll('.additional-images .image-preview');
    
    for (let i = 1; i < images.length && i <= additionalImgPreviews.length; i++) {
        const preview = additionalImgPreviews[i-1];
        preview.innerHTML = `<img src="../${images[i]}" alt="Image ${i+1}">`;
        preview.classList.add('has-image');
    }
}

// Function to handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const robotId = document.getElementById('robotId').value;
    const formData = {
        name: document.getElementById('robotName').value,
        category: document.getElementById('robotCategory').value,
        shortDescription: document.getElementById('robotShortDescription').value,
        description: document.getElementById('robotDescription').value,
        videoUrl: document.getElementById('videoUrl').value || null,
        specifications: collectSpecifications(),
        features: collectTags('featuresTags'),
        applications: collectTags('applicationsTags'),
        // In a real implementation, we would handle images upload here
        images: ['images/robots/placeholder.jpg']
    };
    
    // If editing an existing robot
    if (robotId) {
        const index = robotsData.findIndex(r => r.id === parseInt(robotId));
        if (index !== -1) {
            // Update the robot
            const updatedRobot = {
                ...robotsData[index],
                ...formData,
                updatedAt: new Date().toISOString()
            };
            robotsData[index] = updatedRobot;
        }
    } 
    // If adding a new robot
    else {
        // Create a new robot
        const newRobot = {
            ...formData,
            id: getNextRobotId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        robotsData.push(newRobot);
    }
    
    // Update the table
    populateRobotsTable(robotsData);
    populateCategoryFilter();
    
    // Close the modal
    document.getElementById('robotModal').style.display = 'none';
    
    // Show success message (in a real implementation)
    alert(robotId ? 'Robot updated successfully!' : 'Robot added successfully!');
}

// Function to collect specifications from the form
function collectSpecifications() {
    const specs = {};
    const categories = document.querySelectorAll('.spec-category');
    
    categories.forEach(category => {
        const categoryName = category.querySelector('.spec-category-name').value;
        if (!categoryName) return;
        
        specs[categoryName] = {};
        
        const specItems = category.querySelectorAll('.spec-item');
        specItems.forEach(item => {
            const name = item.querySelector('.spec-name').value;
            const value = item.querySelector('.spec-value').value;
            
            if (name && value) {
                specs[categoryName][name] = value;
            }
        });
    });
    
    return specs;
}

// Function to collect tags from a container
function collectTags(containerId) {
    const tags = [];
    const tagElements = document.querySelectorAll(`#${containerId} .tag`);
    
    tagElements.forEach(tag => {
        // Get the text content excluding the button
        const text = tag.childNodes[0].textContent.trim();
        if (text) {
            tags.push(text);
        }
    });
    
    return tags;
}

// Function to get the next robot ID
function getNextRobotId() {
    return Math.max(...robotsData.map(robot => robot.id), 0) + 1;
}

// Function to delete a robot
function deleteRobot(robotId) {
    const index = robotsData.findIndex(r => r.id === robotId);
    if (index !== -1) {
        robotsData.splice(index, 1);
        
        // Update the table
        populateRobotsTable(robotsData);
        
        // Show success message (in a real implementation)
        alert('Robot deleted successfully!');
    }
}