import React from 'react';
import { COMMENT_POST } from '../../api';
import { ReactComponent as Enviar } from '../../assets/enviar.svg';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import { Comment } from './types';

interface PhotoCommentsFormProps {
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const PhotoCommentsForm = ({ id, setComments }: PhotoCommentsFormProps) => {
  const { request, error } = useFetch();
  const [comment, setComment] = React.useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const token = window.localStorage.getItem('token');
    if (token) {
      const { url, options } = COMMENT_POST(token, { id, comment });
      const { response, json } = await request(url, options);
      if (response && response.ok) {
        setComment('');
        setComments((comments) => [...comments, json as Comment]);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Comente..."
        name="comment"
        id="comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
