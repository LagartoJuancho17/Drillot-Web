import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
             if (window.scrollY > 50) {
                 setIsScrolled(true);
             } else {
                 setIsScrolled(false);
             }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle Mobile Body Scroll Lock
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Reset shop state when closing menu
        if (isMenuOpen) setIsShopOpen(false);
    };

    const toggleShop = (e) => {
        e.preventDefault(); // Prevent navigation
        // Only toggle on mobile or click
        setIsShopOpen(!isShopOpen);
    };

    // Close logic
    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsShopOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHomePage ? 'home-navbar' : ''}`}>
             <div className="nav-container">
                <Link to="/" className="logo" onClick={closeMenu}>
                    Drillot We.
                </Link>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''} ${isShopOpen ? 'menu-expanded' : ''}`}>
                    {/* Shop Dropdown */}
                    <div className={`nav-item dropdown ${isShopOpen ? 'active' : ''}`}>
                        <a href="#" className="dropdown-trigger" onClick={toggleShop}>
                            SHOP <i className="fa-solid fa-chevron-down"></i>
                        </a>
                        <div className="dropdown-menu">
                            <div className="dropdown-content">
                                <div className="dropdown-column">
                                    <h4>Estilos</h4>
                                    <div className="style-grid-menu">
                                        <Link to="/minimalist" onClick={closeMenu}>Minimalista</Link>
                                        <Link to="/typography" onClick={closeMenu}>Tipografía</Link>
                                        <Link to="/abstract" onClick={closeMenu}>Abstracto</Link>
                                        <Link to="/classic" onClick={closeMenu}>Clásico</Link>
                                    </div>
                                </div>
                                <div className="dropdown-column">
                                    <h4>Colecciones</h4>
                                    <ul className="dropdown-list">
                                        <li><Link to="/bestsellers" onClick={closeMenu}>Más Vendidos</Link></li>
                                        <li><Link to="/new-arrivals" onClick={closeMenu}>Novedades</Link></li>
                                        <li><Link to="/sets" onClick={closeMenu}>Sets de Cuadros</Link></li>
                                        <li><Link to="/large-format" onClick={closeMenu}>Formato Grande</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/inspirate" onClick={closeMenu}>INSPIRATE</Link>
                    <Link to="/about" onClick={closeMenu}>NOSOTROS</Link>
                </div>

                <div className="nav-icons">
                    <button className="icon-btn search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                    <button className="icon-btn cart-btn"><i className="fa-solid fa-cart-shopping"></i></button>
                    
                    {/* Mobile Menu Button */}
                    <button className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                    </button>
                </div>
             </div>
        </nav>
    );
};

export default Navbar;
