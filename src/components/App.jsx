import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import css from '../components/App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { pixabayGetImages } from 'services/api';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

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
          setTotalHits('error', []);
          setIsLoading(false);
          return;
        }

        setImages(
          prevState => (page === 1 ? hits : [...prevState, ...hits]),
          setTotalHits(totalHits),
          setError(null)
        );
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setError('error');
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {error === 'error' && (
        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,
            color: '#010101',
          }}
        >
          There is nothing here.
        </p>
      )}
      {error === null && <ImageGallery images={images} />}

      {isLoading && <Loader />}
      {totalHits > images.length && error === null && (
        <Button onLoadMore={handleLoadMore} />
      )}
    </div>
  );
};
