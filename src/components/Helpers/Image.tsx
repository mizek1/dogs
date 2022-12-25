import React from 'react';
import styles from './Image.module.scss';

const Image = ({ alt, ...props }: React.ComponentPropsWithoutRef<'img'>) => {
  const [skeleton, setSkeleton] = React.useState(true);

  const handleLoad = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLImageElement>) => {
    setSkeleton(false);
    currentTarget.style.opacity = '1';
  };

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  );
};

export default Image;
