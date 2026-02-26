const grid = document.querySelector(".grid");


async function loadLuxeProducts() {
    const url = 'https://api.sheety.co/02490e1c4e2b48b72d412b9ddecc16c2/luxe/luxecloset';

    const loader = document.querySelector(".loader");

    try {
        const response = await fetch(url);
        const data = await response.json();
        
   
        const sheetProducts = data.luxecloset;

        anime({
            targets: '.loader',
            opacity: 0,
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => {
                loader.style.display = 'none';
            }
        });


        grid.innerHTML = "";

        
        sheetProducts.forEach(product => {
            grid.innerHTML += `
            <div class="product" data-aos="fade-up">
                <img src="${product.image}" class="prod-img" alt="${product.name}">
                <div class="fav-icon"><i class="fa-solid fa-heart"></i></div> 
                <div class="cart-num"></div>
                <div class="cart-sec">
                    <p class="prod-name">${product.name}</p>
                    <p class="price">₦${product.price}</p>
                    <div class="cart-btn"><i class="fa fa-shopping-bag"></i>Add to Cart</div>
                </div>
            </div>`;
        });


      
    } catch (error) {
        console.error("Could not load products:", error);
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Failed to Load';
        loader.innerHTML = '';
        loader.appendChild(errorMessage);
    }
}


loadLuxeProducts();