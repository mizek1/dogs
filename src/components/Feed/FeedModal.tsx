import React from 'react';
import { PHOTO_GET } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import PhotoContent from '../Photo/PhotoContent';
import { Photo, PhotoWithComments } from '../Photo/types';
import styles from './FeedModal.module.scss';

export interface FeedModalProps {
  photo: Photo;
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | null>>;
}

const FeedModal = ({ photo, setModalPhoto }: FeedModalProps) => {
  const { data, error, loading, request } = useFetch<PhotoWithComments>();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  const handleOutsideClick = ({
    target,
    currentTarget,
  }: React.SyntheticEvent) => {
    if (target === currentTarget) setModalPhoto(null);
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <>
        {error && <Error error={error} />}
        {loading && <Loading />}
        {data && <PhotoContent data={data} />}
      </>
    </div>
  );
};

export default FeedModal;
