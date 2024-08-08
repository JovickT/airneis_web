import React from "react";
import Modal from "react-modal";

// Vous pouvez définir le style global pour la modale ici
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    border: 'none',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, onCancel, title, message }: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false} // Ajoutez ceci si vous obtenez une erreur liée à l'accessibilité
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button onClick={onConfirm} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>Confirmer</button>
        <button onClick={onCancel} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>Annuler</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
