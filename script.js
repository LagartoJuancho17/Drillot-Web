// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Animation
// Hero Animation
if (document.querySelector('.hero')) {
    const heroTimeline = gsap.timeline();

    heroTimeline.from(".hero-title .line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    })
    .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5")
    .from(".cta-button", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6")
    .from(".hero-image-container", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    }, "-=1.5");
}

// --- Data Objects ---

const products = [
    { title: "Make It Pop", price: "Desde $300", img: "assets/images/recent/poster1.jpg", hoverImg: "assets/images/recent/poster1hover.jpg" },
    { title: "Abstract Blue", price: "Desde $300", img: "assets/images/recent/poster2.jpg", hoverImg: "assets/images/recent/poster2hover.jpg" },
    { title: "Red Burst", price: "Desde $300", img: "assets/images/recent/poster3.jpg", hoverImg: "assets/images/recent/poster3hover.jpg" },
    { title: "Typography No.1", price: "Desde $320", img: "assets/images/recent/poster4.jpg", hoverImg: "assets/images/recent/poster4hover.jpg" },
];

const homeShowcase = [
    { name: "Home Example 1", img: "assets/images/home/home1.jpg" },
    { name: "Home Example 2", img: "assets/images/home/home2.jpg" },
    { name: "Home Example 3", img: "assets/images/home/home3.jpg" },
    { name: "Home Example 4", img: "assets/images/home/home4.jpg" }
];

const bestSellers = [
    { title: "Make It Pop", price: "Desde $300", img: "assets/images/recent/poster1.jpg" },
    { title: "Red Burst", price: "Desde $300", img: "assets/images/recent/poster3.jpg" },
    { title: "Typography No.1", price: "Desde $320", img: "assets/images/recent/poster4.jpg" },
     { title: "Abstract Blue", price: "Desde $300", img: "assets/images/recent/poster2.jpg" },
];

const styles = [
    { name: "Tipografía", img: "assets/images/styles/typography.webp" },
    { name: "Minimalista", img: "assets/images/styles/minimalist.jpg" },
    { name: "Abstracto", img: "assets/images/styles/abstract.jpg" },
    { name: "Lettering", img: "assets/images/styles/lettering.jpg" },
    { name: "Organic", img: "assets/images/styles/organic.jpg" }
];

// --- Dynamic Rendering ---

function renderProduct(product) {
    return `
        <article class="product-card carousel-item">
            <div class="card-image">
                <img src="${product.img}" alt="${product.title}" class="main-img">
                ${product.hoverImg ? `<img src="${product.hoverImg}" alt="${product.title} Hover" class="hover-img">` : ''}
            </div>
            <div class="card-info">
                <h3>${product.title}</h3>
                <p class="price">${product.price}</p>
            </div>
        </article>
    `;
}

function renderShowcase(item) {
    return `
        <div class="showcase-item carousel-item">
            <img src="${item.img}" alt="${item.name}">
            <button class="shop-look-btn">Shop</button>
        </div>
    `;
}

function renderStyle(item) {
    return `
         <a href="#" class="style-card carousel-item">
            <img src="${item.img}" alt="${item.name}">
            <span class="style-name">${item.name}</span>
        </a>
    `;
}

function renderCarouselContent(sectionId, data, renderFunc) {
     const container = document.querySelector(`#${sectionId} .carousel-track`);
     if (container) {
         container.innerHTML = data.map(item => renderFunc(item)).join('');
     }
}

// Initial Rendering
renderCarouselContent('recent', products, renderProduct);
renderCarouselContent('home-showcase', homeShowcase, renderShowcase);
renderCarouselContent('bestsellers', bestSellers, renderProduct);
renderCarouselContent('styles-section', styles, renderStyle);

// --- Carousel Logic ---
function initCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    // Re-query items after dynamic render
    const items = carousel.querySelectorAll('.carousel-item');
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');
    
    if (!track || items.length === 0) return;

    // Clone items
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
     if (items.length < 4) {
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }

    const allItems = track.querySelectorAll('.carousel-item');
    
    // Dynamic Responsive Width Calculation
    // This allows the scroll distance to adapt to any screen size (%), 
    // matching the CSS item width + gap exactly.
    const getWidth = () => {
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        const itemWidth = allItems[0]?.offsetWidth || 0;
        return itemWidth + gap;
    }; 
    
    let currentIndex = 0;
    let isAnimating = false;

    function moveCarousel(direction) {
        if (isAnimating) return;
        isAnimating = true;
        const width = getWidth();

        if (direction === 'next') {
            currentIndex++;
            gsap.to(track, {
                x: -currentIndex * width,
                duration: 0.75,
                ease: "power2.inOut",
                onComplete: () => {
                    if (currentIndex >= items.length) {
                        currentIndex = 0;
                        gsap.set(track, { x: 0 });
                    }
                    isAnimating = false;
                }
            });
        } else {
            if (currentIndex <= 0) {
                currentIndex = items.length;
                gsap.set(track, { x: -currentIndex * width });
            }
            currentIndex--;
            gsap.to(track, {
                x: -currentIndex * width,
                duration: 0.75,
                ease: "power2.inOut",
                onComplete: () => {
                    isAnimating = false;
                }
            });
        }
    }

    if (nextBtn) nextBtn.addEventListener('click', () => moveCarousel('next'));
    if (prevBtn) prevBtn.addEventListener('click', () => moveCarousel('prev'));
}

