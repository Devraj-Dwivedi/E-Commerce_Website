/**
 * AURUM - Cart Page Logic
 * Handles rendering the cart, quantity updates, and checkout simulation
 */

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items-container')) {
        renderCart();
    }
});

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const cart = window.AURUM.getCart();
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-message">
                <p>Your collection is currently empty.</p>
                <a href="shop.html" class="btn-gold" style="margin-top: 20px;">Explore Collection</a>
            </div>
        `;
        updateSummary(0);
        return;
    }

    let cartHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        cartHTML += `
            <div class="cart-item glass-panel reveal active">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="brand-font">${item.name}</h3>
                    <p class="category">${item.category}</p>
                    <p class="price">$${item.price.toLocaleString()}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    $${(item.price * item.quantity).toLocaleString()}
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
    });

    container.innerHTML = cartHTML;
    updateSummary(subtotal);
}

function changeQuantity(productId, delta) {
    const cart = window.AURUM.getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            window.AURUM.saveCart(cart);
            renderCart();
        }
    }
}

function removeFromCart(productId) {
    let cart = window.AURUM.getCart();
    cart = cart.filter(item => item.id !== productId);
    window.AURUM.saveCart(cart);
    renderCart();
}

function updateSummary(subtotal) {
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const subtotalEl = document.getElementById('summary-subtotal');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (taxEl) taxEl.textContent = `$${tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
}

function checkout() {
    const cart = window.AURUM.getCart();
    if (cart.length === 0) return;

    // Show success modal
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.style.display = 'flex';
        // Clear cart after "successful" purchase
        window.AURUM.saveCart([]);
    }
}

function closeModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.style.display = 'none';
        window.location.href = 'index.html';
    }
}
