import {setUpStartNewOrderBtn} from "../handlers/cartHandlers.js";
import {cart} from '../state/cart.js'
export const modalOverlay = document.querySelector(".modal-overlay");

export function renderConfirmationModal(){
    const totalOrderPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const modalItemsHTML = cart.map(item => {
        return `
        <article class="modal-item">
        <div class="modal-item__info">
            <div class="modal-item__image">
                <img src="${item.image}" alt="${item.name}"/>
            </div>
            <div class="modal-item__content">
                <h1 class="modal-item__title">${item.name}</h1>
            <div class="modal-item__value">
                <p class="modal-item__quantity">${item.quantity}x</p>
                <p class="modal-item__price">@${item.price}</p>
            </div>
            <p class="modal-item__total">$${(item.price * item.quantity).toFixed(2)}</p>
</div>
</div>
<hr class="modal-item__end"/>
</article>
        `;
    }).join("")

    modalOverlay.innerHTML = `
    <div class="modal">
    <div class="modal-icon">
        <img src="../../assets/images/icon-order-confirmed.svg" alt="order confirmed icon"/>
    </div>
    <div class="modal-content">
        <h1 class="modal-title">Order Confirmed</h1>
        <p class="modal-description">We hope you enjoy your food!</p>
    </div>
    <div class="modal-list">
    ${modalItemsHTML}
    <div class="modal-total">
    <p class="modal-total__title">
        Order Total
    </p>
    <span class="modal-total__price">$${totalOrderPrice.toFixed(2)}</span>
    </div>
</div>
    <button type="button" class="new-order-btn">Start New Order</button>
</div>
    `
    modalOverlay.classList.remove("hidden");
    setUpStartNewOrderBtn()
}