// Initialize
document.querySelectorAll('.product-carousel').forEach(initCarousel);

// Scroll Animations for Sections
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});


// --- Product Modal Logic ---

const modal = document.querySelector('#product-modal');
const closeModalBtn = document.querySelector('.close-modal-btn');
const modalMainImg = document.querySelector('#modal-main-image');
const modalTitle = document.querySelector('#modal-product-title');
const modalPrice = document.querySelector('#modal-product-price');
const modalThumbs = document.querySelectorAll('.modal-thumb');
const accordions = document.querySelectorAll('.accordion-header');
const sizeBtns = document.querySelectorAll('.size-selector .option-btn');

// Open Modal
function openModal(product) {
    if (!modal) return;
    
    modalTitle.textContent = product.title;
    modalPrice.textContent = product.price;

    const mainContainer = document.querySelector('.main-image-container');
    const thumbContainer = document.querySelector('.thumbnails-container');
    
    // Prepare images list
    let images = [];
    if (product.images && product.images.length > 0) {
        images = product.images;
    } else if (product.img) {
        images = [product.img];
        if (product.hoverImg) images.push(product.hoverImg);
        if (images.length < 3) {
             images.push("assets/images/item/original.jpg");
             images.push("assets/images/item/m1.jpg");
        }
    } else {
        images = [
            "assets/images/item/original.jpg",
            "assets/images/item/m1.jpg", 
            "assets/images/item/m2.jpg", 
            "assets/images/item/m3.png"
        ];
    }
    
    mainContainer.innerHTML = '';
    thumbContainer.innerHTML = '';
    
    let currentIndex = 0;

    // Helper to update view
    const updateView = () => {
        // Update Main Images
        const allMain = document.querySelectorAll('.modal-main-img');
        allMain.forEach((img, idx) => {
            if (idx === currentIndex) img.classList.add('active');
            else img.classList.remove('active');
        });

        // Update Thumbs (if visible on desktop)
        const allThumbs = document.querySelectorAll('.modal-thumb');
        allThumbs.forEach((t, idx) => {
             if (idx === currentIndex) t.classList.add('active');
             else t.classList.remove('active');
        });
    };

    // Create Images
    images.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.classList.add('modal-main-img');
        if (index === 0) img.classList.add('active');
        mainContainer.appendChild(img);

        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.classList.add('modal-thumb');
        if (index === 0) thumb.classList.add('active');
        
        thumb.addEventListener('click', () => {
             currentIndex = index;
             updateView();
        });
        thumbContainer.appendChild(thumb);
    });

    // Add Navigation Buttons (Visible on Mobile via CSS)
    if (images.length > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'modal-nav-btn prev';
        prevBtn.innerHTML = '&#10094;'; // Left Arrow
        prevBtn.onclick = (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateView();
        };

        const nextBtn = document.createElement('button');
        nextBtn.className = 'modal-nav-btn next';
        nextBtn.innerHTML = '&#10095;'; // Right Arrow
        nextBtn.onclick = (e) => {
             e.stopPropagation();
             currentIndex = (currentIndex + 1) % images.length;
             updateView();
        };

        mainContainer.appendChild(prevBtn);
        mainContainer.appendChild(nextBtn);
    }

    // Show modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
}

