import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_RESET_POST } from '../../api';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm('password');
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET_POST({
        login,
        key,
        password: password.value,
      });

      const { response } = await request(url, options);

      if (response && response.ok) navigate('/login');
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Resetar senha" description="Página de reset de senha." />
      <h1 className="title">Resetar senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="new_password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
        {error && <Error error={error} />}
      </form>
    </section>
  );
};

export default LoginPasswordReset;
