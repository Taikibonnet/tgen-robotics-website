/**
 * TGen ROBOTICS Catalog Data
 * 
 * ADMIN INSTRUCTIONS:
 * 
 * This file contains all the product data for the catalog.
 * To add, modify, or remove products, simply edit the CATALOG_PRODUCTS array below.
 * 
 * Each product is an object with the following properties:
 * - id: A unique identifier for the product (incremental number, must be unique)
 * - title: The name of the product
 * - category: The category of the product (industrial, construction, domestic, healthcare)
 * - price: The price of the product (use "Contact for pricing" for products without a fixed price)
 * - image: The path to the product image (stored in assets/images/catalog/)
 * - description: A short description for the product card
 * - detailedDescription: A more detailed description for the product modal
 * - specifications: An object containing product specifications as key-value pairs
 * - featured: Boolean value to indicate if the product should be featured
 * 
 * HOW TO ADD A NEW PRODUCT:
 * 1. Create a new object with all required properties
 * 2. Assign a unique id (usually the next number in sequence)
 * 3. Add the object to the CATALOG_PRODUCTS array
 * 4. Make sure to add the product image to the assets/images/catalog/ folder
 * 
 * HOW TO REMOVE A PRODUCT:
 * 1. Simply delete the entire object from the CATALOG_PRODUCTS array
 * 
 * HOW TO MODIFY A PRODUCT:
 * 1. Find the product object you want to modify
 * 2. Change the properties you need to update
 * 3. Save the file
 * 
 * IMPORTANT: Always keep the structure of the object consistent!
 */

