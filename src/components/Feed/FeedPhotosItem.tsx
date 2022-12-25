import { FeedModalProps } from './FeedModal';
import styles from './FeedPhotosItem.module.scss';

interface FeedPhotosItemProps extends FeedModalProps {}

const FeedPhotosItem = ({ photo, setModalPhoto }: FeedPhotosItemProps) => {
  const handleClick = () => {
    setModalPhoto(photo);
  };

  return (
    <li className={styles.photo} onClick={handleClick}>
      <img src={photo.src} alt={photo.title} />
      <span className={styles.visualizations}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
