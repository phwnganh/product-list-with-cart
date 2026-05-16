import {setUpConfirmBtn, setUpRemoveBtns} from "../handlers/cartHandlers.js";
import {cart} from "../state/cart.js";

const cartSection = document.querySelector(".cart-section");

export function renderCart(){
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalOrderPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    if(cart.length === 0){
        cartSection.innerHTML = `
        <h1 class="your-cart">Your Cart (0)</h1>
  <div class="cart-empty">
    <div class="cart-empty__image">
      <img src="../../../assets/images/illustration-empty-cart.svg" alt=""/>
    </div>
    <p class="cart-empty__description">Your added items will appear here</p>
  </div>`
        return;
    }

    const cartItemHTML = cart.map(item => {
        return `
        <article class="cart-item">
        <div class="cart-item__body">
        <div class="cart-item__info">
            <h1 class="cart-item__name">${item.name}</h1>
            <div class="cart-item__value">
                <p class="cart-item__quantity">${item.quantity}x</p>
                <p class="cart-item__price">@${item.price.toFixed(2)}</p>
                <p class="cart-item__total">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>

    <button type="button" class="remove-btn" data-id="${item.name}">
        <img src="../../assets/images/icon-remove-item.svg" alt="remove item"/>
    </button>
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
    setUpRemoveBtns()
    setUpConfirmBtn()
}
