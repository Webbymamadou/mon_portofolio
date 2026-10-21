import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const ACCESS_KEY = '46d90558-6651-4d22-a373-40e41fde4b64';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const CONTACTS = [
  {
    label: 'Adresse',
    value: 'Zac Mbao, Dakar, Sénégal',
    icon: 'fa-map-marker',
  },
  {
    label: 'Téléphone',
    value: '+221 77 077 83 41',
    icon: 'fa-phone',
    href: 'tel:+221770778341',
  },
  {
    label: 'E-mail',
    value: 'mamadouseck1357@gmail.com',
    icon: 'fa-paper-plane',
    href: 'mailto:mamadouseck1357@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'GitHub',
    icon: 'fa-github',
    href: 'https://github.com/Webbymamadou?tab=repositories',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'LinkedIn',
    icon: 'fa-linkedin',
    href: 'https://www.linkedin.com/in/mamadou-seck-39b953350/',
    external: true,
  },
];

const RIGHT_COLUMN_VARIANTS = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Contact() {
  const [ref, isVisible] = useIntersection({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState(INITIAL_FORM);

  const [status, setStatus] = useState({
    submitting: false,
    type: '',
    message: '',
  });

  // Empêche les doubles soumissions, même avant le prochain rendu React.
  const submittingRef = useRef(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Efface le message d'erreur lorsque l'utilisateur corrige le formulaire.
    if (status.type === 'danger' || status.type === 'warning') {
      setStatus({
        submitting: false,
        type: '',
        message: '',
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) {
      return;
    }

    // Vérification des champs.
    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (
      !cleanedData.name ||
      !cleanedData.email ||
      !cleanedData.subject ||
      !cleanedData.message
    ) {
      setStatus({
        submitting: false,
        type: 'warning',
        message: 'Veuillez remplir tous les champs du formulaire.',
      });

      return;
    }

    // Vérification élémentaire du format de l'adresse e-mail.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanedData.email)) {
      setStatus({
        submitting: false,
        type: 'warning',
        message: 'Veuillez saisir une adresse e-mail valide.',
      });

      return;
    }

    // Limitation de la taille des champs.
    if (
      cleanedData.name.length > 100 ||
      cleanedData.subject.length > 150 ||
      cleanedData.message.length > 5000
    ) {
      setStatus({
        submitting: false,
        type: 'warning',
        message:
          'Certains champs sont trop longs. Vérifiez les limites indiquées.',
      });

      return;
    }

    submittingRef.current = true;

    setStatus({
      submitting: true,
      type: 'info',
      message: 'Envoi de votre message en cours...',
    });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          ...cleanedData,
        }),
      });

      // Vérification de la réponse du service.
      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message ||
            "Le service n'a pas pu accepter votre message."
        );
      }

      // Confirmation uniquement si le service indique un succès.
      setFormData({ ...INITIAL_FORM });

      setStatus({
        submitting: false,
        type: 'success',
        message:
          'Votre message a bien été envoyé. Merci de m’avoir contacté !',
      });
    } catch (error) {
      console.error('Erreur lors de l’envoi du formulaire :', error);

      setStatus({
        submitting: false,
        type: 'danger',
        message:
          error instanceof TypeError
            ? 'Impossible de joindre le service d’envoi. Vérifiez votre connexion et réessayez.'
            : error.message ||
              "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section
      ref={ref}
      className="ftco-section contact-section ftco-no-pt ftco-no-pb"
      id="contact-section"
    >
      <div className="container">

        {/* Titre de la section */}
        <div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section text-center">
            <span className="subheading">Me contacter</span>

            <h2 className="mb-4">Contactez-moi</h2>

            <p>
              Je suis actuellement à la recherche d’une alternance en
              développement d'applications de gestion et informatique web
              pour l’année universitaire 2026-2027. N’hésitez pas à me
              contacter.
            </p>
          </div>
        </div>

        {/* Formulaire et coordonnées */}
        <div className="row block-9">

          {/* Colonne gauche : Formulaire */}
          <div className="col-md-8 mb-4">
            <form
              onSubmit={handleFormSubmit}
              className="bg-light p-4 p-md-5 contact-form"
              aria-busy={status.submitting}
            >
              {/* Clé publique du service Web3Forms */}
              <input
                type="hidden"
                name="access_key"
                value={ACCESS_KEY}
                readOnly
              />

              <div className="row">

                {/* Nom */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="sr-only">
                      Votre nom
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Votre nom"
                      autoComplete="name"
                      maxLength={100}
                      required
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="contact-email" className="sr-only">
                      Votre adresse e-mail
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Votre e-mail"
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="contact-subject" className="sr-only">
                      Sujet du message
                    </label>

                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Sujet"
                      maxLength={150}
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="contact-message" className="sr-only">
                      Votre message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      cols="30"
                      rows="7"
                      className="form-control"
                      placeholder="Message"
                      maxLength={5000}
                      required
                    />
                  </div>
                </div>

                {/* Bouton et notification */}
                <div className="col-md-12">
                  <div className="form-group">
                    <button
                      type="submit"
                      disabled={status.submitting}
                      className="btn btn-primary py-3 px-5"
                    >
                      {status.submitting ? (
                        <>
                          <span
                            className="fa fa-spinner fa-spin mr-2"
                            aria-hidden="true"
                          />
                          Envoi en cours...
                        </>
                      ) : (
                        'Envoyer le message'
                      )}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {status.message && (
                      <motion.div
                        key={`${status.type}-${status.message}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        role={
                          status.type === 'danger' ||
                          status.type === 'warning'
                            ? 'alert'
                            : 'status'
                        }
                        aria-live={
                          status.type === 'danger' ||
                          status.type === 'warning'
                            ? 'assertive'
                            : 'polite'
                        }
                        className={`mt-3 alert alert-${status.type}`}
                        style={{
                          fontSize: '15px',
                          borderRadius: '5px',
                        }}
                      >
                        {status.type === 'success' && (
                          <span
                            className="fa fa-check mr-2"
                            aria-hidden="true"
                          />
                        )}

                        {(status.type === 'danger' ||
                          status.type === 'warning') && (
                          <span
                            className="fa fa-exclamation-triangle mr-2"
                            aria-hidden="true"
                          />
                        )}

                        {status.type === 'info' && (
                          <span
                            className="fa fa-spinner fa-spin mr-2"
                            aria-hidden="true"
                          />
                        )}

                        {status.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </div>

          {/* Colonne droite : Coordonnées */}
          <motion.div
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={RIGHT_COLUMN_VARIANTS}
            className="col-md-4 d-flex pl-md-5 mt-5 mt-md-0"
          >
            <div className="w-100">

              {CONTACTS.map((contact) => (
                <div
                  className="dbox w-100 d-flex mb-3"
                  key={contact.label}
                >
                  <div
                    className="icon d-flex align-items-center justify-content-center"
                    style={{
                      background: '#3e64ff',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      minWidth: '40px',
                    }}
                  >
                    <span
                      className={`fa ${contact.icon}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="text pl-3">
                    <p className="mb-0">
                      <span>{contact.label} :</span>{' '}

                      {contact.href ? (
                        <a
                          href={contact.href}
                          target={contact.external ? '_blank' : undefined}
                          rel={
                            contact.external
                              ? 'noopener noreferrer'
                              : undefined
                          }
                        >
                          {contact.value}
                        </a>
                      ) : (
                        contact.value
                      )}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
