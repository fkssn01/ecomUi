async function loadLuxeProducts() {
    const grid = document.querySelector(".grid");
    // Google Sheets CSV URL
    // Add timestamp to prevent caching of the CSV file
    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRHxQBMGt3dqyXBDcD1K4ofyEVbjlmUgSALWBoRk_o4aSneXfS4cKGLZ1FfmL0v0Fk9XLWP3If51zfB/pub?output=csv&t=${Date.now()}`;
    const loader = document.querySelector(".loader");

    // Try to load cached data first
    let cached = localStorage.getItem('luxecloset');
    console.log('Cached data available:', !!cached);
    if (cached) {
        try {
            const sheetProducts = JSON.parse(cached);
            console.log('Parsed cached products:', sheetProducts);
            console.log('Cached product sample:', sheetProducts[0]);
            if (Array.isArray(sheetProducts) && sheetProducts.length > 0) {
                renderProducts(sheetProducts);
                // Hide loader quickly for cached data
                anime({
                    targets: '.loader',
                    opacity: 0,
                    duration: 300,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        loader.style.display = 'none';
                    }
                });
                console.log('Loaded from cache:', sheetProducts.length, 'products');
            }
        } catch (e) {
            console.error('Cache error:', e);
            localStorage.removeItem('luxecloset');
        }
    }

    // Always fetch fresh data in the background
    Papa.parse(url, {
        download: true,
        header: true,
        complete: function(results) {
            console.log('Raw CSV results:', results);
            console.log('First row keys:', results.data[0] ? Object.keys(results.data[0]) : 'No data');
            console.log('First row values:', results.data[0]);
            
            if (!results.data || results.data.length === 0) {
                console.error('No data from Google Sheets');
                if (!cached) {
                    grid.innerHTML = '<div class="error-message">No products available.</div>';
                }
                return;
            }

            // Normalize column names (case-insensitive and handle trailing spaces)
            const sheetProducts = results.data
                .map((row, idx) => {
                    console.log(`Row ${idx} raw:`, row);
                    console.log(`Row ${idx} keys:`, Object.keys(row));
                    
                    // Trim all key names to handle trailing/leading spaces
                    const cleanRow = {};
                    for (const [key, value] of Object.entries(row)) {
                        const trimmedKey = key.trim().toLowerCase();
                        cleanRow[trimmedKey] = value;
                        console.log(`  "${key}" -> "${trimmedKey}" = "${value}"`);
                    }
                    
                    console.log(`Row ${idx} cleaned:`, cleanRow);

                    // Fuzzy match keys to handle variations like "Price (N)", "Product Name", etc.
                    const priceKey = Object.keys(cleanRow).find(k => k.includes('price') || k.includes('amount') || k.includes('cost')) || 'price';
                    const nameKey = Object.keys(cleanRow).find(k => k.includes('name') || k.includes('title') || k.includes('product')) || 'name';
                    const imageKey = Object.keys(cleanRow).find(k => k.includes('image') || k.includes('img') || k.includes('photo')) || 'image';
                    
                    return {
                        image: cleanRow[imageKey] || '',
                        price: cleanRow[priceKey] || '',
                        name: cleanRow[nameKey] || ''
                    };
                })
                .filter(p => p.name && p.name.trim() !== "");
            
            console.log('Normalized products:', sheetProducts);
            console.log('First product:', sheetProducts[0]);

            // Update cache
            if (sheetProducts.length > 0) {
                localStorage.setItem('luxecloset', JSON.stringify(sheetProducts));
                renderProducts(sheetProducts);
            }

            // Hide loader
            anime({
                targets: '.loader',
                opacity: 0,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    loader.style.display = 'none';
                }
            });
        },
        error: function(err) {
            console.error("PapaParse Error:", err);
            if (!cached) {
                grid.innerHTML = '<div class="error-message">Failed to load products. Please refresh.</div>';
                anime({
                    targets: '.loader',
                    opacity: 0,
                    duration: 300
                });
            }
        }
    });
}

function renderProducts(sheetProducts) {
    const grid = document.querySelector(".grid");
    grid.innerHTML = "";
    console.log('Rendering products:', sheetProducts);
    
    if (!sheetProducts || !Array.isArray(sheetProducts) || sheetProducts.length === 0) {
        grid.innerHTML = '<div class="error-message">No products found. Please check back later.</div>';
        return;
    }
    
    sheetProducts.forEach((product, idx) => {
        console.log(`Product ${idx}:`, product);
        console.log(`  name: "${product.name}"`);
        console.log(`  price: "${product.price}"`);
        console.log(`  image: "${product.image}"`);
        
        const productHTML = `
        <div class="product" data-aos="fade-up">
            <img src="${product.image || ''}" class="prod-img" alt="${product.name || 'Product'}">
            <div class="fav-icon"><i class="fa-solid fa-heart"></i></div> 
            <div class="cart-num"></div>
            <div class="cart-sec">
                <p class="prod-name">${product.name || 'Unknown'}</p>
                <p class="price">₦${product.price || '0'}</p>
                <div class="cart-btn"><i class="fa fa-shopping-bag"></i>Add to Cart</div>
            </div>
        </div>`;
        
        console.log(`Product ${idx} HTML:`, productHTML);
        grid.innerHTML += productHTML;
    });
    
    console.log('Final grid HTML:', grid.innerHTML);
}

// Preload data as soon as possible
document.addEventListener('DOMContentLoaded', loadLuxeProducts);