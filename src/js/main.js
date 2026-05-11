const productsSection = document.querySelector(".products-card-list");
const cartSection = document.querySelector(".cart-section");
const cart = []
let allProducts = [];
async function fetchProducts(){
    const res = await fetch("./data.json");
    return await res.json();
}

function renderProductCard(product){
    return `
    <article class="product-card">
    <div class="product-card__thumbnail">
        <img src="${product.image.desktop}" alt="${product.name}"/>
        <button class="add-to-cart-btn" data-id="${product.name}">
        <div class="add-to-cart__icon">
            <img src="./assets/images/icon-add-to-cart.svg" alt="add-to-cart"/>
        </div>
        <p class="add-to-cart__title">Add to Cart</p>
</button>
</div>
<div class="product-card__content">
    <p class="product-card__category">${product.category}</p>
    <h1 class="product-card__title">${product.name}</h1>
    <span class="product-card__price">$${product.price.toFixed(2)}</span>
</div>
</article>`
}

function renderAllProducts(products){
    const productsHTML = products.map(renderProductCard);
    productsSection.innerHTML = productsHTML.join("")
}

function renderCart(){
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalOrderPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    if(cart.length === 0){
        cartSection.innerHTML = `
        <h1 class="your-cart">Your Cart (0)</h1>
  <div class="cart-empty">
    <div class="cart-empty__image">
      <img src="./assets/images/illustration-empty-cart.svg" alt=""/>
    </div>
    <p class="cart-empty__description">Your added items will appear here</p>
  </div>`
        return;
    }

    const cartItemHTML = cart.map(item => {
        return `
        <article class="cart-item">
            <h1 class="cart-item__name">${item.name}</h1>
            <div class="cart-item__infor">
            <p class="cart-item__quantity">${item.quantity}x</p>
            <p class="cart-item__price">@${item.price.toFixed(2)}</p>
            <p class="cart-item__total">$${(item.price * item.quantity).toFixed(2)}</p>
</div>
<hr class="cart-item__end"/>

</article>`}).join("")
    cartSection.innerHTML = `
    <h1 class="your-cart">Your Cart (${totalQuantity})</h1>
    <div class="carts">
        ${cartItemHTML}
    </div>
        <div class="total">
        <p class="total__title">Order Total</p>
        <span class="total__price">$${totalOrderPrice.toFixed(2)}</span>
</div>
<div class="carbon-neutral">
    <div class="carbon-neutral__icon">
    <img src="../../assets/images/icon-carbon-neutral.svg" alt="carbon neutral icon"/>
</div>
<p class="carbon-neutral__description">
This is a <span class="carbon-neutral__emphasize">carbon-neutral</span> delivery
</p>
</div>
<button type="button" class="confirm-btn">Confirm Order</button>
`
}

function addToCart(productName){
    const existingItem = cart.find(item => item.name === productName);
    if(existingItem){
        existingItem.quantity+=1;
    }else{
        const product = allProducts.find(product => product.name === productName);
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        })
    }
    renderCart()
}

function increaseQuantity(productName){
    const cartItem = cart.find(item => item.name === productName);
    if(!cartItem) return;

    cartItem.quantity += 1;
    renderCart()
}

function decreaseQuantity(productName){
    const cartItem = cart.find(item => item.name === productName);
    if(!cartItem) return;
    cartItem.quantity -= 1;

    if(cartItem.quantity <= 0){
        const cartIndex = cart.findIndex(item => item.name === productName);
        cart.splice(cartIndex, 1);
    }
    renderCart()
}

function setUpQuantityBtns(button, productName){
    const decrementBtn = button.querySelector(".decrement-btn");
    const incrementBtn = button.querySelector(".increment-btn");
    const quantityValue = button.querySelector(".quantity-value");

    incrementBtn.addEventListener("click", e => {
        e.stopPropagation();
        increaseQuantity(productName);

        const cartItem = cart.find(item => item.name === productName);
        quantityValue.textContent = cartItem.quantity;
    })

    decrementBtn.addEventListener("click", e => {
        e.stopPropagation();
        decreaseQuantity(productName);
        const cartItem = cart.find(item => item.name === productName);

        if(!cartItem){
            button.classList.remove("active");
            const productCardThumbnail = button.closest(".product-card__thumbnail");
            productCardThumbnail.classList.remove("active");
            button.innerHTML = `
            <div class="add-to-cart__icon">
            <img src="./assets/images/icon-add-to-cart.svg" alt="add-to-cart"/>
        </div>
        <p class="add-to-cart__title">Add to Cart</p>`
            return;
        }
        quantityValue.textContent = cartItem.quantity;
    })
}

function setUpAddToCartBtn(){
    const buttons = document.querySelectorAll(".add-to-cart-btn");
    buttons.forEach(button => {

        button.addEventListener("click", () => {
            if(button.classList.contains("active")){
                return;
            }
            const productName = button.dataset.id;
            addToCart(productName);
            button.classList.add("active");

            const productCardThumbnail = button.closest(".product-card__thumbnail");
            productCardThumbnail.classList.add("active");
            button.innerHTML = `
            <div role="button" class="decrement-btn">
                <img src="../../assets/images/icon-decrement-quantity.svg" alt="decrement quantity"/>
            </div>
            <p class="quantity-value">1</p>
            <div role="button" class="increment-btn">
                <img src="../../assets/images/icon-increment-quantity.svg" alt="increment quantity"/>
            </div>`

            setUpQuantityBtns(button, productName)
        })
    })
}

async function init(){
    const products = await fetchProducts();
    allProducts = products;
    renderAllProducts(products);
    setUpAddToCartBtn();
}

void init()