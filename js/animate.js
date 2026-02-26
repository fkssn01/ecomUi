function animateCartCount() {
    const target = '.cart-count';
    anime.remove(target); 
    anime({
        targets: target,
        scale: [0, 1], 
        duration: 1000,
        easing: 'easeOutElastic(1, .6)' 
    });
}




function animateWishlistCount() {
const target = '.wishlist-count';
anime.remove(target);
anime({
    targets: target,
    scale: [0, 1],
    duration: 1000,
    easing: 'easeOutElastic(1, .6)'
})
}

function animateCartTotalFooter() {
const target = '.cart-total-footer';
anime.remove(target);
anime({
    targets: target,
    scale: [0, 1],
    duration: 1000,
    easing: 'easeOutElastic(1, .6)'
})
}

function animateCartNum(target) {
anime.remove(target);
anime({
    targets: target,
    scale: [0, 1],
    duration: 1000,
    easing: 'easeOutElastic(1, .6)'
})
}


