/**
 * Site Customizer JavaScript for TGen Robotics Website
 */

const siteCustomizer = (function() {
    // Private variables
    const THEME_STORAGE_KEY = 'tgen_theme';
    const LAYOUT_STORAGE_KEY = 'tgen_layout';
    const FONT_STORAGE_KEY = 'tgen_font';
    
    // Default values
    const DEFAULT_THEME = 'theme-blue';
    const DEFAULT_LAYOUT = 'layout-boxed';
    const DEFAULT_FONT = 'font-default';
    
    // Get saved settings
    const getSavedTheme = function() {
        return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
    };
    
    const getSavedLayout = function() {
        return localStorage.getItem(LAYOUT_STORAGE_KEY) || DEFAULT_LAYOUT;
    };
    
    const getSavedFont = function() {
        return localStorage.getItem(FONT_STORAGE_KEY) || DEFAULT_FONT;
    };
    
    // Apply saved settings
    const applySettings = function() {
        const theme = getSavedTheme();
        const layout = getSavedLayout();
        const font = getSavedFont();
        
        // Remove existing classes
        document.body.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-red');
        document.body.classList.remove('layout-wide', 'layout-boxed');
        document.body.classList.remove('font-default', 'font-poppins', 'font-roboto', 'font-opensans');
        
        // Add new classes
        document.body.classList.add(theme);
        document.body.classList.add(layout);
        document.body.classList.add(font);
        
        // Update customizer UI
        updateCustomizerUI();
    };
    
    // Update customizer UI
    const updateCustomizerUI = function() {
        const theme = getSavedTheme();
        const layout = getSavedLayout();
        const font = getSavedFont();
        
        // Update theme options
        const themeOptions = document.querySelectorAll('.color-option');
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            }
        });
        
        // Update layout options
        const layoutOptions = document.querySelectorAll('.layout-option');
        layoutOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-layout') === layout) {
                option.classList.add('active');
            }
        });
        
        // Update font options
        const fontOptions = document.querySelectorAll('.font-option');
        fontOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-font') === font) {
                option.classList.add('active');
            }
        });
    };
    
    // Create customizer HTML
    const createCustomizer = function() {
        const customizerHTML = `
            <div class="site-customizer-toggle">
                <span>🎨</span>
            </div>
            <div class="site-customizer">
                <div class="site-customizer-header">
                    <h3>Site Customizer</h3>
                    <button class="site-customizer-close">×</button>
                </div>
                <div class="site-customizer-content">
                    <div class="customizer-section">
                        <h4>Color Theme</h4>
                        <div class="color-options">
                            <div class="color-option color-blue" data-theme="theme-blue"></div>
                            <div class="color-option color-green" data-theme="theme-green"></div>
                            <div class="color-option color-purple" data-theme="theme-purple"></div>
                            <div class="color-option color-red" data-theme="theme-red"></div>
                        </div>
                    </div>
                    <div class="customizer-section">
                        <h4>Layout</h4>
                        <div class="layout-options">
                            <div class="layout-option" data-layout="layout-boxed">Boxed</div>
                            <div class="layout-option" data-layout="layout-wide">Wide</div>
                        </div>
                    </div>
                    <div class="customizer-section">
                        <h4>Font</h4>
                        <div class="font-options">
                            <div class="font-option font-default" data-font="font-default">Default</div>
                            <div class="font-option font-poppins" data-font="font-poppins">Poppins</div>
                            <div class="font-option font-roboto" data-font="font-roboto">Roboto</div>
                            <div class="font-option font-opensans" data-font="font-opensans">Open Sans</div>
                        </div>
                    </div>
                    <div class="reset-options">
                        <button class="reset-button">Reset to Default</button>
                    </div>
                </div>
            </div>
        `;
        
        // Create wrapper element
        const customizerWrapper = document.createElement('div');
        customizerWrapper.classList.add('site-customizer-wrapper');
        customizerWrapper.innerHTML = customizerHTML;
        
        // Append to body
        document.body.appendChild(customizerWrapper);
    };
    
    // Initialize event listeners
    const initEventListeners = function() {
        // Toggle customizer
        const toggleButton = document.querySelector('.site-customizer-toggle');
        const customizer = document.querySelector('.site-customizer');
        const closeButton = document.querySelector('.site-customizer-close');
        
        if (toggleButton && customizer && closeButton) {
            toggleButton.addEventListener('click', function() {
                customizer.classList.toggle('active');
            });
            
            closeButton.addEventListener('click', function() {
                customizer.classList.remove('active');
            });
        }
        
        // Theme options
        const themeOptions = document.querySelectorAll('.color-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                localStorage.setItem(THEME_STORAGE_KEY, theme);
                applySettings();
            });
        });
        
        // Layout options
        const layoutOptions = document.querySelectorAll('.layout-option');
        layoutOptions.forEach(option => {
            option.addEventListener('click', function() {
                const layout = this.getAttribute('data-layout');
                localStorage.setItem(LAYOUT_STORAGE_KEY, layout);
                applySettings();
            });
        });
        
        // Font options
        const fontOptions = document.querySelectorAll('.font-option');
        fontOptions.forEach(option => {
            option.addEventListener('click', function() {
                const font = this.getAttribute('data-font');
                localStorage.setItem(FONT_STORAGE_KEY, font);
                applySettings();
            });
        });
        
        // Reset button
        const resetButton = document.querySelector('.reset-button');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                localStorage.removeItem(THEME_STORAGE_KEY);
                localStorage.removeItem(LAYOUT_STORAGE_KEY);
                localStorage.removeItem(FONT_STORAGE_KEY);
                applySettings();
            });
        }
    };
    
    // Load Google Fonts
    const loadGoogleFonts = function() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap';
        document.head.appendChild(link);
    };
    
    // Public methods
    return {
        init: function() {
            // Load Google Fonts
            loadGoogleFonts();
            
            // Create customizer HTML
            createCustomizer();
            
            // Apply saved settings
            applySettings();
            
            // Initialize event listeners
            initEventListeners();
        }
    };
})();

// Initialize site customizer on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    siteCustomizer.init();
});