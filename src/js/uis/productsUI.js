const productsSection = document.querySelector(".products-card-list");

export function renderAllProducts(products){
    const productsHTML = products.map(renderProductCard);
    productsSection.innerHTML = productsHTML.join("")
}

export function renderProductCard(product){
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
    <h2 class="product-card__title">${product.name}</h2>
    <span class="product-card__price">$${product.price.toFixed(2)}</span>
</div>
</article>`
}

export function resetAllProductCards(){
    const activeButtons = document.querySelectorAll(".add-to-cart-btn.active");
    activeButtons.forEach(button => {
        button.classList.remove("active");
        const productThumbnail = button.closest(".product-card__thumbnail");
        productThumbnail.classList.remove("active");

        button.innerHTML = `
            <div class="add-to-cart__icon">
                <img 
                    src="../../../assets/images/icon-add-to-cart.svg" 
                    alt="add-to-cart"
                />
            </div>

            <p class="add-to-cart__title">
                Add to Cart
            </p>
        `;
    })
}

export function resetProductCard(productName){
    const addToCartBtn = document.querySelector(`.add-to-cart-btn[data-id="${productName}"]`)
    if(!addToCartBtn) return;
    addToCartBtn.classList.remove("active");
    const productThumbnail = addToCartBtn.closest(".product-card__thumbnail");
    productThumbnail.classList.remove("active");

    addToCartBtn.innerHTML = `
    <div class="add-to-cart__icon">
            <img src="../../../assets/images/icon-add-to-cart.svg" alt="add-to-cart"/>
        </div>
        <p class="add-to-cart__title">Add to Cart</p>
    `;
}
