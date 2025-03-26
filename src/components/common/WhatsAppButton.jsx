import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber }) => {
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${formattedPhoneNumber}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={24} />
      <span>Chat with us</span>

      <style jsx>{`
        .whatsapp-button {
          position: fixed;
          bottom: 25px; /* Decreased from 40px to 25px to be even lower on desktop */
          right: 20px;
          background-color: #25D366;
          color: white;
          border-radius: 50px;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 999;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .whatsapp-button:hover {
          background-color: #128C7E;
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .whatsapp-button {
            padding: 10px;
            bottom: 150px; /* Increased from 120px to 150px to position even higher on mobile */
          }
          
          .whatsapp-button span {
            display: none;
          }
        }
      `}</style>
    </a>
  );
};

export default WhatsAppButton;
