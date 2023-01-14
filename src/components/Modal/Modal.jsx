import propTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

export const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdrop}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    document.querySelector('#portal')
  );
};

Modal.propTypes = {
  largeImageURL: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
};
