import React from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import { Photo } from '../Photo/types';
import styles from './FeedPhotos.module.scss';
import FeedPhotosItem from './FeedPhotosItem';

const TOTAL_PER_PAGE = 6;

interface FeedPhotosProps {
  user: number;
  page: number;
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | null>>;
  setInfinite: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedPhotos = ({
  user,
  page,
  setModalPhoto,
  setInfinite,
}: FeedPhotosProps) => {
  const { data, loading, error, request } = useFetch<Photo[]>();

  React.useEffect(() => {
    const fetchPhotos = async () => {
      const { url, options } = PHOTOS_GET({
        page,
        total: TOTAL_PER_PAGE,
        user,
      });
      const { response, json } = await request(url, options);

      if (response && response.ok && json.length < TOTAL_PER_PAGE) {
        setInfinite(false);
      }
    };
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => {
          return (
            <FeedPhotosItem
              key={photo.id}
              photo={photo}
              setModalPhoto={setModalPhoto}
            />
          );
        })}
      </ul>
    );
  return null;
};

export default FeedPhotos;
