import { setUpAddToCartBtn } from '../js/handlers/cartHandlers.js';
import '../js/handlers/cartHandlers.js'
import '../js/state/cart.js'
import '../js/uis/cartUI.js'
import '../js/uis/modalUI.js'
import '../js/uis/productsUI.js'

const productsSection = document.querySelector(".products-card-list");
const cartSection = document.querySelector(".cart-section");
const modalOverlay = document.querySelector(".modal-overlay");
const cart = []
export let allProducts = [];
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

async function init(){
    const products = await fetchProducts();
    allProducts = products;
    renderAllProducts(products);
    setUpAddToCartBtn();
}

void init()