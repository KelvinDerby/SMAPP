function displayCartItems() {
            const cartItemsContainer = document.getElementById('cartItems');
            const subtotalElement = document.getElementById('subtotal');
            const shippingElement = document.getElementById('shipping');
            const grandTotalElement = document.getElementById('grandTotal');
            
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            if (!cartItems.length) {
                cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
                return;
            }
            
            let subtotal = 0;
            let html = '';
            
            cartItems.forEach((item, index) => {
                const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                subtotal += price * item.quantity;
            });
            
            cartItemsContainer.innerHTML = html;
            const shipping = subtotal > 50 ? 0 : 5.99;
            const grandTotal = subtotal + shipping;
            
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            shippingElement.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
            grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
        }
        
        // Call on page load
        displayCartItems();