// Define the catalog products array
const CATALOG_PRODUCTS = [
    // Industrial Robots
    {
        id: 1,
        title: "AutoAssembly Pro X5",
        category: "industrial",
        price: "€25,000",
        image: "/api/placeholder/400/300",
        description: "Advanced assembly robot with precision control and adaptive learning capabilities.",
        detailedDescription: "The AutoAssembly Pro X5 represents the cutting edge in automated assembly solutions. Designed for manufacturing environments requiring high precision and flexibility, this robot excels in component assembly, quality testing, and product finishing. With its advanced machine learning algorithms, the X5 continuously improves its performance over time, reducing errors and increasing throughput.",
        specifications: {
            "Working Radius": "1.5 meters",
            "Maximum Payload": "25 kg",
            "Precision": "±0.05 mm",
            "Degrees of Freedom": "6-axis",
            "Power Consumption": "3.2 kW",
            "Control System": "TGen Advanced AI",
            "Communication": "Ethernet/IP, PROFINET, EtherCAT",
            "Programming": "Graphical interface, Python API",
            "Certification": "ISO/TS 15066, CE, UL"
        },
        featured: true
    },
    {
        id: 2,
        title: "LogisticsBot 2000",
        category: "industrial",
        price: "€18,500",
        image: "/api/placeholder/400/300",
        description: "Autonomous material handling robot for warehouse and factory environments.",
        detailedDescription: "The LogisticsBot 2000 is designed to revolutionize internal logistics in warehouses and production facilities. This autonomous robot navigates complex environments safely while transporting materials between workstations. With its advanced obstacle detection and route optimization, the LogisticsBot 2000 significantly reduces material handling time and labor costs.",
        specifications: {
            "Load Capacity": "2000 kg",
            "Operating Speed": "2.0 m/s",
            "Battery Life": "12 hours",
            "Charging Time": "2 hours",
            "Navigation System": "LiDAR + Computer Vision",
            "Safety Features": "360° obstacle detection, emergency stop",
            "Connectivity": "Wi-Fi, 4G/5G",
            "Fleet Management": "TGen Central Control System",
            "Certification": "CE, ISO 3691-4"
        },
        featured: true
    },
    {
        id: 3,
        title: "PrecisionWeld TG3",
        category: "industrial",
        price: "€32,750",
        image: "/api/placeholder/400/300",
        description: "High-precision welding robot for complex manufacturing applications.",
        detailedDescription: "The PrecisionWeld TG3 combines state-of-the-art robotics with advanced welding technology to deliver exceptional results in demanding manufacturing environments. Capable of performing TIG, MIG, and spot welding with remarkable precision, this robot is ideal for industries where weld quality is critical, such as automotive, aerospace, and precision engineering.",
        specifications: {
            "Welding Types": "TIG, MIG, Spot Welding",
            "Working Envelope": "2.8 m radius",
            "Positional Repeatability": "±0.03 mm",
            "Welding Speed": "0.1-120 cm/min",
            "Payload": "12 kg",
            "Controller": "TGen WeldMaster Pro",
            "Programming": "Teach pendant, offline programming",
            "Cooling System": "Integrated liquid cooling",
            "Certification": "ISO 9606, AWS D16.2, CE"
        },
        featured: false
    },

    // Construction Robots
    {
        id: 4,
        title: "RenovationMaster 500",
        category: "construction",
        price: "Contact for pricing",
        image: "/api/placeholder/400/300",
        description: "Multipurpose construction robot for demolition and renovation projects.",
        detailedDescription: "The RenovationMaster 500 is a versatile construction robot designed to handle the most demanding demolition and renovation tasks with precision and safety. Equipped with interchangeable tools and a robust hydraulic system, this robot can break concrete, remove plaster, drill through walls, and much more. Its compact design allows it to operate in confined spaces where traditional equipment cannot reach.",
        specifications: {
            "Operating Weight": "500 kg",
            "Power Source": "Electric (3-phase) or Diesel",
            "Hydraulic System": "25 kW",
            "Working Reach": "3.2 meters",
            "Control System": "Remote control with video feedback",
            "Noise Level": "85 dB(A)",
            "Attachments": "Breaker, crusher, drill, gripper, bucket",
            "Climbing Capability": "30° incline",
            "Certification": "CE, ANSI/ASSP A10.40"
        },
        featured: true
    },
    {
        id: 5,
        title: "BrickLayer Pro",
        category: "construction",
        price: "€120,000",
        image: "/api/placeholder/400/300",
        description: "Automated bricklaying system for residential and commercial construction.",
        detailedDescription: "The BrickLayer Pro is revolutionizing masonry construction with its ability to lay bricks with speed and precision that surpasses human capabilities. Using advanced computer vision to map construction plans to real-world coordinates, this robot can build walls up to three times faster than traditional methods while maintaining exceptional quality standards. The system includes mortar dispensing, brick placement, and real-time quality control.",
        specifications: {
            "Laying Speed": "Up to 1000 bricks per hour",
            "Compatible Materials": "Standard bricks, blocks up to 10kg",
            "Precision": "±1.0 mm",
            "System Dimensions": "4.2 m × 2.1 m × 3.0 m",
            "Power Requirements": "380-480V, 32A, 3-phase",
            "Setup Time": "4 hours",
            "Operation": "Semi-autonomous with supervisor",
            "Software": "TGen Construction Planner",
            "Certification": "CE, ISO 19338"
        },
        featured: false
    },
    {
        id: 6,
        title: "SiteScanner Drone X2",
        category: "construction",
        price: "€8,900",
        image: "/api/placeholder/400/300",
        description: "Autonomous drone for construction site mapping and progress monitoring.",
        detailedDescription: "The SiteScanner Drone X2 is an advanced aerial mapping system designed specifically for construction projects. It autonomously captures high-resolution images and LiDAR data to create detailed 3D models of construction sites. These models can be used for progress tracking, volume calculations, and quality control. The system integrates seamlessly with BIM software to compare as-built conditions with design plans, helping identify discrepancies early in the construction process.",
        specifications: {
            "Flight Time": "45 minutes",
            "Camera Resolution": "42 MP RGB + Thermal",
            "LiDAR Accuracy": "±1.5 cm",
            "Mapping Area": "Up to 25 hectares per flight",
            "Wind Resistance": "Up to 12 m/s",
            "Data Processing": "Cloud-based or local",
            "Output Formats": "LAS, XYZ, DXF, OBJ, BIM integration",
            "AI Features": "Progress tracking, anomaly detection",
            "Certification": "FAA Part 107, CE"
        },
        featured: false
    },

    // Domestic Robots
    {
        id: 7,
        title: "HomeCare Assistant",
        category: "domestic",
        price: "€3,499",
        image: "/api/placeholder/400/300",
        description: "Multifunctional home robot for cleaning, monitoring, and household assistance.",
        detailedDescription: "The HomeCare Assistant is the ultimate domestic robot, combining cleaning capabilities with smart home integration and personal assistance features. It handles various cleaning tasks including vacuuming, mopping, and surface sanitization. With built-in cameras and sensors, it can monitor your home when you're away, and its voice-controlled interface allows for easy operation. The robot learns your preferences over time, adapting its schedule and routines to best serve your household needs.",
        specifications: {
            "Cleaning Coverage": "Up to 200 m²",
            "Battery Life": "3 hours",
            "Navigation": "SLAM + 3D mapping",
            "Cleaning Functions": "Vacuum, mop, UV sanitize",
            "Smart Home Integration": "Google Home, Alexa, HomeKit",
            "Camera": "1080p with night vision",
            "App Control": "iOS, Android",
            "Voice Recognition": "Multi-language support",
            "Security Features": "Intruder alert, smoke detection"
        },
        featured: true
    },
    {
        id: 8,
        title: "KitchenChef Bot",
        category: "domestic",
        price: "€4,999",
        image: "/api/placeholder/400/300",
        description: "Robotic kitchen assistant capable of preparing various meals automatically.",
        detailedDescription: "The KitchenChef Bot transforms home cooking with its ability to prepare complete meals from start to finish. Simply load the ingredients into the specialized compartments, select a recipe from the extensive database, and let the robot handle the rest. It can chop, mix, cook, and even plate your meal with chef-like precision. The system learns from feedback and can adapt recipes to your taste preferences and dietary requirements over time.",
        specifications: {
            "Recipe Database": "10,000+ recipes",
            "Cooking Techniques": "Sauté, boil, steam, bake",
            "Ingredient Capacity": "Up to 25 different ingredients",
            "Preparation Time": "15-60 minutes depending on recipe",
            "Cleaning": "Self-cleaning function",
            "User Interface": "10\" touchscreen + app control",
            "Dietary Options": "Vegetarian, vegan, gluten-free, etc.",
            "Power Requirements": "220-240V, 16A",
            "Certification": "CE, FDA food safety"
        },
        featured: false
    },
    {
        id: 9,
        title: "GardenMaster TG1",
        category: "domestic",
        price: "€2,799",
        image: "/api/placeholder/400/300",
        description: "Autonomous garden maintenance robot for lawn care and plant monitoring.",
        detailedDescription: "The GardenMaster TG1 takes the hard work out of garden maintenance. This all-weather robot mows lawns with precision, monitors soil conditions, waters plants according to their specific needs, and even assists with seasonal garden tasks. Its advanced AI can identify different plant species and detect early signs of pests or diseases. The solar-assisted charging system extends battery life, making it ideal for larger gardens.",
        specifications: {
            "Lawn Coverage": "Up to 5000 m²",
            "Cutting Height": "20-60 mm, adjustable",
            "Slope Capability": "Up to 35%",
            "Weather Resistance": "IP56 (all-weather)",
            "Plant Recognition": "1000+ species database",
            "Sensors": "Soil moisture, pH, temperature",
            "Watering System": "Precision targeted",
            "Battery Life": "4 hours (+ solar assistance)",
            "Noise Level": "<58 dB"
        },
        featured: false
    },

    // Healthcare Robots
    {
        id: 10,
        title: "CareCompanion Plus",
        category: "healthcare",
        price: "Contact for pricing",
        image: "/api/placeholder/400/300",
        description: "Assistive robot designed for elderly care and patient monitoring.",
        detailedDescription: "The CareCompanion Plus provides comprehensive support for elderly individuals or patients requiring assistance. It helps with medication management, vital sign monitoring, fall detection, and provides companionship through interactive engagement. The robot can assist with mobility, remind users of appointments or medication schedules, and alert caregivers or emergency services when necessary. With its gentle approach and intuitive interface, it enhances independence while ensuring safety.",
        specifications: {
            "Height": "1.2 meters (adjustable)",
            "Battery Life": "18 hours",
            "Monitoring": "Vital signs, fall detection, activity",
            "Assistance Features": "Medication reminders, mobility support",
            "Communication": "Video calls, emergency alerts",
            "Voice Interface": "Natural language processing",
            "Navigation": "Indoor mapping, obstacle avoidance",
            "Medical Integration": "EHR systems, telemedicine",
            "Certification": "FDA Class II, CE Medical"
        },
        featured: true
    },
    {
        id: 11,
        title: "SurgicalAssist AR",
        category: "healthcare",
        price: "Contact for pricing",
        image: "/api/placeholder/400/300",
        description: "Advanced surgical assistant robot with augmented reality guidance.",
        detailedDescription: "The SurgicalAssist AR represents the future of surgical technology, combining robotics with augmented reality to enhance surgical precision and outcomes. It provides surgeons with real-time guidance, instrument stabilization, and access to difficult-to-reach areas. The system integrates with preoperative imaging to create 3D models for planning and intraoperative navigation. Used in a variety of procedures from general surgery to specialized interventions, it reduces surgical time and improves patient recovery.",
        specifications: {
            "Robotic Arms": "4 independently controlled arms",
            "Precision": "±0.1 mm",
            "AR Resolution": "4K with depth perception",
            "Instruments": "Interchangeable, 20+ options",
            "3D Visualization": "Real-time with pre-op integration",
            "Control Interface": "Haptic feedback controllers",
            "Sterilization": "Autoclavable components",
            "Setup Time": "<15 minutes",
            "Certification": "FDA Class III, CE Medical, ISO 13485"
        },
        featured: false
    },
    {
        id: 12,
        title: "RehabiliTech Exo",
        category: "healthcare",
        price: "€45,000",
        image: "/api/placeholder/400/300",
        description: "Robotic exoskeleton for rehabilitation and mobility assistance.",
        detailedDescription: "The RehabiliTech Exo is an advanced robotic exoskeleton designed to assist patients with mobility impairments and facilitate rehabilitation following injuries or neurological conditions. It provides precisely controlled support during walking and standing exercises, allowing therapists to adjust assistance levels as patients progress. The system collects comprehensive data on movement patterns, strength, and progress, enabling evidence-based rehabilitation programs. With its lightweight design and intuitive controls, it can be used in clinical settings or prescribed for home use.",
        specifications: {
            "Weight": "12 kg",
            "Support Capacity": "Up to 100 kg",
            "Battery Life": "6 hours active use",
            "Adjustable Fit": "XS to XXL (155-195 cm height)",
            "Assistance Levels": "10 progressive settings",
            "Gait Patterns": "12 programmable patterns",
            "Sensors": "EMG, pressure, position, acceleration",
            "Data Analysis": "Real-time + cloud processing",
            "Certification": "FDA Class II, CE Medical, ISO 13485"
        },
        featured: false
    }
];

/**
 * ADMIN: DO NOT MODIFY BELOW THIS LINE
 * The following code handles the functionality of the catalog
 * and should not be modified unless you know what you're doing.
 */

// Functions to filter and display products will be defined in catalog.js