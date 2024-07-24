import React from 'react';
import './Modal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Tem certeza de que deseja excluir este produto?</p>
        <button className="modal-close" onClick={onClose}>Não</button>
        <button onClick={handleConfirm}>Sim</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
