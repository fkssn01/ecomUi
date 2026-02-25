function toggleCart() {
const overlay = document.getElementById("cart-overlay");
const sidebar = document.getElementById("cart-sidebar");


sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

overlay.classList.toggle('active');
sidebar.classList.toggle('active');
}

function clearAll() {
    cartList = [];
    totalHeaderCount = 0;
    globalCartCount = 0;

    const headerBadge = document.querySelector(".num-of-cart");
    headerBadge.innerText = "(0 items)";

    const globalCartBadge = document.querySelector(".cart-count");
    globalCartBadge.style.display = "none";

    updateProductCounts();
    refreshCart();
   
    cartTotal();
}

let cartList = [];
let totalHeaderCount = 0;

const cartContainer = document.querySelector(".cart-content");
const emptyCartBG = document.querySelector(".cartEmpty");
const sideFooter = document.querySelector(".check-total-sec");
const HomePriceSec = document.querySelector(".cart-total-footer");
const ClearAllItems = document.getElementById("clearAll");

function cartTotal() {
    let total = 0;
    for (let i = 0; i < cartList.length; i++) {
        let priceString = cartList[i].price;
        let cleanPrice = priceString.slice(1).replace(/,/g, '');
        let priceNum = Number(cleanPrice);

        total = total + (priceNum * cartList[i].quantity);
    }
    const totalDisplay = document.querySelector(".total-amount-box");
    totalDisplay.innerText = "₦" + total.toLocaleString();
    const homeDisplay = document.querySelector(".cart-footer-price");
    homeDisplay.innerText = "₦" + total.toLocaleString();
}

function refreshCart() {
    cartContainer.innerHTML = "";
    if (cartList.length === 0) {
        cartContainer.style.display = "none";
        HomePriceSec.style.display = "none";
        emptyCartBG.style.display = "flex";
        sideFooter.style.display = "none";
       
    } else {
        cartContainer.style.display = "block";
        HomePriceSec.style.display = "flex";
        emptyCartBG.style.display = "none";
        sideFooter.style.display = "flex";
    }

    cartList.forEach((item, index) => {
        const divItem = document.createElement("div");
        divItem.classList.add("appended-item");

        divItem.innerHTML = `
        <img src="${item.image}" width="70">
        <div class="item-info">
        <h4>${item.name}</h4>
            <p>${item.price}</p>
            <b>Qty: ${item.quantity}</b>
        </div>
        <button class="remove-btn" onclick="deleteItem(${index})"><i class="fa fa-trash"></i></button>
        `;

        cartContainer.appendChild(divItem);
    });
}

function deleteItem(index) {
    const itemElement = cartContainer.children[index];
    const itemToDelete = cartList[index];

    if (itemElement && itemToDelete) {
        itemElement.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        itemElement.style.opacity = "0";
        itemElement.style.transform = "translateX(20px)";

        setTimeout(() => {
            const currentIndex = cartList.indexOf(itemToDelete);
            if (currentIndex > -1) {
                finalizeDelete(currentIndex);
            }
        }, 400);
    } else {
        finalizeDelete(index);
    }
}

function finalizeDelete(index) {
    // Get the quantity of the item being deleted
    const qtyToRemove = cartList[index] ? cartList[index].quantity : 1;
    cartList.splice(index, 1);
    totalHeaderCount -= qtyToRemove;
    if (totalHeaderCount < 0) totalHeaderCount = 0;
    const headerBadge = document.querySelector(".num-of-cart");
    headerBadge.innerText = `(${totalHeaderCount} items)`;
    // Also update the global cart count and badge
    globalCartCount -= qtyToRemove;
    if (globalCartCount < 0) globalCartCount = 0;
    const globalCartBadge = document.querySelector(".cart-count");
    globalCartBadge.textContent = globalCartCount > 99 ? "99+" : globalCartCount;
    if (globalCartCount === 0) {
        globalCartBadge.style.display = "none";
    }
    // Update per-product cart-num
    updateProductCounts();
    refreshCart();
    cartTotal();
}

function updateProductCounts() {
    const allProducts = document.querySelectorAll(".product");
    allProducts.forEach(product => {
        const name = product.querySelector("p").innerText;
        const cartNum = product.querySelector(".cart-num");
        const cartBtn = product.querySelector(".cart-btn");
        if (cartNum && cartBtn) {
            const item = cartList.find(item => item.name === name);
            if (item) {
                cartNum.textContent = item.quantity;
                cartNum.classList.add("cart-num-show");
                cartBtn.innerHTML = `<i class="fa fa-shopping-bag"></i>Add More (${item.quantity})`;
            } else {
                cartNum.textContent = "";
                cartNum.classList.remove("cart-num-show");
                cartBtn.innerHTML = `<i class="fa fa-shopping-bag"></i>Add to Cart`;
            }
        }
    });
}




function checkoutToWhatsApp() {
    const phoneNumber = "2447062302404"; 
    let message = "Hello Luxe Closet! I'd like to order: %0A%0A";
    let grandTotal = 0;

    if (cartList.length === 0) {
        alert("Select some items first!");
        return;
    }

    cartList.forEach((item, index) => {
        let priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        const itemTotal = priceNum * item.quantity;
        grandTotal += itemTotal;
        
     
        message += `${index + 1}. *${item.name}* %0A`;
        message += `   Qty: ${item.quantity} %0A`;
        message += `   Subtotal: ₦${itemTotal.toLocaleString()} %0A%0A`;
    });

    message += `*Grand Total: ₦${grandTotal.toLocaleString()}*`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}
 
// Use event delegation for dynamically created cart buttons
document.querySelector(".grid").addEventListener('click', (e) => {
    if (e.target.closest('.cart-btn')) {
        const cartBtn = e.target.closest('.cart-btn');
        const productBox = cartBtn.closest(".product");

        const name = productBox.querySelector(".prod-name").innerText;
        const price = productBox.querySelector(".price").innerText;
        const image = productBox.querySelector("img").src;
        const headerBadge = document.querySelector(".num-of-cart");

        // searching the cartlist
        let existingItem = null;
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].name === name) {
              existingItem = cartList[i];
            }
        }

        if (existingItem) {
            existingItem.quantity = existingItem.quantity + 1;
        }
        else {
            const newItem = {
                name: name,
                price: price,
                image: image,
                quantity: 1,
            };
             cartList.push(newItem);
        }

        totalHeaderCount = totalHeaderCount + 1;
        headerBadge.innerText = `(${totalHeaderCount} items)`;

        // Update global cart count and badge
        globalCartCount++;
        const globalCartBadge = document.querySelector(".cart-count");
        globalCartBadge.textContent = globalCartCount > 99 ? "99+" : globalCartCount;
        globalCartBadge.style.display = "block";

        if (typeof animateCartCount === 'function') {
            animateCartCount();
        }

        refreshCart();
        updateProductCounts();
        cartTotal();

        const cartNum = productBox.querySelector(".cart-num");
        if (cartNum && typeof animateCartNum === 'function') {
            animateCartNum(cartNum);
        }

        if (typeof animateCartTotalFooter === 'function') {
            animateCartTotalFooter();
        }
    }
});

// Initialize cart state on page load */
refreshCart();
