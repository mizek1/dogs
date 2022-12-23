import React from 'react';
import { Link } from 'react-router-dom';
import { TOKEN_POST, USER_GET } from '../../api';
import useForm from '../../hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      getUser(token);
    }
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });

      const response = await fetch(url, options);
      const { token } = await response.json();

      window.localStorage.setItem('token', token);

      getUser(token);
    }
  };

  const getUser = async (token: string) => {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);
    const json = await response.json();
  };

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
