
// Minimalist Category Data
const minimalistProducts = [
    { id: 1, title: "Pure Form", price: "$300", img: "assets/images/categories/minimalist/1.jpg", hoverImg: "assets/images/categories/minimalist/1hover.jpg" },
    { id: 2, title: "Less Is More", price: "$350", img: "assets/images/categories/minimalist/2.jpg", hoverImg: "assets/images/categories/minimalist/2hover.jpg" },
    { id: 3, title: "Structure No.1", price: "$300", img: "assets/images/categories/minimalist/3.jpg", hoverImg: "assets/images/categories/minimalist/3hover.jpg" },
    { id: 4, title: "White Space", price: "$320", img: "assets/images/categories/minimalist/4.jpg", hoverImg: "assets/images/categories/minimalist/4hover.jpg" },
    { id: 5, title: "Geometric Vibe", price: "$300", img: "assets/images/categories/minimalist/5.jpg", hoverImg: "assets/images/categories/minimalist/5hover.jpg" },
    { id: 6, title: "Abstract Line", price: "$380", img: "assets/images/categories/minimalist/6.jpg", hoverImg: "assets/images/categories/minimalist/6hover.jpg" },
    { id: 7, title: "Modernist", price: "$300", img: "assets/images/categories/minimalist/7.jpg", hoverImg: "assets/images/categories/minimalist/7hover.jpg" },
    { id: 8, title: "Contrast", price: "$300", img: "assets/images/categories/minimalist/8.jpg", hoverImg: "assets/images/categories/minimalist/8hover.jpg" },
    { id: 9, title: "Balance", price: "$310", img: "assets/images/categories/minimalist/9.jpg", hoverImg: "assets/images/categories/minimalist/9hover.jpg" },
    { id: 10, title: "Rhythm", price: "$340", img: "assets/images/categories/minimalist/10.jpg", hoverImg: "assets/images/categories/minimalist/10hover.jpg" },
    { id: 11, title: "Unity", price: "$360", img: "assets/images/categories/minimalist/11.jpg", hoverImg: "assets/images/categories/minimalist/11hover.jpg" },
    { id: 12, title: "Focus", price: "$300", img: "assets/images/categories/minimalist/12.jpg", hoverImg: "assets/images/categories/minimalist/12hover.jpg" },
    { id: 13, title: "Silent", price: "$330", img: "assets/images/categories/minimalist/13.jpg", hoverImg: "assets/images/categories/minimalist/13hover.jpg" },
    { id: 14, title: "Echo", price: "$310", img: "assets/images/categories/minimalist/14.jpg", hoverImg: "assets/images/categories/minimalist/14hover.jpg" },
    { id: 15, title: "Void", price: "$350", img: "assets/images/categories/minimalist/15.jpg", hoverImg: "assets/images/categories/minimalist/15hover.jpg" },
    { id: 16, title: "Plane", price: "$300", img: "assets/images/categories/minimalist/16.jpg", hoverImg: "assets/images/categories/minimalist/16hover.jpg" },
    { id: 17, title: "Axis", price: "$390", img: "assets/images/categories/minimalist/17.jpg", hoverImg: "assets/images/categories/minimalist/17hover.jpg" },
    { id: 18, title: "Orbit", price: "$320", img: "assets/images/categories/minimalist/18.jpg", hoverImg: "assets/images/categories/minimalist/18hover.jpg" },
    { id: 19, title: "Flow", price: "$340", img: "assets/images/categories/minimalist/19.jpg", hoverImg: "assets/images/categories/minimalist/19hover.jpg" },
    { id: 20, title: "Static", price: "$310", img: "assets/images/categories/minimalist/20.jpg", hoverImg: "assets/images/categories/minimalist/20hover.jpg" },
    { id: 21, title: "Pause", price: "$300", img: "assets/images/categories/minimalist/21.jpg", hoverImg: "assets/images/categories/minimalist/21hover.jpg" },
    { id: 22, title: "Drift", price: "$360", img: "assets/images/categories/minimalist/22.jpg", hoverImg: "assets/images/categories/minimalist/22hover.jpg" }
];

function renderMinimalistItem(product) {
    return `
        <div class="catalog-item" data-id="${product.id}">
            <div class="catalog-thumb-container">
                <img src="${product.img}" alt="${product.title}" class="catalog-thumb img-main">
                <img src="${product.hoverImg}" alt="${product.title} Hover" class="catalog-thumb img-hover">
            </div>
            <div class="catalog-info">
                <h3 class="catalog-title">${product.title}</h3>
                <p class="catalog-price">${product.price}</p>
            </div>
            <button class="shop-look-btn" style="display:none;" aria-label="Shop Item"></button>
        </div>
    `;
}

// State
let currentCols = 3;
let itemsToShow = 0; // Will be calculated

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('minimalist-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const viewBtns = document.querySelectorAll('.view-btn');

    // Initial Calculation: 6 rows
    // Items = Rows * Cols
    const getInitialLimit = () => 6 * currentCols;

    function renderGrid() {
        if (!grid) return;
        
        // Ensure we don't exceed total
        const limit = Math.min(itemsToShow, minimalistProducts.length);
        const visibleProducts = minimalistProducts.slice(0, limit);
        
        grid.innerHTML = visibleProducts.map(renderMinimalistItem).join('');

        // Handle Load More visibility
        if (itemsToShow >= minimalistProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    function setColumns(cols) {
        currentCols = cols;
        // Reset grid classes
        grid.classList.remove('cols-3', 'cols-4', 'cols-5');
        grid.classList.add(`cols-${cols}`);
        
        // Update active button
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.cols) === cols);
        });

        // Reset items count to 6 rows based on new column count
        itemsToShow = getInitialLimit();
        renderGrid();
    }

    // Event Listeners
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Load next 6 rows
            itemsToShow += (6 * currentCols);
            renderGrid();
        });
    }

    if (viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cols = parseInt(btn.dataset.cols);
                setColumns(cols);
            });
        });
    }

    if (grid) {
        // Modal Event Listener
        grid.addEventListener('click', (e) => {
            const item = e.target.closest('.catalog-item');
            if (item) {
                const id = parseInt(item.dataset.id);
                const product = minimalistProducts.find(p => p.id === id);
                
                if (product && typeof openModal === 'function') {
                    openModal(product);
                }
            }
        });
    }

    // Initialization
    itemsToShow = getInitialLimit(); // First batch
    renderGrid();
});
