import { PASSWORD_LOST_POST } from '../../api';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, error, loading, request } = useFetch<string>();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST_POST(login.value);
      await request(url, options);
    }
  };

  return (
    <section>
      <Head
        title="Esqueci a senha"
        description="Esqueceu a senha? Recupere aqui."
      />

      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar e-mail</Button>
          )}
          {error && <Error error={error} />}
        </form>
      )}
    </section>
  );
};

export default LoginPasswordLost;
