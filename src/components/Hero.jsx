import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/images/acceuil1.png',
  '/images/acceuil.png'
];

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil-section" className="hero" style={{ overflow: 'hidden', position: 'relative', height: '750px' }}>
      <div className="home-slider owl-carousel" style={{ position: 'relative', height: '100%' }}>
        
        {/* Un seul slider-item statique pour le texte, tandis que l'image à droite fade doucement */}
        <div 
          className="slider-item"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            display: 'block' 
          }}
        >
          <div className="overlay"></div>
          <div className="container-fluid px-md-0" style={{ height: '100%' }}>
            <div className="row d-md-flex no-gutters slider-text align-items-end justify-content-end" style={{ height: '100%', position: 'relative' }}>
              
              {/* Panneau d'image glissant/fondu sur le côté droit */}
              <div className="one-third order-md-last img" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%',
                      backgroundImage: `url(${IMAGES[activeImage]})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center top'
                    }}
                  >
                    <div className="overlay"></div>
                    <div className="overlay-1"></div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Panneau de texte STATIQUE sur le côté gauche */}
              <div className="one-forth d-flex align-items-center">
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="text"
                >
                  <span className="subheading">Bonjour, je suis Mamadou Seck</span>
                  <h1 className="mb-4 mt-3" style={{ fontSize: '40px', lineHeight: '1.2' }}>
                    Futur Backend Developer &amp; DevOps | <span>Python, Docker, Linux</span>
                  </h1>
                  <p className="mb-4">
                    Étudiant en Licence 2 Informatique Appliquée à la Gestion des Entreprises (IAGE) à l'Institut Supérieur d'Informatique (ISI). Passionné par le développement backend (Python, Java, PHP) et l'initiation aux pratiques DevOps (Docker, Git, serveurs Linux). Je recherche une alternance ou un stage pour consolider mes compétences et contribuer à des projets concrets.
                  </p>
                  <p>
                    <a href="#projects-section" onClick={(e) => handleScrollTo(e, 'projects-section')} className="btn btn-primary mr-2">
                      Voir mes projets
                    </a> 
                    <a href="/cv_pro_seck.pdf" target="_blank" className="btn btn-primary btn-outline-primary">
                      Télécharger mon CV
                    </a>
                  </p>
                </motion.div>
              </div>

            </div>
          </div>
        </div>

        {/* Indicateurs / points du carrousel */}
        <div className="owl-dots" style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, zIndex: 10 }}>
          {IMAGES.map((_, index) => (
            <button 
              key={index} 
              className={`owl-dot ${activeImage === index ? 'active' : ''}`}
              onClick={() => setActiveImage(index)}
              style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
