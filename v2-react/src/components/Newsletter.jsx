import React from 'react';

const Newsletter = () => {
    return (
        <section className="newsletter-section">
            <div className="newsletter-content">
                <h2>Únete al Club de Arte</h2>
                <p>Recibe inspiración semanal, acceso anticipado a nuevas colecciones y un 10% de descuento en tu primer pedido.</p>
                
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Tu correo electrónico" required />
                    <button type="submit">Suscribirse</button>
                </form>
                <p className="small-text">No hacemos spam. Date de baja cuando quieras.</p>
            </div>
        </section>
    );
};

export default Newsletter;
