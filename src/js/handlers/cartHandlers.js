import {addToCart, cart, decreaseQuantity, increaseQuantity, removeCartFromItem} from "../state/cart.js";
import {renderCart} from "../uis/cartUI.js";
import {resetAllProductCards} from "../uis/productsUI.js";
import {renderConfirmationModal} from "../uis/modalUI.js";
import {modalOverlay} from "../uis/modalUI.js";
export function setUpConfirmBtn(){
    const confirmBtn = document.querySelector(".confirm-btn");
    if(!confirmBtn) return;
    confirmBtn.addEventListener("click", ()=>{
        renderConfirmationModal();
    })
}

export function setUpStartNewOrderBtn(){
    const startNewOrderBtn = document.querySelector(".new-order-btn");
    startNewOrderBtn.addEventListener("click", ()=>{
        cart.length = 0;
        renderCart();
        modalOverlay.classList.add("hidden");
        modalOverlay.innerHTML = "";
        resetAllProductCards()
    })
}




export function setUpRemoveBtns(){
    const removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach(removeBtn => {
        removeBtn.addEventListener("click", () => {
            const productName = removeBtn.dataset.id;
            removeCartFromItem(productName);
        });
    })
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
            <img src="../../../assets/images/icon-add-to-cart.svg" alt="add-to-cart"/>
        </div>
        <p class="add-to-cart__title">Add to Cart</p>`
            return;
        }
        quantityValue.textContent = cartItem.quantity;
    })
}

export function setUpAddToCartBtn(){
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
                <img src="../../../assets/images/icon-decrement-quantity.svg" alt="decrement quantity"/>
            </div>
            <p class="quantity-value">1</p>
            <div role="button" class="increment-btn">
                <img src="../../../assets/images/icon-increment-quantity.svg" alt="increment quantity"/>
            </div>`

            setUpQuantityBtns(button, productName)
        })
    })
}