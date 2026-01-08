import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import distinct images for diversity
import i1 from '../assets/images/getInspired/img1.jpg';
import i2 from '../assets/images/getInspired/img2.jpg';
import i3 from '../assets/images/getInspired/img4.jpg';
import i4 from '../assets/images/getInspired/img6.jpg';
import i5 from '../assets/images/getInspired/img11.jpg';
import i6 from '../assets/images/getInspired/img13.jpg';

const Inspiration = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".inspiration-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const items = [i1, i2, i3, i4, i5, i6];

    return (
        <section className="inspiration-section" ref={sectionRef}>
            <div className="section-header">
                <h2>Inspiración Diaria</h2>
                <p>Espacios reales transformados por el arte.</p>
            </div>
            
            <div className="inspiration-grid">
                {items.map((src, idx) => (
                    <div className="inspiration-item" key={idx}>
                        <img src={src} alt={`Inspiration ${idx + 1}`} />
                        <div className="inspiration-overlay">
                            <i className="fa-brands fa-instagram"></i>
                        </div>
                    </div>
                ))}
            </div>

            <div className="center-btn" style={{marginTop: '3rem', textAlign: 'center'}}>
                <Link to="/inspirate" className="btn-secondary">Ver Galería Completa</Link>
            </div>
        </section>
    );
};

export default Inspiration;
