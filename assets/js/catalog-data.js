/**
 * TGen ROBOTICS Catalog Data
 * 
 * This file contains all product data for the catalog. 
 * Administrators can easily modify this file to add, edit or remove products.
 * 
 * INSTRUCTIONS FOR ADMINISTRATORS:
 * 
 * 1. TO ADD A NEW PRODUCT:
 *    - Copy an existing product object inside the CATALOG_PRODUCTS array
 *    - Paste it before the closing bracket of the array
 *    - Update all fields with the new product information
 *    - Make sure to add a comma after the previous product's closing curly brace }
 * 
 * 2. TO EDIT A PRODUCT:
 *    - Simply find the product by its id
 *    - Modify any of the fields as needed
 * 
 * 3. TO REMOVE A PRODUCT:
 *    - Delete the entire product object including its opening { and closing } brackets
 *    - Make sure to remove any trailing comma from the previous product
 * 
 * 4. PRODUCT CATEGORIES:
 *    - Currently supported categories: 'industrial', 'construction', 'domestic', 'healthcare'
 *    - Use these exact category names in the 'category' field
 * 
 * 5. IMAGES:
 *    - Image paths should be relative to the root directory
 *    - For example: '/assets/images/products/product-name.jpg'
 *    - If no image is available, use the placeholder: '/api/placeholder/400/300'
 * 
 * 6. PRODUCT ID:
 *    - Each product must have a unique id
 *    - Use a simple incremental number for new products
 * 
 * PRODUCT OBJECT STRUCTURE:
 * {
 *    id: (number),                  // Unique identifier
 *    name: (string),                // Product name
 *    category: (string),            // Product category: 'industrial', 'construction', 'domestic', 'healthcare'
 *    price: (string),               // Price with currency symbol, e.g. '€2,499.99' or 'Contact for pricing'
 *    shortDescription: (string),    // Brief description for catalog cards
 *    longDescription: (string),     // Detailed description for product modal
 *    image: (string),               // Main image path
 *    featured: (boolean),           // Whether product should be highlighted
 *    specifications: [              // Array of specification objects
 *      { name: (string), value: (string) },    // Each specification has a name and value
 *      ...
 *    ]
 * }
 */

