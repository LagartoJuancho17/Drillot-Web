import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2>Drillot We.</h2>
                        <p>Arte que inspira, diseño que perdura.</p>
                    </div>
                    
                    <div className="footer-links-group">
                        <h4>Explora</h4>
                        <ul>
                            <li><Link to="/shop">Tienda</Link></li>
                            <li><Link to="/minimalist">Minimalista</Link></li>
                            <li><Link to="/abstract">Abstracto</Link></li>
                            <li><Link to="/typography">Tipografía</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h4>Info</h4>
                        <ul>
                            <li><Link to="/about">Nosotros</Link></li>
                            <li><Link to="/contact">Contacto</Link></li>
                            <li><Link to="/shipping">Envíos</Link></li>
                            <li><Link to="/returns">Devoluciones</Link></li>
                        </ul>
                    </div>

                    <div className="footer-social">
                        <h4>Síguenos</h4>
                        <div className="social-icons">
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-pinterest"></i></a>
                            <a href="#"><i className="fa-brands fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Drillot We. Todos los derechos reservados.</p>
                    <div className="payment-methods">
                        <i className="fa-brands fa-cc-visa"></i>
                        <i className="fa-brands fa-cc-mastercard"></i>
                        <i className="fa-brands fa-cc-paypal"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
