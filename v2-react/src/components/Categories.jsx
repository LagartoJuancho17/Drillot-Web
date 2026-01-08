import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import minimalistImg from '../assets/images/styles/minimalist.jpg';
import abstractImg from '../assets/images/styles/abstract.jpg';
import typographyImg from '../assets/images/styles/lettering.jpg'; // Using lettering as typography
import organicImg from '../assets/images/styles/organic.jpg';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    { name: 'Minimalista', image: minimalistImg, link: '/minimalist' },
    { name: 'Abstracto', image: abstractImg, link: '/abstract' },
    { name: 'Tipografía', image: typographyImg, link: '/typography' },
    { name: 'Orgánico', image: organicImg, link: '/organic' }
];

const Categories = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.category-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="categories-section" ref={sectionRef}>
            <div className="section-header">
                <h2>Explora por Estilo</h2>
                <p>Encuentra la pieza perfecta que resuene con tu estética.</p>
            </div>
            
            <div className="categories-grid">
                {categories.map((cat, index) => (
                    <Link to={cat.link} key={index} className="category-card">
                        <div className="category-image-container">
                            <img src={cat.image} alt={cat.name} className="category-image" />
                            <div className="category-overlay">
                                <span>Ver Colección</span>
                            </div>
                        </div>
                        <h3>{cat.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
