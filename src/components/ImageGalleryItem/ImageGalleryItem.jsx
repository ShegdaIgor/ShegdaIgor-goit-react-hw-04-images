import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={onToggleModal}
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt=""
      />
      {isModalOpen && (
        <Modal largeImageURL={largeImageURL} onClose={onToggleModal} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
