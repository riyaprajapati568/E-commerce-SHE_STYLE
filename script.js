
    // Sample Products Data
const products = [
    {id: 1, image: 'https://i.pinimg.com/736x/63/c7/e8/63c7e8f5b415ffe2808a47ec97a08552.jpg', name: 'Floral Summer Dress', brand: 'StyleHub', category: 'clothing', price: 49.99, originalPrice: 79.99, discount: 38, rating: 4.5, reviews: 128},
    {id: 2, image: 'https://i.pinimg.com/736x/a9/56/d4/a956d441a0a5b68e4835a90b1de2cc0b.jpg', name: 'Designer Handbag', brand: 'LuxeBags', category: 'accessories', price: 129.99, originalPrice: 199.99, discount: 35, rating: 4.8, reviews: 256},
    {id: 3, image: 'https://i.pinimg.com/736x/cb/8d/2a/cb8d2aa80d19e6b41de92f1b22d88b9d.jpg', name: 'High Heel Sandals', brand: 'FootGlam', category: 'footwear', price: 79.99, originalPrice: 119.99, discount: 33, rating: 4.3, reviews: 89},
    {id: 4, image: 'https://i.pinimg.com/1200x/cb/9f/75/cb9f750e3936af9a3d26481503f7d410.jpg', name: 'Premium Lipstick Set', brand: 'BeautyPro', category: 'beauty', price: 34.99, originalPrice: 49.99, discount: 30, rating: 4.6, reviews: 342},
    {id: 5, image: 'https://i.pinimg.com/736x/2b/08/2f/2b082f0c8e1f4bb8b0957ec9680a5f10.jpg', name: 'Casual Denim Jacket', brand: 'UrbanWear', category: 'clothing', price: 69.99, originalPrice: 99.99, discount: 30, rating: 4.7, reviews: 167},
    {id: 6, image: 'https://i.pinimg.com/1200x/a4/ed/c7/a4edc7a5809545203afdedcc1da4dd4e.jpg', name: 'Gold Chain Necklace', brand: 'GemStyle', category: 'accessories', price: 89.99, originalPrice: 149.99, discount: 40, rating: 4.9, reviews: 203},
    {id: 7, image: 'https://i.pinimg.com/1200x/c8/43/2c/c8432c520aca1fcff728ec8930d57d0c.jpg', name: 'Running Sneakers', brand: 'ActiveFit', category: 'footwear', price: 94.99, originalPrice: 139.99, discount: 32, rating: 4.4, reviews: 421},
    {id: 8, image: 'https://i.pinimg.com/736x/c1/9a/5f/c19a5f547fca829b0a591badb6b8a0eb.jpg', name: 'Skincare Bundle', brand: 'GlowUp', category: 'beauty', price: 59.99, originalPrice: 89.99, discount: 33, rating: 4.7, reviews: 189},
    {id: 9, image: 'https://i.pinimg.com/736x/4a/a8/f1/4aa8f17cee2501efc8d232149995f7fc.jpg', name: 'Evening Gown', brand: 'Elegance', category: 'clothing', price: 159.99, originalPrice: 249.99, discount: 36, rating: 4.9, reviews: 92},
    {id: 10, image: 'https://i.pinimg.com/1200x/3c/68/f3/3c68f3dca01f5047fe81a17058b963a5.jpg', name: 'Leather Wallet', brand: 'ClassicLeather', category: 'accessories', price: 139.99, originalPrice: 159.99, discount: 33, rating: 4.5, reviews: 156},
    {id: 11, image: 'https://i.pinimg.com/736x/90/52/ee/9052ee57d4516c13f5146836435cd618.jpg', name: 'Ankle Boots', brand: 'TrendyFeet', category: 'footwear', price: 119.99, originalPrice: 179.99, discount: 33, rating: 4.6, reviews: 234},
    {id: 12, image: 'https://i.pinimg.com/1200x/96/60/a8/9660a876df3139c5fc1b5bde09e3e20b.jpg', name: 'Perfume Gift Set', brand: 'Essence', category: 'beauty', price: 179.99, originalPrice: 119.99, discount: 33, rating: 4.8, reviews: 312},
];

