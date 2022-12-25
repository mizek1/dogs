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
  const { login } = React.useContext(UserContext);

  return (
    <>
      <ul className={styles.comments}>
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
