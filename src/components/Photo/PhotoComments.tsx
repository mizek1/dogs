import React from 'react';
import UserContext from '../../UserContext';
import styles from './PhotoComments.module.scss';
import PhotoCommentsForm from './PhotoCommentsForm';
import { Comment } from './types';

interface PhotoCommentsProps {
  id: number;
  comments: Comment[];
}

const PhotoComments = (props: PhotoCommentsProps) => {
  const [comments, setComments] = React.useState<Comment[]>(
    () => props.comments
  );
  const commentsSection = React.useRef<HTMLUListElement | null>(null);
  const { login } = React.useContext(UserContext);

  React.useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul ref={commentsSection} className={styles.comments}>
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm id={props.id} setComments={setComments} />}
    </>
  );
};

export default PhotoComments;