let cart = [];
let wishlist = [];
let currentUser = null;
let currentFilter = 'all';
let isSignUp = false;
let displayedProducts = [...products];

// Initialize
function init() {
    loadFromStorage();
    displayProducts(products);
    updateCartCount();
    updateWishlistCount();
    setupSearch();
}

// Load from localStorage
function loadFromStorage() {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedWishlist) wishlist = JSON.parse(savedWishlist);
    if (savedUser) currentUser = JSON.parse(savedUser);
}

// Save to localStorage
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Display products
function displayProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const isInWishlist = wishlist.some(item => item.id === product.id);
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlistItem(${product.id}, event)">
                    <i class="fa${isInWishlist ? 's' : 'r'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-title">${product.name}</div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    <span class="discount">${product.discount}% OFF</span>
                </div>
                <div class="rating">
                    <span class="stars">${stars}</span>
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'clothing': 'tshirt',
        'accessories': 'gem',
        'footwear': 'shoe-prints',
        'beauty': 'spray-can'
    };
    return icons[category] || 'tag';
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter and display
    if (category === 'all') {
        displayedProducts = [...products];
    } else {
        displayedProducts = products.filter(p => p.category === category);
    }
    
    displayProducts(displayedProducts);
    showNotification(`Showing ${category === 'all' ? 'all' : category} products`);
}

// Filter by category (from category cards)
function filterByCategory(category) {
    scrollToProducts();
    setTimeout(() => {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === category) {
                btn.classList.add('active');
            }
        });
        filterProducts(category);
    }, 500);
}

// Sort products
function sortProducts(sortType) {
    let sorted = [...displayedProducts];
    
    switch(sortType) {
        case 'priceLow':
            sorted.sort((a, b) => a.price - b.price);
            showNotification('Sorted by price: Low to High');
            break;
        case 'priceHigh':
            sorted.sort((a, b) => b.price - a.price);
            showNotification('Sorted by price: High to Low');
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            showNotification('Sorted by highest rating');
            break;
        case 'discount':
            sorted.sort((a, b) => b.discount - a.discount);
            showNotification('Sorted by best discount');
            break;
    }
    
    displayProducts(sorted);
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm === '') {
            displayedProducts = currentFilter === 'all' 
                ? [...products] 
                : products.filter(p => p.category === currentFilter);
        } else {
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.brand.toLowerCase().includes(searchTerm) ||
                p.category.toLowerCase().includes(searchTerm)
            );
            displayedProducts = filtered;
        }
        
        displayProducts(displayedProducts);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`Quantity updated for ${product.name}`);
    } else {
        cart.push({...product, quantity: 1});
        showNotification(`${product.name} added to cart!`);
    }
    
    updateCartCount();
    saveToStorage();
}

// Remove from cart
function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
    saveToStorage();
    showNotification(`${product.name} removed from cart`);
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            saveToStorage();
        }
    }
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" onclick="toggleCart()" style="margin-top: 15px;">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    let subtotal = 0;
    let savings = 0;
    
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        const itemSavings = (item.originalPrice - item.price) * item.quantity;
        subtotal += itemTotal;
        savings += itemSavings;
        
        return `
            <div class="cart-item">
                <div class="cart-item-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-brand">${item.brand}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
                <div style="font-weight: bold; color: var(--primary-color);">
                    $${itemTotal.toFixed(2)}
                </div>
            </div>
        `;
    }).join('');
    
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;
    
    cartItems.innerHTML += `
        <div class="cart-total">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>You Save:</span>
                <span style="color: var(--success);">-$${savings.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="total-row final">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-secondary" style="width: 100%; margin-top: 20px;" onclick="checkout()">
                <i class="fas fa-lock"></i> Proceed to Checkout
            </button>
            <button class="btn btn-outline" style="width: 100%; margin-top: 10px;" onclick="toggleCart()">
                Continue Shopping
            </button>
        </div>
    `;
}

