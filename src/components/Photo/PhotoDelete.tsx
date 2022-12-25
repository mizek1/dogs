import React from 'react';
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../hooks/useFetch';
import styles from './PhotoDelete.module.scss';

const PhotoDelete = ({ id }: { id: number }) => {
  const { loading, request } = useFetch();

  const handleClick = async (event: React.SyntheticEvent) => {
    const confirm = window.confirm('Tem certeza que deseja deletar?');

    if (confirm) {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { url, options } = PHOTO_DELETE(token, { id });
        const { response } = await request(url, options);

        if (response && response.ok) window.location.reload();
      }
    }
  };

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
