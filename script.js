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

// --- Data Objects ---

const products = [
    { title: "Make It Pop", price: "Desde $300", img: "assets/images/recent/poster1.jpg" },
    { title: "Abstract Blue", price: "Desde $300", img: "assets/images/recent/poster2.jpg" },
    { title: "Red Burst", price: "Desde $300", img: "assets/images/recent/poster3.jpg" },
    { title: "Typography No.1", price: "Desde $320", img: "assets/images/recent/poster4.jpg" },
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
    { name: "Tipografía", img: "assets/images/styles/typography.jpg" },
    { name: "Minimalista", img: "assets/images/styles/minimalist.jpg" },
    { name: "Abstracto", img: "assets/images/styles/abstract.jpg" },
      { name: "Tipografía", img: "assets/images/styles/typography.jpg" }
];

// --- Dynamic Rendering ---

function renderProduct(product) {
    return `
        <article class="product-card carousel-item">
            <div class="card-image">
                <img src="${product.img}" alt="${product.title}">
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
renderCarouselContent('styles-section', styles, renderStyle); // Note: Need to add ID to styles section in HTML

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
    const getWidth = () => allItems[0].offsetWidth + 32; 
    
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
                duration: 0.5,
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
                duration: 0.5,
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
// We wrap in a small timeout or just call now since JS runs at end of body
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
