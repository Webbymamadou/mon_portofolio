import React from 'react';
import { motion } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

export default function HireMe() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="ftco-hireme">
      <div className="container">
        <div className="row justify-content-between">
          
          {/* Panneau de texte d'alternance */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="col-md-8 col-lg-8 d-flex align-items-center"
          >
            <div className="w-100 py-4">
              <h2>Disponible dès décembre 2026</h2>
              <p>Je cherche une alternance ou un stage en développement backend (Python, Django, FastAPI, Docker) ou en DevOps junior, pour rejoindre une équipe et contribuer à de vrais projets. Je suis aussi ouvert aux missions de développement d’application : si vous avez une idée à transformer en produit, parlons-en.</p>
              <p className="mb-0">
                <a 
                  href="https://wa.me/221770778341?text=Bonjour%20Mamadou%2C%20je%20vous%20contacte%20depuis%20votre%20portfolio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-white py-3 px-4"
                >
                  Me contacter sur WhatsApp
                </a>
              </p>
            </div>
          </motion.div>

          {/* Panneau de photo de profil */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: 'backOut' }}
            className="col-md-4 col-lg-4 d-flex align-items-center justify-content-center"
          >
            <img 
              src="/images/profil.jpeg" 
              style={{ 
                border: '5px solid #fff', 
                width: '220px', 
                height: '220px', 
                objectFit: 'cover', 
                objectPosition: 'center', 
                borderRadius: '50%', 
                boxShadow: '0px 24px 36px -11px rgba(0, 0, 0, 0.09)', 
                marginBottom: '20px' 
              }} 
              alt="Mamadou Seck" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}