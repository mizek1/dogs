import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import Image from '../Helpers/Image';
import PhotoComments from './PhotoComments';
import styles from './PhotoContent.module.scss';
import PhotoDelete from './PhotoDelete';
import { PhotoWithComments } from './types';

interface PhotoContentProps {
  data: PhotoWithComments;
  single?: boolean;
}

const PhotoContent = ({ data, single }: PhotoContentProps) => {
  const { userData } = React.useContext(UserContext);
  const { photo, comments } = data;

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <Image className={styles.img} src={photo.src} alt={photo.title} />
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
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} single={single} />
    </div>
  );
};

export default PhotoContent;
