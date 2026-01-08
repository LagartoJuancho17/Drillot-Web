import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import images
import hero1 from '../assets/images/hero/hero1.jpg';
import hero2 from '../assets/images/hero/hero2.jpg';
import hero3 from '../assets/images/hero/hero3.jpg';
import hero4 from '../assets/images/hero/hero4.jpg';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
    { src: hero1, pos: 'pos-top' },
    { src: hero2, pos: '' },
    { src: hero3, pos: 'pos-right' },
    { src: hero4, pos: 'pos-right' }
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const heroRef = useRef(null);
    const titleRef = useRef(null);

    // Auto Rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setCurrentIndex(index);
        // Reset timer could be complex in hook, simple approach is fine for now
    };

    // Animation on Mount
    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            // Split text (manual splitting in JSX is cleaner, but lets animate chars)
            // GSAP Animation
            const tl = gsap.timeline();
            
            tl.from(".hero-title .char", {
                y: 100,
                opacity: 0,
                duration: 0.7,
                stagger: 0.03,
                ease: "power4.out"
            })
            .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
            .from(".cta-button", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Helper to render chars
    const renderTitle = () => {
        const lines = ["ARTE QUE", "TRANSFORMA", "TU ESPACIO"];
        return lines.map((line, i) => (
            <span key={i} className="line">
                {line.split('').map((char, j) => (
                    <span key={j} className="char" style={{display: 'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
            </span>
        ));
    };

    return (
        <header className="hero" ref={heroRef}>
            <div className="hero-content">
                <h1 className="hero-title">
                    {renderTitle()}
                </h1>
                <p className="hero-subtitle">
                    Descubre nuestra colección curada de pósters minimalistas y abstractos.
                </p>
                <a href="#recent" className="cta-button">Ver Colección</a>
            </div>

            <div className="hero-image-container">
                <div className="hero-image-overlay"></div>
                <div className="hero-carousel-track">
                    {heroImages.map((img, index) => (
                        <img 
                            key={index} 
                            src={img.src} 
                            alt={`Slide ${index + 1}`} 
                            className={`hero-img ${img.pos} ${index === currentIndex ? 'active' : ''}`} 
                        />
                    ))}
                </div>
                <div className="hero-indicators">
                    {heroImages.map((_, index) => (
                        <button 
                            key={index}
                            className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Hero;
