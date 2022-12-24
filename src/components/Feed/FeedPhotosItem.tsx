import styles from './FeedPhotosItem.module.scss';
import { Photo } from './types';

interface FeedPhotosItemProps {
  photo: Photo;
}

const FeedPhotosItem = ({ photo }: FeedPhotosItemProps) => {
  return (
    <li className={styles.photo}>
      <img src={photo.src} alt={photo.title} />
      <span className={styles.visualizations}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
