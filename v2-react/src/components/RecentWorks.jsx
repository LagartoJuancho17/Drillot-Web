import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import images
import poster1 from '../assets/images/recent/poster1.jpg';
import poster1hover from '../assets/images/recent/poster1hover.jpg';
import poster2 from '../assets/images/recent/poster2.jpg';
import poster2hover from '../assets/images/recent/poster2hover.jpg';
import poster3 from '../assets/images/recent/poster3.jpg';
import poster3hover from '../assets/images/recent/poster3hover.jpg';
import poster4 from '../assets/images/recent/poster4.jpg';
import poster4hover from '../assets/images/recent/poster4hover.jpg';

const products = [
    {
        id: 1,
        name: "Equilibrio Silencioso",
        price: "29.99 €",
        img: poster1,
        hoverImg: poster1hover,
        tag: "Nuevo"
    },
    {
        id: 2,
        name: "Formas de la Mente",
        price: "34.50 €",
        img: poster2,
        hoverImg: poster2hover,
        tag: "Bestseller"
    },
    {
        id: 3,
        name: "Arquitectura Efímera",
        price: "24.99 €",
        img: poster3,
        hoverImg: poster3hover,
    },
    {
        id: 4,
        name: "Sombras del Atardecer",
        price: "39.99 €",
        img: poster4,
        hoverImg: poster4hover,
    }
];

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-container">
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <Link to={`/product/${product.id}`}>
                    <img 
                        src={isHovered ? product.hoverImg : product.img} 
                        alt={product.name} 
                        className={`product-img ${isHovered ? 'fade-in' : ''}`}
                    />
                </Link>
                <button className="add-to-cart-btn">
                    Añadir al Carrito
                </button>
            </div>
            <div className="product-info">
                <Link to={`/product/${product.id}`}>
                    <h4>{product.name}</h4>
                </Link>
                <p>{product.price}</p>
            </div>
        </div>
    );
};

const RecentWorks = () => {
    return (
        <section className="recent-works-section" id="recent">
            <div className="section-header">
                <h2>Novedades</h2>
                <p>Las últimas incorporaciones a nuestro catálogo.</p>
            </div>
            
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            <div className="section-footer">
                <Link to="/shop" className="btn-secondary">Ver Todo</Link>
            </div>
        </section>
    );
};

export default RecentWorks;
