// Global variable to store products data
let products = [];

// Fetch products data from JSON file
async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        products = await response.json();
        renderProductGrid();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Mobile menu toggle
function setupMobileMenu() {
    document.getElementById('mobileMenuButton').addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
    });
}

// Function to render product grid
function renderProductGrid() {
    const colorGrid = document.getElementById('colorGrid');
    colorGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all transform hover:-translate-y-2';
        productCard.innerHTML = `
            <div class="card-image-container">
                <img src="${product.image}" alt="${product.name}" class="card-image">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.name}</h3>
                <div class="flex items-center mb-3">
                    <span class="inline-block w-4 h-4 rounded-full mr-2" style="background-color: ${product.colorCode}"></span>
                    <p class="text-sm text-blue-600 font-medium">${product.category}</p>
                </div>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <button class="view-details w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all" data-product-id="${product.id}">
                    View Details
                </button>
            </div>
        `;
        colorGrid.appendChild(productCard);
    });

    // Add event listeners to view detail buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            showProductDetail(productId);
        });
    });
}

// Function to show product detail
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const productDetailView = document.getElementById('productDetailView');
    const productGridView = document.getElementById('productGridView');
    
    // Get current URL to share the product
    const currentUrl = window.location.href.split('#')[0];
    const productUrl = `${currentUrl}#product-${product.id}`;
    const whatsappMessage = encodeURIComponent(`Hi Saade Decoration, I would like to know more information about ${product.name} (${productUrl})`);

    // Create detail view content
    productDetailView.innerHTML = `
        <div class="max-w-5xl mx-auto">
            <button id="backToGrid" class="flex items-center text-blue-600 hover:text-blue-800 mb-8 group">
                <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to Collection
            </button>
            
            <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="detail-image-container overflow-hidden">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-8 lg:p-12">
                        <div class="flex items-center mb-2">
                            <span class="inline-block w-5 h-5 rounded-full mr-2" style="background-color: ${product.colorCode}"></span>
                            <span class="text-sm text-blue-600 font-medium">${product.category}</span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-800 mt-2 mb-4">${product.name}</h2>
                        <div class="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mb-6"></div>
                        <p class="text-gray-600 mb-8 leading-relaxed">${product.details}</p>
                        
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                                <ul class="space-y-2">
                                    <li class="flex items-start">
                                        <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span>Water-resistant and easy to clean</span>
                                    </li>
                                    <li class="flex items-start">
                                        <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span>Lightweight and easy to install</span>
                                    </li>
                                    <li class="flex items-start">
                                        <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span>Durable and long-lasting</span>
                                    </li>
                                    <li class="flex items-start">
                                        <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span>UV resistant - won't fade over time</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="pt-6 border-t border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-800 mb-3">Specifications</h3>
                                <div class="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p class="text-gray-500">Dimensions</p>
                                        <p class="font-medium">2440 x 1220 mm</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">Thickness</p>
                                        <p class="font-medium">8mm</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">Material</p>
                                        <p class="font-medium">Premium PVC</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">Color Code</p>
                                        <p class="font-medium">${product.colorCode}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="pt-6">
                                <a href="https://wa.me/96103476547?text=${whatsappMessage}" 
                                   class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                                   target="_blank" rel="noopener noreferrer">
                                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                    </svg>
                                    Get More Information
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Hide grid view, show detail view
    productGridView.classList.add('hidden');
    productDetailView.classList.remove('hidden');

    // Add event listener to back button
    document.getElementById('backToGrid').addEventListener('click', showProductGrid);
}

// Function to show product grid
function showProductGrid() {
    const productDetailView = document.getElementById('productDetailView');
    const productGridView = document.getElementById('productGridView');

    // Hide detail view, show grid view
    productDetailView.classList.add('hidden');
    productGridView.classList.remove('hidden');
}

// Form submission handling
function setupContactForm() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, you would handle form submission here
        alert('Thank you for your message! We will contact you shortly.');
        this.reset();
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterProducts(searchTerm);
    });
}

// Filter products based on search term
function filterProducts(searchTerm) {
    const filteredProducts = searchTerm ? 
        products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        ) : products;
    
    renderPaginatedProducts(filteredProducts);
}

// Pagination variables
const productsPerPage = 8;
let currentPage = 1;

// Render paginated products
function renderPaginatedProducts(productsToRender = products) {
    const colorGrid = document.getElementById('colorGrid');
    const paginationContainer = document.getElementById('paginationContainer');
    
    if (!colorGrid || !paginationContainer) return;
    
    // Calculate pagination
    const totalPages = Math.ceil(productsToRender.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = productsToRender.slice(startIndex, endIndex);
    
    // Clear the grid
    colorGrid.innerHTML = '';
    
    // If no products match the search
    if (currentProducts.length === 0) {
        colorGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-xl font-semibold text-gray-700 mt-4">No products found</h3>
                <p class="text-gray-500 mt-2">Try adjusting your search criteria</p>
            </div>
        `;
        paginationContainer.innerHTML = '';
        return;
    }
    
    // Render the current page products
    currentProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all transform hover:-translate-y-2';
        productCard.innerHTML = `
            <div class="card-image-container">
                <img src="${product.image}" alt="${product.name}" class="card-image" loading="lazy">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.name}</h3>
                <div class="flex items-center mb-3">
                    <span class="inline-block w-4 h-4 rounded-full mr-2" style="background-color: ${product.colorCode}"></span>
                    <p class="text-sm text-blue-600 font-medium">${product.category}</p>
                </div>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <button class="view-details w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all" data-product-id="${product.id}">
                    View Details
                </button>
            </div>
        `;
        colorGrid.appendChild(productCard);
    });
    
    // Add event listeners to view detail buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            showProductDetail(productId);
        });
    });
    
    // Render pagination controls
    renderPaginationControls(totalPages, productsToRender.length);
}

