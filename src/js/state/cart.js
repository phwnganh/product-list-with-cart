import {renderCart} from "../uis/cartUI.js";
import {resetProductCard} from "../uis/productsUI.js";
import {allProducts} from "../main.js";

export const cart = []

export function addToCart(productName){
    const existingItem = cart.find(item => item.name === productName);
    if(existingItem){
        existingItem.quantity+=1;
    }else{
        const product = allProducts.find(product => product.name === productName);
        cart.push({
            image: product.image.thumbnail,
            name: product.name,
            price: product.price,
            quantity: 1
        })
    }
    renderCart()
}

export function increaseQuantity(productName){
    const cartItem = cart.find(item => item.name === productName);
    if(!cartItem) return;

    cartItem.quantity += 1;
    renderCart()
}

export function decreaseQuantity(productName){
    const cartItem = cart.find(item => item.name === productName);
    if(!cartItem) return;
    cartItem.quantity -= 1;

    if(cartItem.quantity <= 0){
        const cartIndex = cart.findIndex(item => item.name === productName);
        cart.splice(cartIndex, 1);
    }
    renderCart()
}

export function removeCartFromItem(productName){
    const cartIndex = cart.findIndex(item => item.name === productName);
    if(cartIndex === -1) return;
    cart.splice(cartIndex, 1);
    renderCart();
    resetProductCard(productName);
}
