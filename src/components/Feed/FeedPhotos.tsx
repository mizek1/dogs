import React from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import styles from './FeedPhotos.module.scss';
import FeedPhotosItem from './FeedPhotosItem';
import { Photo } from './types';

const FeedPhotos = () => {
  const { data, loading, error, request } = useFetch<Photo[]>();

  React.useEffect(() => {
    const fetchPhotos = async () => {
      const { url, options } = PHOTOS_GET({
        page: 1,
        total: 6,
        user: 0,
      });
      const { response, json } = await request(url, options);
    };
    fetchPhotos();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => {
          return <FeedPhotosItem key={photo.id} photo={photo} />;
        })}
      </ul>
    );
  return null;
};

export default FeedPhotos;