// Render pagination controls
function renderPaginationControls(totalPages, totalProducts) {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    // Don't show pagination if only one page
    if (totalPages <= 1) {
        paginationContainer.innerHTML = `
            <div class="text-sm text-gray-600">
                Showing all ${totalProducts} products
            </div>
        `;
        return;
    }
    
    // Create pagination controls
    const paginationWrapper = document.createElement('div');
    paginationWrapper.className = 'flex items-center justify-between mt-8';
    
    // Info text
    const infoText = document.createElement('div');
    infoText.className = 'text-sm text-gray-600';
    infoText.textContent = `Showing ${((currentPage - 1) * productsPerPage) + 1} - ${Math.min(currentPage * productsPerPage, totalProducts)} of ${totalProducts} products`;
    
    // Controls
    const controls = document.createElement('div');
    controls.className = 'flex space-x-2';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = `px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`;
    prevButton.innerHTML = '&larr; Prev';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPaginatedProducts();
            window.scrollTo({ top: document.getElementById('productGridView').offsetTop - 100, behavior: 'smooth' });
        }
    });
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = `px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`;
    nextButton.innerHTML = 'Next &rarr;';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPaginatedProducts();
            window.scrollTo({ top: document.getElementById('productGridView').offsetTop - 100, behavior: 'smooth' });
        }
    });
    
    controls.appendChild(prevButton);
    
    // Page numbers (show up to 5 pages)
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = `px-3 py-1 rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`;
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderPaginatedProducts();
            window.scrollTo({ top: document.getElementById('productGridView').offsetTop - 100, behavior: 'smooth' });
        });
        controls.appendChild(pageButton);
    }
    
    controls.appendChild(nextButton);
    
    paginationWrapper.appendChild(infoText);
    paginationWrapper.appendChild(controls);
    paginationContainer.appendChild(paginationWrapper);
}

