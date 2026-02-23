
  const buttons = document.querySelectorAll(".cart-btn");
 const openMenu = document.getElementById("hamburgerMenu");
const MenuNav = document.getElementById("menuNav");
const closeSide = document.getElementById("closeBar");

let globalCartCount = 0;
const globalCartBadge = document.querySelector(".cart-count");

 function sideMenu() {
   MenuNav.classList.add("menuOpen");
   MenuNav.classList.remove("closeMenu");
   openMenu.style.display = "none";
   closeSide.style.display = "flex";
 }

 function closeNav() {
   MenuNav.classList.remove("menuOpen");
   MenuNav.classList.add("closeMenu");
   openMenu.style.display = "flex";
   closeSide.style.display = "none";
 }



buttons.forEach(btn => {

  let count = 0;

  btn.addEventListener('click', (e) => {
    const clickedBtn = e.target;
const prod = clickedBtn.closest(".product");
const cartNum = prod.querySelector(".cart-num");




if (cartNum) {
    // Count update handled by sidebar.js
}

    const buttonEl = e.currentTarget || clickedBtn;
    buttonEl.textContent = "✓ Added to Cart";
    buttonEl.classList.add('added');

    setTimeout(() => {
      const prodAfter = buttonEl.closest('.product');
      const cartNumAfter = prodAfter ? prodAfter.querySelector('.cart-num') : null;
      const qty = cartNumAfter && cartNumAfter.textContent ? parseInt(cartNumAfter.textContent, 10) : 0;
      if (qty > 0) {
        buttonEl.textContent = `Add More (${qty})`;
      } else {
        buttonEl.textContent = 'Add to Cart';
      }
      buttonEl.classList.remove('added');
    }, 1000); 
  });
});
















if (openMenu) openMenu.addEventListener("click", sideMenu);
if (closeSide) closeSide.addEventListener("click", closeNav);