// Catalog Products Array - Add, edit or remove products here
const CATALOG_PRODUCTS = [
    {
        id: 1,
        name: "AR-7500 Industrial Arm",
        category: "industrial",
        price: "€12,499.99",
        shortDescription: "High-precision robotic arm with 6 degrees of freedom, perfect for manufacturing and assembly lines.",
        longDescription: "The AR-7500 is our flagship industrial robotic arm, designed for maximum precision and reliability in manufacturing environments. With 6 degrees of freedom and advanced motion control algorithms, it can perform complex assembly tasks with repeatable accuracy of ±0.02mm. The integrated vision system allows for on-the-fly adjustments and quality control verification, while the hardened steel construction ensures durability even in harsh industrial conditions.",
        image: "/api/placeholder/400/300",
        featured: true,
        specifications: [
            { name: "Payload Capacity", value: "7.5 kg" },
            { name: "Reach", value: "1850 mm" },
            { name: "Degrees of Freedom", value: "6" },
            { name: "Repeatability", value: "±0.02 mm" },
            { name: "Power Consumption", value: "750W (typical)" },
            { name: "Weight", value: "248 kg" },
            { name: "Control System", value: "TGen ARM OS 4.2" }
        ]
    },
    {
        id: 2,
        name: "CrawlBot X2 Construction Robot",
        category: "construction",
        price: "€18,750.00",
        shortDescription: "All-terrain construction robot designed for site surveying, material transport, and precision measurement.",
        longDescription: "The CrawlBot X2 revolutionizes construction site management with its versatile capabilities. Featuring an advanced terrain-adaptive locomotion system, it can navigate uneven surfaces, stairs, and obstacles with ease. Equipped with LiDAR, multi-spectral cameras, and precision measurement tools, it creates detailed 3D maps of construction sites and tracks progress against digital plans. The modular attachment system allows for tool swapping, enabling the CrawlBot to perform tasks from material transport (up to 200kg) to precision drilling and cutting.",
        image: "/api/placeholder/400/300",
        featured: true,
        specifications: [
            { name: "Payload Capacity", value: "200 kg" },
            { name: "Operating Time", value: "8 hours" },
            { name: "Climbing Ability", value: "45° incline" },
            { name: "Speed", value: "5 km/h (max)" },
            { name: "Sensor Suite", value: "LiDAR, RGB-D Camera, IMU, GPS" },
            { name: "Control", value: "Autonomous or Remote Operation" },
            { name: "Weather Resistance", value: "IP67 (Dust & Water Resistant)" }
        ]
    },
    {
        id: 3,
        name: "HomeBuddy Advanced",
        category: "domestic",
        price: "€1,299.99",
        shortDescription: "Multi-function home assistant robot with voice control, smart home integration, and autonomous navigation.",
        longDescription: "The HomeBuddy Advanced is your ultimate domestic assistant, designed to make everyday life easier and more connected. Using advanced AI and natural language processing, it responds to voice commands while learning your preferences over time. Its autonomous navigation system maps your home for efficient movement, while obstacle avoidance ensures safety around pets and children. With smart home integration, HomeBuddy can control lights, thermostats, and other connected devices. The extendable arm can perform basic tasks like picking up small items, while the built-in entertainment features include music playback and interactive games.",
        image: "/api/placeholder/400/300",
        featured: true,
        specifications: [
            { name: "Battery Life", value: "10 hours (active use)" },
            { name: "Height", value: "95 cm" },
            { name: "Weight", value: "12 kg" },
            { name: "Voice Recognition", value: "Multiple users, 8 languages" },
            { name: "Camera", value: "1080p HD with night vision" },
            { name: "Connectivity", value: "Wi-Fi, Bluetooth 5.0, Zigbee" },
            { name: "Noise Level", value: "< 50 dB" }
        ]
    },
    {
        id: 4,
        name: "MediAssist Pro",
        category: "healthcare",
        price: "Contact for pricing",
        shortDescription: "Healthcare assistance robot for patient monitoring, medication management, and mobility support.",
        longDescription: "The MediAssist Pro is designed to enhance healthcare facilities by providing reliable patient assistance and reducing the workload on healthcare professionals. Its advanced vital sign monitoring system can track heart rate, blood pressure, and oxygen levels non-invasively, while the medication management system ensures timely reminders and accurate dispensing. The robot's gentle mobility assistance features help patients with limited mobility move safely, while the telehealth capabilities enable remote consultations with healthcare providers. With intuitive touch controls and voice recognition, MediAssist Pro is accessible to patients of all ages and technical abilities.",
        image: "/api/placeholder/400/300",
        featured: false,
        specifications: [
            { name: "Patient Lifting Capacity", value: "120 kg" },
            { name: "Battery Operation", value: "24 hours" },
            { name: "Sanitization", value: "UV-C disinfection system" },
            { name: "Monitoring Capabilities", value: "Heart rate, BP, SpO2, Temperature" },
            { name: "Communication", value: "2-way audio/video" },
            { name: "Fall Detection", value: "AI-powered alert system" },
            { name: "Certifications", value: "ISO 13485, CE Medical, FDA cleared" }
        ]
    },
    {
        id: 5,
        name: "PackBot Mini",
        category: "industrial",
        price: "€8,999.99",
        shortDescription: "Compact warehousing robot designed for inventory management and package handling in tight spaces.",
        longDescription: "The PackBot Mini is revolutionizing small to medium warehouse operations with its compact design and powerful capabilities. Standing just 1.2 meters tall, it can navigate narrow aisles and tight spaces while carrying up to 50kg of inventory. The integrated barcode and RFID scanners automate inventory tracking with 99.9% accuracy, while the adaptive gripper system can handle packages of various shapes and sizes. With its collaborative design, PackBot Mini works safely alongside human warehouse staff, intelligently avoiding collisions and adapting its pace to surrounding activity levels.",
        image: "/api/placeholder/400/300",
        featured: false,
        specifications: [
            { name: "Height", value: "120 cm" },
            { name: "Payload", value: "50 kg" },
            { name: "Scanning Accuracy", value: "99.9%" },
            { name: "Operating Time", value: "12 hours" },
            { name: "Charging Time", value: "2 hours" },
            { name: "Navigation", value: "Lidar + Camera Fusion" },
            { name: "Software", value: "TGen Warehouse Management System" }
        ]
    },
    {
        id: 6,
        name: "SolarPro Cleaner",
        category: "construction",
        price: "€7,499.00",
        shortDescription: "Autonomous solar panel cleaning robot for large-scale installations, boosting energy efficiency by up to 30%.",
        longDescription: "The SolarPro Cleaner addresses one of the biggest maintenance challenges in solar energy: keeping panels clean to maintain optimal efficiency. This fully autonomous robot traverses solar arrays of any size, using advanced sensors to detect dirt accumulation and adapt its cleaning intensity. The water-efficient cleaning system uses 90% less water than manual methods, while the soft-touch brushes prevent panel damage. Solar farm operators typically see energy production increases of 15-30% after deployment, with the robot's AI-driven scheduling ensuring panels are cleaned at optimal intervals based on weather conditions and dust accumulation patterns.",
        image: "/api/placeholder/400/300",
        featured: false,
        specifications: [
            { name: "Cleaning Rate", value: "1000 m² per hour" },
            { name: "Water Usage", value: "0.1L per m²" },
            { name: "Panel Compatibility", value: "All standard formats" },
            { name: "Incline Capability", value: "Up to 45°" },
            { name: "Power Source", value: "Self-charging (solar)" },
            { name: "Weather Resistance", value: "IP66" },
            { name: "Remote Monitoring", value: "Real-time via cloud dashboard" }
        ]
    },
    {
        id: 7,
        name: "KitchenChef Bot",
        category: "domestic",
        price: "€2,799.99",
        shortDescription: "Intelligent cooking assistant robot that can prepare over 500 recipes with precision and consistency.",
        longDescription: "The KitchenChef Bot transforms home cooking with its ability to prepare complete meals with minimal human intervention. Featuring 8 specialized cooking tools that automatically swap depending on the recipe requirements, it can chop, stir, blend, and even monitor cooking temperatures with professional precision. The 10.5-inch touchscreen guides users through recipes, while the voice control system allows for hands-free operation while handling other kitchen tasks. With weekly software updates, the recipe database continuously expands, now featuring over 500 dishes from global cuisines. The cleaning system automates post-cooking cleanup, making the entire cooking experience more enjoyable.",
        image: "/api/placeholder/400/300",
        featured: false,
        specifications: [
            { name: "Cooking Techniques", value: "Chopping, stirring, blending, temperature control" },
            { name: "Recipe Database", value: "500+ recipes (expandable)" },
            { name: "Maximum Meal Size", value: "4 servings" },
            { name: "Tools", value: "8 auto-swappable attachments" },
            { name: "Display", value: "10.5\" touchscreen" },
            { name: "Connectivity", value: "Wi-Fi for recipe updates" },
            { name: "Dishwasher Safe Parts", value: "Yes, all food-contact components" }
        ]
    },
    {
        id: 8,
        name: "PhysioBot Therapist",
        category: "healthcare",
        price: "€9,999.00",
        shortDescription: "Rehabilitation robot for physical therapy, providing consistent guidance and progress tracking for patients.",
        longDescription: "The PhysioBot Therapist represents a breakthrough in rehabilitation technology, offering consistent, precise therapy assistance for patients recovering from injuries or surgeries. Using advanced sensors and machine vision, it monitors patient movements with sub-millimeter accuracy, providing real-time feedback and adjustments to ensure exercises are performed correctly. The adaptive resistance system automatically adjusts difficulty based on patient progress, while the built-in pain and fatigue detection prevents overexertion. Therapists can program customized rehabilitation plans remotely, receiving detailed progress reports after each session. Studies show patients using PhysioBot recover 35% faster than with traditional therapy alone.",
        image: "/api/placeholder/400/300",
        featured: false,
        specifications: [
            { name: "Movement Precision", value: "±0.5mm" },
            { name: "Supported Exercises", value: "250+ rehabilitation movements" },
            { name: "Patient Tracking", value: "42 skeletal points" },
            { name: "Screen", value: "32\" rotating HD display" },
            { name: "Resistance Levels", value: "50 adaptive settings" },
            { name: "Sessions", value: "Cloud-stored for provider review" },
            { name: "Certifications", value: "ISO 13485, CE Medical, FDA Class II" }
        ]
    }
];
