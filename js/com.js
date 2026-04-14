var openMenu;
var MenuNav;
var closeSide;

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

// Button feedback animation for cart buttons
document.addEventListener('DOMContentLoaded', () => {
  const grids = document.querySelectorAll(".grid, .shopPageGrid");
  grids.forEach(grid => {
    grid.addEventListener('click', (e) => {
  if (e.target.closest('.cart-btn')) {
    const clickedBtn = e.target.closest('.cart-btn');
    const buttonEl = clickedBtn;
    buttonEl.innerHTML = "✓ Added to Cart";
    buttonEl.classList.add('added');

    setTimeout(() => {
      const prodAfter = buttonEl.closest('.product');
      const cartNumAfter = prodAfter ? prodAfter.querySelector('.cart-num') : null;
      const qty = cartNumAfter && cartNumAfter.textContent ? parseInt(cartNumAfter.textContent, 10) : 0;
      if (qty > 0) {
        buttonEl.innerHTML = `<i class="fa fa-shopping-bag"></i>Add More (${qty})`;
      } else {
        buttonEl.innerHTML = '<i class="fa fa-shopping-bag"></i>Add to Cart';
      }
      buttonEl.classList.remove('added');
    }, 1000); 
  }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    openMenu = document.getElementById("hamburgerMenu");
    MenuNav = document.getElementById("menuNav");
    closeSide = document.getElementById("closeBar");

    if (openMenu) openMenu.addEventListener("click", sideMenu);
    if (closeSide) closeSide.addEventListener("click", closeNav);
});


const homey = document.querySelector(".homey");
const shopPage = document.querySelector(".shopPage");

function openShop() {
  homey.style.display = "none";
  shopPage.style.display = "block";

  // Tell the animation library to recalculate the newly visible elements
  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
    window.scrollTo(0, 0); // Optional: Scroll to top for a fresh view
  }, 50);
}

function homePage() {
  homey.style.display = "block";
  shopPage.style.display = "none";

  // Tell the animation library to recalculate the newly visible elements
  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
    window.scrollTo(0, 0);
  }, 50);
}
