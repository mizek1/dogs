import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PHOTO_POST } from '../../api';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helpers/Error';
import styles from './UserPhotoPost.module.scss';

interface ImageType {
  raw: File;
  preview: string;
}

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [image, setImage] = React.useState<ImageType | null>(null);
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('img', image.raw);
    }
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');

    if (token) {
      const { url, options } = PHOTO_POST(token, formData);
      request(url, options);
    }
  };

  const handleImgChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>) => {
    if (currentTarget.files) {
      setImage({
        raw: currentTarget.files[0],
        preview: URL.createObjectURL(currentTarget.files[0]),
      });
    }
  };

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className={styles.imgInput}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {image?.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${image.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
