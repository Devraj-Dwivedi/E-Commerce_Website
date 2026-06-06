/**
 * AURUM - Main JavaScript
 * Handles product data, custom cursor, scroll animations, and common UI logic
 */

// --- PRODUCT DATA ---
const products = [
    {
        id: 1,
        name: "Elysian Chronograph",
        category: "Watches",
        price: 2450,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
        description: "A masterpiece of precision and elegance, featuring a brushed gold casing and sapphire crystal glass.",
        featured: true
    },
    {
        id: 2,
        name: "Midnight Essence",
        category: "Perfumes",
        price: 185,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
        description: "An intoxicating blend of dark oud, rare spices, and a hint of nocturnal jasmine.",
        featured: true
    },
    {
        id: 3,
        name: "Sovereign Cufflinks",
        category: "Accessories",
        price: 420,
        image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1000&auto=format&fit=crop",
        description: "Hand-forged 18k gold cufflinks with embedded obsidian stones.",
        featured: false
    },
    {
        id: 4,
        name: "Aurelian Diver",
        category: "Watches",
        price: 3100,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
        description: "Built for the depths, designed for the heights. Water-resistant up to 300 meters.",
        featured: true
    },
    {
        id: 5,
        name: "Velvet Orchid",
        category: "Perfumes",
        price: 210,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
        description: "A sophisticated floral scent with base notes of sandalwood and vanilla.",
        featured: false
    },
    {
        id: 6,
        name: "Onyx Card Holder",
        category: "Accessories",
        price: 150,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop",
        description: "Slim, elegant, and crafted from the finest Italian pebble-grain leather.",
        featured: true
    },
    {
        id: 7,
        name: "Lumina Tourbillon",
        category: "Watches",
        price: 12500,
        image: "https://images.unsplash.com/photo-1508685096489-7aac29145fe0?q=80&w=1000&auto=format&fit=crop",
        description: "The pinnacle of horological engineering, showcasing the movement through a skeleton dial.",
        featured: true
    },
    {
        id: 8,
        name: "Solaris Gold Pen",
        category: "Accessories",
        price: 850,
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop",
        description: "A writing instrument that commands attention, plated in 24k gold.",
        featured: false
    },
    {
        id: 9,
        name: "Amber Noir",
        category: "Perfumes",
        price: 240,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
        description: "A warm, mysterious fragrance that lingers long after the sun sets.",
        featured: true
    }
];

// --- CORE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initScrollReveal();
    initNavbarScroll();
    initMobileMenu();
    updateCartBadge();
});

// --- MOBILE MENU ---
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 6px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -6px)' : 'none';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// --- PRELOADER ---
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 1500);
        });
    }
}

// --- CUSTOM CURSOR ---
function initCustomCursor() {
    const cursor = document.createElement('div');
    const dot = document.createElement('div');
    cursor.className = 'custom-cursor';
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });

    // Cursor hover effects
    const interactables = document.querySelectorAll('a, button, .product-card, .category-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// --- SCROLL REVEAL ---
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
}

// --- NAVBAR SCROLL ---
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- CART UTILITIES ---
function getCart() {
    const cart = localStorage.getItem('aurum_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('aurum_cart', JSON.stringify(cart));
    updateCartBadge();
    animateCartIcon();
}

function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart(cart);
    }
}

function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.querySelector('.cart-count');
    if (badge) {
        badge.textContent = count;
    }
}

function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon-wrapper');
    if (cartIcon) {
        cartIcon.classList.add('pulse');
        setTimeout(() => {
            cartIcon.classList.remove('pulse');
        }, 500);
    }
}

// Export for other scripts
window.AURUM = {
    products,
    getCart,
    saveCart,
    addToCart,
    updateCartBadge
};
