import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const WHATSAPP_NUMBER = '221770778341';

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
  hidden: {
    x: 30,
    opacity: 0,
  },
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
    type: '',
    message: '',
  });

  // Mise à jour des champs du formulaire.
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer les anciennes erreurs lorsque l'utilisateur corrige un champ.
    if (status.type === 'danger' || status.type === 'warning') {
      setStatus({
        type: '',
        message: '',
      });
    }
  };

  // Validation du formulaire et préparation du message WhatsApp.
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    // Vérifier que tous les champs sont remplis.
    if (!name || !email || !subject || !message) {
      setStatus({
        type: 'warning',
        message: 'Veuillez remplir tous les champs du formulaire.',
      });
      return;
    }

    // Vérifier le format de l'adresse e-mail.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus({
        type: 'warning',
        message: 'Veuillez saisir une adresse e-mail valide.',
      });
      return;
    }

    // Limiter la longueur des données.
    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length > 5000
    ) {
      setStatus({
        type: 'warning',
        message:
          'Certains champs sont trop longs. Veuillez raccourcir votre saisie.',
      });
      return;
    }

    // Construire le message qui sera envoyé par WhatsApp.
    const whatsappMessage = [
      'Bonjour Mamadou !',
      '',
      'Je vous contacte depuis votre portfolio.',
      '',
      `Nom : ${name}`,
      `E-mail : ${email}`,
      `Sujet : ${subject}`,
      '',
      'Message :',
      message,
    ].join('\n');

    // Créer le lien WhatsApp avec le message prérempli.
    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

    // Ouvrir WhatsApp dans un nouvel onglet.
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Afficher une confirmation à l'utilisateur.
    setStatus({
      type: 'success',
      message:
        'WhatsApp va s’ouvrir avec votre message. Vérifiez-le, puis cliquez sur Envoyer pour me le transmettre.',
    });

    // Réinitialiser les champs.
    setFormData({ ...INITIAL_FORM });
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

          {/* Colonne gauche : formulaire */}
          <div className="col-md-8 mb-4">
            <form
              onSubmit={handleFormSubmit}
              className="bg-light p-4 p-md-5 contact-form"
            >
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

                {/* Adresse e-mail */}
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
                      placeholder="Votre message"
                      maxLength={5000}
                      required
                    />
                  </div>
                </div>

                {/* Bouton d'envoi */}
                <div className="col-md-12">
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary py-3 px-5"
                    >
                      <span
                        className="fa fa-whatsapp mr-2"
                        aria-hidden="true"
                      />
                      Envoyer via WhatsApp
                    </button>
                  </div>

                  {/* Message de confirmation ou d'erreur */}
                  <AnimatePresence mode="wait">
                    {status.message && (
                      <motion.div
                        key={`${status.type}-${status.message}`}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                        }}
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

                        {status.type === 'warning' && (
                          <span
                            className="fa fa-exclamation-triangle mr-2"
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

          {/* Colonne droite : coordonnées */}
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
                          target={
                            contact.external ? '_blank' : undefined
                          }
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
