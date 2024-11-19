document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "EcoSun Basic", brand: "EcoSun", price: 199.99, warranty: "10 years", size: "1.6x1", power: "250W", priceCategory: "low", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBwYW5lbHxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 2, name: "SolarMax Pro", brand: "SolarMax", price: 349.99, warranty: "25 years", size: "1.7x1.1", power: "350W", priceCategory: "average", image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c29sYXIlMjBwYW5lbHxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 3, name: "PowerPlus Elite", brand: "PowerPlus", price: 499.99, warranty: "30 years", size: "1.8x1.2", power: "450W", priceCategory: "high", image: "https://images.unsplash.com/photo-1592833159117-ac790d4066e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvbGFyJTIwcGFuZWx8ZW58MHx8MHx8fDA%3D" },
        { id: 4, name: "GreenEnergy Eco", brand: "GreenEnergy", price: 249.99, warranty: "15 years", size: "1.5x1", power: "300W", priceCategory: "low", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNvbGFyJTIwcGFuZWx8ZW58MHx8MHx8fDA%3D" },
        { id: 5, name: "SunPower Deluxe", brand: "SunPower", price: 399.99, warranty: "25 years", size: "1.7x1.1", power: "400W", priceCategory: "average", image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNvbGFyJTIwcGFuZWx8ZW58MHx8MHx8fDA%3D" },
    ];

    const cart = [];
    const productList = document.getElementById('product-list');
    const aiSuggestions = document.getElementById('ai-suggestions');
    const cartCount = document.getElementById('cart-count');
    const loginModal = document.getElementById('login-modal');
    const productModal = document.getElementById('product-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const loginButton = document.getElementById('login-button');
    const closeButtons = document.querySelectorAll('.close');
    const tabButtons = loginModal.querySelectorAll('.tab-button');
    const tabContents = loginModal.querySelectorAll('.tab-content');
    const proceedToCheckoutButton = document.getElementById('proceed-to-checkout');

    function displayProducts(container, productArray) {
        container.innerHTML = '';
        productArray.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Brand: ${product.brand}</p>
                <p>Price: $${product.price}</p>
                <p>Warranty: ${product.warranty}</p>
                <p>Size: ${product.size} m</p>
                <p>Power: ${product.power}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            container.appendChild(productElement);
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCartCount();
            showProductModal(product);
        }
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function getSuggestions(size, priceRanges) {
        const suggestedProducts = products.filter(product => {
            const [width, height] = product.size.split('x').map(dim => parseFloat(dim));
            const area = width * height;
            return area <= size && priceRanges.includes(product.priceCategory);
        });
        displayProducts(aiSuggestions, suggestedProducts);
    }

    function showProductModal(product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;">
            <p>Brand: ${product.brand}</p>
            <p>Price: $${product.price}</p>
            <p>Warranty: ${product.warranty}</p>
            <p>Size: ${product.size} m</p>
            <p>Power: ${product.power}</p>
        `;
        productModal.style.display = 'block';
    }

    function showCheckoutModal() {
        checkoutModal.style.display = 'block';
    }

    displayProducts(productList, products);

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    document.getElementById('ai-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const size = parseFloat(document.getElementById('size').value);
        const priceRanges = Array.from(e.target.querySelectorAll('input[name="price-range"]:checked')).map(input => input.value);
        getSuggestions(size, priceRanges);
    });

    loginButton.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.style.display = 'none';
            productModal.style.display = 'none';
            checkoutModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal || e.target === productModal || e.target === checkoutModal) {
            loginModal.style.display = 'none';
            productModal.style.display = 'none';
            checkoutModal.style.display = 'none';
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(`${button.dataset.tab}-tab`).classList.add('active');
        });
    });

    proceedToCheckoutButton.addEventListener('click', () => {
        productModal.style.display = 'none';
        showCheckoutModal();
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your purchase!');
        checkoutModal.style.display = 'none';
        cart.length = 0;
        updateCartCount();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});