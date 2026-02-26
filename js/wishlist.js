
 const wishSide = document.getElementById("wishlist-overlay");
    const wishSidebar = document.getElementById("wishlistSide");
const heartIcon = document.querySelectorAll(".fa-heart");
const wishListCounter = document.querySelector(".wishlist-count");

let wishlistCount = 0;
const wishContainer = document.querySelector(".wishContent");
let wishList = [];
const wishHead = document.querySelector(".wishHeader");
const clearWishi = document.querySelector(".clearWishList");
const wishEmptys = document.querySelector(".wishEmpty");

function clearWish() {
    wishList = [];
    wishlistCount = 0;
    wishListCounter.textContent = wishlistCount;
    wishListCounter.classList.remove("active");

    document.querySelectorAll(".fav-icon.active").forEach(icon => {
        icon.classList.remove("active");
    });
    

    drawWishList();
}

function drawWishList() {
    wishContainer.innerHTML = '';
    if (wishList.length === 0) {
    wishHead.style.display = "flex";
    clearWishi.style.display = "none";
    wishEmptys.style.display = "flex";
    wishContainer.style.display = "none";
}
    else {
     wishHead.style.display = "flex";
    clearWishi.style.display = "flex";
    wishEmptys.style.display = "none";
    wishContainer.style.display = "block";
}

    wishList.forEach((item, index) => {
        const showAppItem = document.createElement("div");
        showAppItem.classList.add("appendedWishItem");

        showAppItem.innerHTML = `
        <img src="${item.image}">
        <div class="wish-info">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
         <button class="AddWishItem" onclick="AddWishItemtoCart(${index})"><i class="fa fa-shopping-bag"></i>Add to Cart</button>
        </div>
 <button class="removeWishItem" onclick="deleteWishItem(${index})"><i class="fa fa-trash"></i></button>
        `;
        wishContainer.appendChild(showAppItem);
    });
}

window.deleteWishItem = function(index) {
    const item = wishList[index];
    wishList.splice(index, 1);
    wishlistCount--;
    wishListCounter.textContent = wishlistCount;
    if (wishlistCount <= 0) wishListCounter.classList.remove("active");

    
    const products = document.querySelectorAll(".product");
    products.forEach(prod => {
        if (prod.querySelector(".prod-name").innerText === item.name) {
            prod.querySelector(".fav-icon").classList.remove("active");
        }
    });
    drawWishList();
}

window.AddWishItemtoCart = function(index) {
    const item = wishList[index];
    const products = document.querySelectorAll(".product");

    products.forEach(prod => {
        if (prod.querySelector(".prod-name").innerText === item.name) {
            const cartBtn = prod.querySelector(".cart-btn");
            if (cartBtn) cartBtn.click();
        }
    });
}

function openWish() {
    wishSidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    }) 
    wishSide.classList.toggle("active");
    wishSidebar.classList.toggle("active");
}


document.querySelector(".grid").addEventListener('click', (e) => {
  if (e.target.closest('.fav-icon')) {
    const faBtn = e.target.closest('.fav-icon');
    let wishColor = faBtn.classList.toggle("active");
    const wishBox = faBtn.closest(".product");
    const name = wishBox.querySelector(".prod-name").innerText;
    const price = wishBox.querySelector(".price").innerText;
    const image = wishBox.querySelector("img").src;

    if (wishColor) {
      wishlistCount++;
      wishList.push({ name, price, image });
    } else {
      wishlistCount--;
      wishList = wishList.filter(item => item.name !== name);
    }

    wishListCounter.textContent = wishlistCount;

    if (wishlistCount > 0) {
      wishListCounter.classList.add("active");
      if (typeof animateWishlistCount === 'function') {
        animateWishlistCount();
      }
    } else {
      wishListCounter.classList.remove("active");
    }
    drawWishList();
  }
});

drawWishList();