// Close Modal
function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Event Listeners
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Attach Click to "Recent" Products
const recentSection = document.querySelector('#recent');
if (recentSection) {
    recentSection.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card) {
            // Find product data - simplistic way: match title
            const title = card.querySelector('h3').textContent;
            const product = products.find(p => p.title === title) || { title: title, price: card.querySelector('.price').textContent };
            openModal(product);
        }
    });
}

// Gallery Switcher (Global function for onclick in HTML, or addEventListener here)
// Defined globally or attached:
window.switchModalImage = function(thumb) {
    modalMainImg.src = thumb.src;
    modalThumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
};

// Accordions
accordions.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        // Close others? Optional. Let's keep others open for now or toggle.
        item.classList.toggle('active');
    });
});

// Size selection
sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// --- Mini Modal Logic (Shop Look) ---

const miniModal = document.querySelector('#shop-look-modal');
const closeMiniModalBtn = document.querySelector('.close-mini-modal-btn');
const miniModalBody = document.querySelector('.mini-modal-body');

// Sample Data Mapping (mocking real connections)
const homeProductMap = {
    "Home Example 1": products[0], // Make It Pop
    "Home Example 2": products[1], // Abstract Blue
    "Home Example 3": products[2], // Red Burst
    "Home Example 4": products[3]  // Typography
};

function openMiniModal(product, triggerBtn) {
    // Populate Modal
    miniModalBody.innerHTML = `
        <div class="mini-product-row">
            <img src="${product.img}" alt="${product.title}" class="mini-product-img">
            <div class="mini-product-info">
                <h4>${product.title}</h4>
                <p>${product.price}</p>
            </div>
            <button class="mini-product-link" onclick="openMainModalFromMini('${product.title}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        </div>
    `;

    // Move Modal to the Item Container (Sticky inside)
    const itemContainer = triggerBtn.closest('.showcase-item, .gallery-item, .masonry-item');
    if (itemContainer) {
        // Reset styles that might have been set previously
        miniModal.style.display = 'none'; 
        miniModal.classList.remove('active');
        
        // Append to item
        itemContainer.appendChild(miniModal);
        
        // Display with flex (as defined in CSS for backdrop)
        miniModal.style.display = 'flex';
        
        // Animate in
        // Small delay to allow display:flex to apply before opacity transition
        requestAnimationFrame(() => {
            miniModal.classList.add('active');
        });
    }
}

function closeMiniModal(e) {
    if (e) e.stopPropagation(); // prevent bubbling if clicking close button inside
    
    miniModal.classList.remove('active');
    setTimeout(() => {
        miniModal.style.display = 'none';
        // Optional: Move back to body or leave it? Leaving it is fine, it will move on next open.
        // Moving back to body avoids it getting deleted if list re-renders (not happening here).
        document.body.appendChild(miniModal); 
    }, 300);
}

window.openMainModalFromMini = function(title) {
    const product = products.find(p => p.title === title);
    if (product) {
        closeMiniModal();
        setTimeout(() => openModal(product), 300);
    }
}

// Event Listeners for Shop Buttons
// Event Listeners for Shop Buttons (Global)
document.addEventListener('click', (e) => {
    // Check if clicked Shop Button
    if (e.target.closest('.shop-look-btn')) {
        const btn = e.target.closest('.shop-look-btn');
        // It could be in .showcase-item OR .gallery-item
        const item = btn.closest('.showcase-item, .gallery-item, .masonry-item');
        
        if (item) {
            const img = item.querySelector('img');
            const imgAlt = img ? img.alt : "Product";
            
            // Find mapped product
            // If checking from inspiration page, we might not have 'products' array fully or map.
            // Assuming we use Home Product Map as dummy or random for now 
            // OR we just pick a random one/first one.
            const product = homeProductMap[imgAlt] || products[0]; // Fallback
            
            openMiniModal(product, btn);
            e.stopPropagation(); 
        }
        return;
    }
});



if (miniModal && closeMiniModalBtn) {
    closeMiniModalBtn.addEventListener('click', closeMiniModal);
    miniModal.addEventListener('click', (e) => {
        if (e.target === miniModal) closeMiniModal();
    });
}





