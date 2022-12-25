import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import PhotoComments from './PhotoComments';
import styles from './PhotoContent.module.scss';
import PhotoDelete from './PhotoDelete';
import { PhotoWithComments } from './types';

interface PhotoContentProps {
  data: PhotoWithComments;
}

const PhotoContent = ({ data }: PhotoContentProps) => {
  const { userData } = React.useContext(UserContext);
  const { photo, comments } = data;

  return (
    <div className={styles.photo}>
      <img className={styles.img} src={photo.src} alt={photo.title} />
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {userData && userData.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizations}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
