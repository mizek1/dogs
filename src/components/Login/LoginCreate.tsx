import React, { useContext } from 'react';
import { USER_POST } from '../../api';
import useForm from '../../hooks/useForm';
import UserContext from '../../UserContext';
import Button from '../Forms/Button';
import Input from '../Forms/Input';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const { userLogin } = useContext(UserContext);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      password: password.value,
      email: email.value,
    });
    const response = await fetch(url, options);
    if (response.ok) userLogin(username.value, password.value);
  };

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="E-mail" type="email" name="username" {...email} />
        <Input label="Senha" type="password" name="username" {...password} />
        <Button>Cadastrar</Button>
      </form>
    </section>
  );
};

export default LoginCreate;
