const products = [
    {
        image: "images/bagscol.jpg",
        name: "50ml Yara and Asad Collection",
        price: "₦11,000",
    },
    {
          image: "images/bgs.jpg",
        name: "9pm Rebel by Afnan",
        price: "₦48,000",
    },
     {
          image: "images/color.jpg",
        name: "Badee Al Oud Collection",
        price: "₦36,000",
    },
     {
          image: "images/cosme.jpg",
        name: "Ladies Crystal Watch Set",
        price: "₦7,000",
    },
     {
          image: "images/newsec.jpg",
        name: "Ladies bag",
        price: "₦29,000",
    },
     {
          image: "images/newbag.jpg",
        name: "Valenzo Plastic watch",
        price: "₦25,000",
    }
];

const grid = document.querySelector(".grid");

products.forEach(product => {
    grid.innerHTML += `
     <div class="product" data-aos="fade-up">
     <img src="${product.image}" class="prod-img" alt="">
   <div class="fav-icon"><i class="fa-solid fa-heart"></i></div> 
       <div class="cart-num"></div>
   <div class="cart-sec">
<p class="prod-name">${product.name}</p>
<p class="price">${product.price}</p>
<div class="cart-btn"><i class="fa fa-shopping-bag"></i>Add to Cart</div>
   </div>
    </div>
    
    `
} );


