// Array to hold the product data
const products = [
    { id: 1, name: 'Product 1', price: 10, image: 'https://cdn.magicdecor.in/com/2024/05/22173454/Football-Abstract-Design-Wallpaper-Mural-710x488.jpg' },
    { id: 2, name: 'Product 2', price: 20, image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQGynSoAuF8UQIXx6dUbtibxOpM-SgQKfeZnyLPVXZgIYwxUr2QDvM_CjOZDtVEnVUmKe9zqcbXmrrGcam3XPwmyngZvD3YV1hQxVYegm_ISEhX81gjNRp-Ng' },
    { id: 3, name: 'Product 3', price: 30, image: 'https://m.media-amazon.com/images/I/81+aRgMI-wL._SY695_.jpg' },
    { id: 4, name: 'Product 4', price: 40, image: 'https://www.activesgcircle.gov.sg/hubfs/Circle%202.0%20-%202021/images/GC111_1_Wikimedia.jpg' },
    { id: 5, name: 'Product 5', price: 50, image: 'https://www.jiomart.com/images/product/original/rvdbbkugfn/cw_sckg_103-product-images-orvdbbkugfn-p591117928-0-202202260602.jpg?im=Resize=(420,420)' }
];

// Array to hold the cart items
let cart = [];

// Function to render the product grid
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="product-card-inner">
                <div class="product-card-front">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="add-to-cart-front" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
                <div class="product-card-back">
                    <h4>Details</h4>
                    <p>Description of the product goes here. This is a great product!</p>
                    <p>Material: Cotton</p>
                    <p>Size: M, L, XL</p>
                    <button class="add-to-cart-back" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Function to add items to the cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }
}

// Function to remove items from the cart
function removeFromCart(id) {
    const cartItemIndex = cart.findIndex(item => item.id === id);
    if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            cart.splice(cartItemIndex, 1);
        }
        renderCart(); // Ensure UI updates after removing an item
    }
}

// Function to render the cart contents
function renderCart() {
    const cartContainer = document.querySelector('.cart-content');
    cartContainer.innerHTML = ''; // Clear existing content

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    const cartList = document.createElement('ul');
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price} x ${item.quantity} (Total: $${item.price * item.quantity})`;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeFromCart(item.id);
        
        cartItem.appendChild(removeButton);
        cartList.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    const totalPriceElement = document.createElement('p');
    totalPriceElement.classList.add('cart-total');
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;

    const proceedButton = document.createElement('button');
    proceedButton.id = "proceedToPay";
    proceedButton.classList.add('proceed-btn');
    proceedButton.textContent = "Proceed to Pay";
    proceedButton.addEventListener("click", function () {
        window.location.href = "payment.html"; // Redirect to payment page
    });

    cartContainer.appendChild(cartList);
    cartContainer.appendChild(totalPriceElement);
    cartContainer.appendChild(proceedButton);
}

// Initialize product rendering on page load
document.addEventListener('DOMContentLoaded', renderProducts);
