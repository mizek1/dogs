import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';
import Loading from '../Helpers/Loading';
import PhotoContent from './PhotoContent';
import { PhotoWithComments } from './types';

const Photo = () => {
  const { id } = useParams();
  const { data, error, loading, request } = useFetch<PhotoWithComments>();

  React.useEffect(() => {
    const getPhoto = async () => {
      if (id) {
        const { url, options } = PHOTO_GET(Number(id));
        await request(url, options);
      }
    };
    getPhoto();
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} description="Página de foto." />
        <PhotoContent data={data} single={true} />
      </section>
    );
  return null;
};

export default Photo;