// Toggle wishlist item
function toggleWishlistItem(productId, event) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification(`${product.name} removed from wishlist`);
    } else {
        wishlist.push(product);
        showNotification(`${product.name} added to wishlist!`);
    }
    
    updateWishlistCount();
    saveToStorage();
    displayProducts(displayedProducts);
}

// Update wishlist count
function updateWishlistCount() {
    document.getElementById('wishlistCount').textContent = wishlist.length;
}

// Update wishlist display
function updateWishlistDisplay() {
    const wishlistItems = document.getElementById('wishlistItems');
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-cart">
                <i class="far fa-heart"></i>
                <p>Your wishlist is empty</p>
                <button class="btn btn-primary" onclick="toggleWishlist()" style="margin-top: 15px;">Browse Products</button>
            </div>
        `;
        return;
    }
    
    wishlistItems.innerHTML = wishlist.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-brand">${item.brand}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div style="margin-top: 10px; display: flex; gap: 10px;">
                    <button class="btn btn-secondary" style="padding: 8px 15px; font-size: 14px;" onclick="addToCart(${item.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="remove-btn" onclick="toggleWishlistItem(${item.id}, event); updateWishlistDisplay();">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div style="font-weight: bold; color: var(--primary-color);">
                ${item.discount}% OFF
            </div>
        </div>
    `).join('');
}

// Toggle modals
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        updateCartDisplay();
    }
}

function toggleWishlist() {
    const modal = document.getElementById('wishlistModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        updateWishlistDisplay();
    }
}

function toggleAuth() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        updateAuthDisplay();
    }
}

// Toggle auth mode
function toggleAuthMode() {
    isSignUp = !isSignUp;
    const nameGroup = document.getElementById('nameGroup');
    const authTitle = document.getElementById('authTitle');
    const authBtnText = document.getElementById('authBtnText');
    const toggleText = document.getElementById('toggleText');
    
    if (isSignUp) {
        nameGroup.style.display = 'block';
        authTitle.textContent = 'Create Account';
        authBtnText.textContent = 'Sign Up';
        toggleText.textContent = 'Already have an account?';
    } else {
        nameGroup.style.display = 'none';
        authTitle.textContent = 'Sign In';
        authBtnText.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
    }
}

// Handle authentication
function handleAuth(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;
    
    if (isSignUp) {
        currentUser = {
            name: fullName,
            email: email,
            joinedDate: new Date().toLocaleDateString()
        };
        showNotification(`Welcome ${fullName}! Account created successfully!`);
    } else {
        currentUser = {
            name: email.split('@')[0],
            email: email,
            joinedDate: new Date().toLocaleDateString()
        };
        showNotification(`Welcome back, ${currentUser.name}!`);
    }
    
    saveToStorage();
    updateAuthDisplay();
    document.getElementById('authForm').reset();
}

// Update auth display
function updateAuthDisplay() {
    const userDisplay = document.getElementById('userDisplay');
    const authForm = document.getElementById('authForm');
    
    if (currentUser) {
        authForm.style.display = 'none';
        userDisplay.style.display = 'block';
        userDisplay.innerHTML = `
            <div class="user-info">
                <h3><i class="fas fa-user-circle"></i> ${currentUser.name}</h3>
                <p><i class="fas fa-envelope"></i> ${currentUser.email}</p>
                <p><i class="fas fa-calendar"></i> Member since: ${currentUser.joinedDate}</p>
                <button class="btn btn-outline" style="width: 100%; margin-top: 15px;" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        `;
    } else {
        authForm.style.display = 'block';
        userDisplay.style.display = 'none';
    }
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthDisplay();
    showNotification('Logged out successfully');
}

// Checkout
function checkout() {
    if (!currentUser) {
        toggleCart();
        setTimeout(() => toggleAuth(), 300);
        showNotification('Please sign in to checkout');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Order placed successfully! Total: $${total.toFixed(2)}`);
    cart = [];
    updateCartCount();
    saveToStorage();
    toggleCart();
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    showNotification(`Thanks for subscribing with ${email}!`);
    event.target.reset();
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    document.getElementById('notificationText').textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Initialize on load
window.onload = init;