// Category filter functionality
function setupCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    // Get unique categories
    const categories = [...new Set(products.map(product => product.category))];
    
    // Add "All" option
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    
    // Add category options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    
    // Add change event listener
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        const searchTerm = document.getElementById('productSearch')?.value.toLowerCase().trim() || '';
        
        // Filter by both category and search term
        const filteredProducts = products.filter(product => {
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            const matchesSearch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm);
            
            return matchesCategory && matchesSearch;
        });
        
        // Reset to first page when filter changes
        currentPage = 1;
        renderPaginatedProducts(filteredProducts);
    });
}

// Sort functionality
function setupSortOrder() {
    const sortOrder = document.getElementById('sortOrder');
    if (!sortOrder) return;
    
    sortOrder.addEventListener('change', function() {
        const selectedSort = this.value;
        const searchTerm = document.getElementById('productSearch')?.value.toLowerCase().trim() || '';
        const selectedCategory = document.getElementById('categoryFilter')?.value || '';
        
        // First filter products
        const filteredProducts = products.filter(product => {
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            const matchesSearch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm);
            
            return matchesCategory && matchesSearch;
        });
        
        // Then sort the filtered products
        const sortedProducts = [...filteredProducts];
        
        switch(selectedSort) {
            case 'nameAsc':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'nameDesc':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'categoryAsc':
                sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
                break;
        }
        
        // Reset to first page when sort changes
        currentPage = 1;
        renderPaginatedProducts(sortedProducts);
    });
}

// WhatsApp functionality
function setupWhatsAppButtons() {
    // Add floating WhatsApp button
    const floatingButton = document.createElement('div');
    floatingButton.className = 'fixed bottom-6 right-6 z-50';
    floatingButton.innerHTML = `
        <a href="https://wa.me/96103476547?text=Hi%20Saade%20Decoration,%20I'm%20interested%20in%20your%20products." 
           class="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-all transform hover:scale-110"
           target="_blank" rel="noopener noreferrer">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
        </a>
    `;
    document.body.appendChild(floatingButton);
}

// Setup interactive map with all locations
function setupInteractiveMap() {
    // Define locations with coordinates
    const locations = [
        {
            name: "Saida Showroom",
            coords: { lat: 33.5599, lng: 35.3733 },
            color: "blue",
            color: "blue"
        },
        {
            name: "Haret Hriek Branch",
            coords: { lat: 33.8583, lng: 35.5194 },
            color: "purple"
        },
        {
            name: "Deir al Zahrani Branch",
            coords: { lat: 33.5167, lng: 35.4833 },
            color: "green"
        },
        {
            name: "Aakkar Branch (Wakil)",
            coords: { lat: 34.5333, lng: 36.0667 },
            color: "amber"
        }
    ];
    
    // Replace the static map with an interactive map that shows all locations
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    // Create a new map iframe with all locations marked
    // For a real implementation, we would use Google Maps JavaScript API
    // But for this example, we'll use a static map with multiple markers
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d423534.12784845213!2d35.48165549510188!3d33.88916954212313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sLebanon!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus`;
    
    mapContainer.innerHTML = `
        <iframe 
            src="${mapUrl}" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    `;
    
    // Add location selector
    const locationSelector = document.createElement('div');
    locationSelector.className = 'bg-white rounded-lg shadow-md p-4 absolute top-4 right-4 z-10';
    locationSelector.innerHTML = `
        <h4 class="font-medium text-gray-800 mb-2">View Location</h4>
        <select id="mapLocationSelector" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Locations</option>
            ${locations.map(loc => `<option value="${loc.name}">${loc.name}</option>`).join('')}
        </select>
    `;
    
    mapContainer.style.position = 'relative';
    mapContainer.appendChild(locationSelector);
}

// Initialize the page
function initApp() {
    // Fetch products first
    fetchProducts()
        .then(() => {
            // Set up UI components after products are loaded
            setupMobileMenu();
            setupContactForm();
            setupSearch();
            setupCategoryFilter();
            setupSortOrder();
            setupWhatsAppButtons();
            setupInteractiveMap();
        })
        .catch(error => {
            console.error('Failed to initialize app:', error);
        });
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);