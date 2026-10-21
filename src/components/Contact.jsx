import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersection from '../hooks/useIntersection';

const WHATSAPP_NUMBER = '221770778341';

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
    transition: { duration: 0.6, ease: 'easeOut' },
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status.type === 'warning' || status.type === 'danger') {
      setStatus({ type: '', message: '' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) {
      setStatus({
        type: 'warning',
        message: 'Veuillez remplir tous les champs.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus({
        type: 'warning',
        message: 'Veuillez saisir une adresse e-mail valide.',
      });
      return;
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length > 5000
    ) {
      setStatus({
        type: 'warning',
        message: 'Certains champs sont trop longs.',
      });
      return;
    }

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

    const whatsappUrl =
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(whatsappMessage)}`;

    // Ouvrir WhatsApp directement dans l'onglet actuel.
    window.location.assign(whatsappUrl);
  };

  return (
    <section
      ref={ref}
      className="ftco-section contact-section ftco-no-pt ftco-no-pb"
      id="contact-section"
    >
      <div className="container">

        {/* Titre */}
        <div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section text-center">
            <span className="subheading">Me contacter</span>
            <h2 className="mb-4">Contactez-moi</h2>
            <p>
            Passionné par le développement d’applications de gestion et l’informatique web, je suis ouvert aux opportunités de collaboration et aux nouveaux projets. N’hésitez pas à me contacter.
            </p>
          </div>
        </div>

        <div className="row block-9">

          {/* Formulaire */}
          <div className="col-md-8 mb-4">
            <form
              onSubmit={handleFormSubmit}
              className="bg-light p-4 p-md-5 contact-form"
            >
              <div className="row">

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

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="contact-email" className="sr-only">
                      Votre e-mail
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

                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="contact-subject" className="sr-only">
                      Sujet
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

                  <AnimatePresence mode="wait">
                    {status.message && (
                      <motion.div
                        key={status.message}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        role="alert"
                        className={`mt-3 alert alert-${status.type}`}
                        style={{
                          fontSize: '15px',
                          borderRadius: '5px',
                        }}
                      >
                        {status.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </form>
          </div>

          {/* Coordonnées */}
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
