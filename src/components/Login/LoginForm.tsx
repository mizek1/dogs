import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import UserContext from '../../UserContext';
import Button from '../Forms/Button';
import stylesBtn from '../Forms/Button.module.scss';
import Input from '../Forms/Input';
import Error from '../Helpers/Error';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { userLogin, error, loading } = React.useContext(UserContext);

  const username = useForm();
  const password = useForm();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Usuário ou senha incorretos.'} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
