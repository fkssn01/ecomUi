var cartList = [];
var totalHeaderCount = 0;
var globalCartCount = 0;

function toggleCart() {
    const overlay = document.getElementById("cart-overlay");
    const sidebar = document.getElementById("cart-sidebar");

    if (overlay && sidebar) {
        overlay.classList.toggle('active');
        sidebar.classList.toggle('active');
    } else {
        console.error("Cart elements not found. Check IDs: cart-overlay, cart-sidebar");
    }
}
window.toggleCart = toggleCart;

function clearAll() {
    cartList = [];
    totalHeaderCount = 0;
    globalCartCount = 0;

    const headerBadge = document.querySelector(".num-of-cart");
    if (headerBadge) {
        headerBadge.innerText = "(0 items)";
    }

    const globalCartBadge = document.querySelector(".cart-count");
    if (globalCartBadge) globalCartBadge.style.display = "none";

    updateProductCounts();
    refreshCart();
    cartTotal();
    saveCart();
}
window.clearAll = clearAll;

// Load cartList from localStorage if available
try {
    const storedCart = localStorage.getItem('cartList');
    if (storedCart) {
        cartList = JSON.parse(storedCart);
        // Recalculate counters from stored cart
        totalHeaderCount = cartList.reduce((sum, item) => sum + item.quantity, 0);
        globalCartCount = totalHeaderCount;
    }
} catch (e) { 
    cartList = []; 
    totalHeaderCount = 0;
    globalCartCount = 0;
}

// Initialize UI with stored cart data
function initializeCartUI() {
    const headerBadge = document.querySelector(".num-of-cart");
    if (headerBadge) {
        headerBadge.innerText = `(${totalHeaderCount} items)`;
    }
    
    const globalCartBadge = document.querySelector(".cart-count");
    if (globalCartBadge) {
        if (globalCartCount > 0) {
            globalCartBadge.textContent = globalCartCount > 99 ? "99+" : globalCartCount;
            globalCartBadge.style.display = "block";
        } else {
            globalCartBadge.style.display = "none";
        }
    }
    
    refreshCart();
    cartTotal();
    updateProductCounts();
}

var cartContainer;
var emptyCartBG;
var sideFooter;
var HomePriceSec;
var ClearAllItems;

function cartTotal() {
    let total = 0;
    for (let i = 0; i < cartList.length; i++) {
        let priceString = cartList[i].price;
        // Handle prices with or without ₦ symbol and commas
        let cleanPrice = priceString.replace(/[₦,\s]/g, '').trim();
        let priceNum = Number(cleanPrice);

        if (!isNaN(priceNum)) {
            total = total + (priceNum * cartList[i].quantity);
        }
    }
    const totalDisplay = document.querySelector(".total-amount-box");
    if (totalDisplay) totalDisplay.innerText = "₦" + total.toLocaleString();
    const homeDisplay = document.querySelector(".cart-footer-price");
    if (homeDisplay) homeDisplay.innerText = "₦" + total.toLocaleString();
}

