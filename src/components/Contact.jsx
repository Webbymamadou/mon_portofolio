import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

export default function Contact() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1, triggerOnce: true });
  
  const [formData, setFormData] = useState({
    access_key: 'VOTRE_CLE_ACCESS_KEY_ICI',
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null, type: '' }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.access_key === 'VOTRE_CLE_ACCESS_KEY_ICI' || formData.access_key.trim() === '') {
      setStatus({
        submitted: false,
        submitting: false,
        info: { 
          error: true, 
          type: 'warning',
          msg: (
            <>
              <span className="fa fa-warning mr-2"></span> 
              <strong>Attention :</strong> Veuillez générer votre clé d'accès gratuite sur <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#3e64ff', textDecoration: 'underline', fontWeight: 600 }}>web3forms.com</a> et la coller dans votre composant Contact.
            </>
          )
        }
      });
      return;
    }

    // Validation basique de l'e-mail en JavaScript
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { 
          error: true, 
          type: 'danger',
          msg: 'Veuillez saisir une adresse e-mail valide.' 
        }
      });
      return;
    }

    setStatus((prev) => ({
      ...prev,
      submitting: true,
      info: { 
        error: false, 
        type: 'info',
        msg: <><span className="fa fa-spinner fa-spin mr-2"></span> Envoi du message en cours...</> 
      }
    }));

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const res = await response.json();
      if (response.status === 200) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { 
            error: false, 
            type: 'success',
            msg: <><span className="fa fa-check mr-2"></span> <strong>Succès !</strong> Votre message a bien été envoyé. Merci !</> 
          }
        });
        setFormData({
          access_key: formData.access_key,
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { 
            error: true, 
            type: 'danger', 
            msg: <><span className="fa fa-exclamation-triangle mr-2"></span> <strong>Erreur :</strong> {res.message}</> 
          }
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { 
          error: true, 
          type: 'danger', 
          msg: <><span className="fa fa-exclamation-triangle mr-2"></span> <strong>Erreur :</strong> Impossible de joindre le serveur d'envoi.</> 
        }
      });
    }
  };

  const rightColumnVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section ref={ref} className="ftco-section contact-section ftco-no-pt ftco-no-pb" id="contact-section">
      <div className="container">
        
        {/* Titre de section */}
        <div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section text-center">
            <span className="subheading">Me contacter</span>
            <h2 className="mb-4">Contactez-moi</h2>
            <p>Je suis actuellement à la recherche d’une alternance en développement d'applications de gestion et informatique web pour l’année universitaire 2026-2027. N’hésitez pas à me contacter.</p>
          </div>
        </div>

        {/* Ligne de contenu */}
        <div className="row block-9">
          
          {/* Colonne gauche - Formulaire */}
          <div className="col-md-8 mb-4">
            <form onSubmit={handleFormSubmit} className="bg-light p-4 p-md-5 contact-form">
              <input type="hidden" name="access_key" value={formData.access_key} />
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="form-control" 
                      placeholder="Votre nom" 
                      required 
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="form-control" 
                      placeholder="Votre e-mail" 
                      required 
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      className="form-control" 
                      placeholder="Sujet" 
                      required 
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      cols="30" 
                      rows="7" 
                      className="form-control" 
                      placeholder="Message" 
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input 
                      type="submit" 
                      value={status.submitting ? "Envoi en cours..." : "Envoyer le message"} 
                      disabled={status.submitting} 
                      className="btn btn-primary py-3 px-5" 
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {status.info.msg && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mt-3 alert alert-${status.info.type}`}
                        style={{ fontSize: '15px', borderRadius: '5px' }}
                      >
                        {status.info.msg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </div>

          {/* Colonne droite - Coordonnées directes */}
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={rightColumnVariants}
            className="col-md-4 d-flex pl-md-5"
          >
            <div className="row">
              <div className="dbox w-100 d-flex mb-3">
                <div className="icon d-flex align-items-center justify-content-center" style={{ background: '#3e64ff', color: '#fff', borderRadius: '50%', width: '40px', height: '40px' }}>
                  <span className="fa fa-map-marker"></span>
                </div>
                <div className="text pl-3">
                  <p className="mb-0"><span>Adresse :</span> Boop, Dakar, Sénégal</p>
                </div>
              </div>
              <div className="dbox w-100 d-flex mb-3">
                <div className="icon d-flex align-items-center justify-content-center" style={{ background: '#3e64ff', color: '#fff', borderRadius: '50%', width: '40px', height: '40px' }}>
                  <span className="fa fa-phone"></span>
                </div>
                <div className="text pl-3">
                  <p className="mb-0"><span>Téléphone :</span> <a href="tel:+221770778341">+221 77 077 83 41</a></p>
                </div>
              </div>
              <div className="dbox w-100 d-flex mb-3">
                <div className="icon d-flex align-items-center justify-content-center" style={{ background: '#3e64ff', color: '#fff', borderRadius: '50%', width: '40px', height: '40px' }}>
                  <span className="fa fa-paper-plane"></span>
                </div>
                <div className="text pl-3">
                  <p className="mb-0"><span>E-mail :</span> <a href="mailto:mamadouseck1357@gmail.com">mamadouseck1357@gmail.com</a></p>
                </div>
              </div>
              <div className="dbox w-100 d-flex mb-3">
                <div className="icon d-flex align-items-center justify-content-center" style={{ background: '#3e64ff', color: '#fff', borderRadius: '50%', width: '40px', height: '40px' }}>
                  <span className="fa fa-github"></span>
                </div>
                <div className="text pl-3">
                  <p className="mb-0"><span>GitHub :</span> <a href="https://github.com/Webbymamadou?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a></p>
                </div>
              </div>
              <div className="dbox w-100 d-flex mb-3">
                <div className="icon d-flex align-items-center justify-content-center" style={{ background: '#3e64ff', color: '#fff', borderRadius: '50%', width: '40px', height: '40px' }}>
                  <span className="fa fa-linkedin"></span>
                </div>
                <div className="text pl-3">
                  <p className="mb-0"><span>LinkedIn :</span> <a href="https://www.linkedin.com/in/mamadou-seck" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
