import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import css from '../components/App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { pixabayGetImages } from 'services/api';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';
import Notiflix from 'notiflix';
import { MistakeMessage, EmptyMessage } from './MistakeMessage/MistakeMessage';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);

    const fetchImages = async () => {
      try {
        const { hits, totalHits } = await pixabayGetImages(query, page);

        if (totalHits === 0) {
          setTotalHits(totalHits);
          setImages([]);
          setIsLoading(false);
          return;
        }

        setImages(prevState => (page === 1 ? hits : [...prevState, ...hits]));

        setTotalHits(totalHits);

        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSubmit = searchQuery => {
    if (searchQuery === query) {
      Notiflix.Notify.success(`${searchQuery} are already in the list`);
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {error && <MistakeMessage />}
      {totalHits === 0 && <EmptyMessage />}
      {error === null && <ImageGallery images={images} />}

      {isLoading && <Loader />}
      {totalHits > images.length && error === null && (
        <Button onLoadMore={handleLoadMore} />
      )}
    </div>
  );
};