function saveCart() {
    localStorage.setItem('cartList', JSON.stringify(cartList));
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
window.deleteItem = deleteItem;

function finalizeDelete(index) {
    const qtyToRemove = cartList[index] ? cartList[index].quantity : 1;
    cartList.splice(index, 1);
    totalHeaderCount -= qtyToRemove;
    if (totalHeaderCount < 0) totalHeaderCount = 0;
    const headerBadge = document.querySelector(".num-of-cart");
    if (headerBadge) headerBadge.innerText = `(${totalHeaderCount} items)`;

    globalCartCount -= qtyToRemove;
    if (globalCartCount < 0) globalCartCount = 0;
    const globalCartBadge = document.querySelector(".cart-count");
    if (globalCartBadge) {
        globalCartBadge.textContent = globalCartCount > 99 ? "99+" : globalCartCount;
        if (globalCartCount === 0) {
            globalCartBadge.style.display = "none";
        }
    }

    updateProductCounts();
    refreshCart();
    cartTotal();
    saveCart();
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
    console.log("Checkout Clicked! (Version 7) - " + new Date().toLocaleTimeString());
    if (cartList.length === 0) {
        alert("Select some items first!");
        return;
    }



    const phoneNumber = "2347062302404"; 
    let message = "Hello Luxe Closet! I'd like to order: %0A%0A";
    let grandTotal = 0;

    cartList.forEach((item, index) => {
        // Handle prices with or without ₦ symbol
        let priceStr = String(item.price || "0");
        let priceNum = parseFloat(priceStr.replace(/[₦,\s]/g, ''));
        if (isNaN(priceNum)) priceNum = 0;
        const itemTotal = priceNum * item.quantity;
        grandTotal += itemTotal;
        
        message += `${index + 1}. *${item.name}* %0A`;
        message += `   Qty: ${item.quantity} %0A`;
        message += `   Subtotal: ₦${itemTotal.toLocaleString()} %0A%0A`;
    });

    message += `*Grand Total: ₦${grandTotal.toLocaleString()}*`;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzYks4WU8ApHb0zNKwCxRKSc2uA6f40QefGkLGYZKSwthJgYUENm5JYQqcv_zIHzknD/exec';

    const uniqueOrderId = "#LC-" + Math.floor(Math.random() * 10000);

    // Prepare the data for YOUR eyes
    const orderData = {
        orderId: uniqueOrderId,
        items: cartList.map(i => `${i.name} (x${i.quantity})`).join(", "),
        total: `₦${grandTotal.toLocaleString()}`
    };


    // Send to Google Sheets (Hidden from user)
    console.log("Sending Order Data:", orderData);
    console.log("Sending Order Data...");
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Essential for Google Apps Script
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(orderData)
    })
    .then(() => {
        console.log("Signal successfully sent to Google Script URL! 🚀"); //
    })
    .catch(error => {
        console.error("Error sending to Google Sheets:", error); //
    });

    // Provide immediate user feedback
  
   

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}
window.checkoutToWhatsApp = checkoutToWhatsApp;
 

function setupCartEventListeners() {
    const gridElement = document.querySelector(".grid");
    if (gridElement) {
        gridElement.addEventListener('click', (e) => {
        if (e.target.closest('.cart-btn')) {
            const cartBtn = e.target.closest('.cart-btn');
            const productBox = cartBtn.closest(".product");

            if (!productBox) return;

            const nameEl = productBox.querySelector(".prod-name");
            const priceEl = productBox.querySelector(".price");
            const imageEl = productBox.querySelector("img");
            
            if (!nameEl || !priceEl || !imageEl) {
                console.error('Product elements not found');
                return;
            }

            const name = nameEl.innerText.trim();
            const price = priceEl.innerText.trim();
            const image = imageEl.src;
            const headerBadge = document.querySelector(".num-of-cart");

            console.log('Adding to cart:', { name, price, image });

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
            if (headerBadge) headerBadge.innerText = `(${totalHeaderCount} items)`;

            globalCartCount++;
            const globalCartBadge = document.querySelector(".cart-count");
            if (globalCartBadge) {
                globalCartBadge.textContent = globalCartCount > 99 ? "99+" : globalCartCount;
                globalCartBadge.style.display = "block";
            }

            if (typeof animateCartCount === 'function') {
                animateCartCount();
            }

            refreshCart();
            updateProductCounts();
            cartTotal();
            saveCart();

            const cartNum = productBox.querySelector(".cart-num");
            if (cartNum && typeof animateCartNum === 'function') {
                animateCartNum(cartNum);
            }

            if (typeof animateCartTotalFooter === 'function') {
                animateCartTotalFooter();
            }
        }
    });
}
}


// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
    cartContainer = document.querySelector(".cart-content");
    emptyCartBG = document.querySelector(".cartEmpty");
    sideFooter = document.querySelector(".check-total-sec");
    HomePriceSec = document.querySelector(".cart-total-footer");
    ClearAllItems = document.getElementById("clearAll");

    const sidebar = document.getElementById("cart-sidebar");
    if (sidebar) {
        sidebar.addEventListener('click', (e) => e.stopPropagation());
    }

    setupCartEventListeners();
    initializeCartUI();
});
