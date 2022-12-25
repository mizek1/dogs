import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserContext from '../../UserContext';
import Head from '../Helpers/Head';
import NotFound from '../NotFound';
import styles from './Login.module.scss';
import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login) {
    return <Navigate to="/conta" />;
  }

  return (
    <section className={styles.login}>
      <Head title="Login" description="Página de login." />
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="criar" element={<LoginCreate />}></Route>
          <Route path="perdeu" element={<LoginPasswordLost />}></Route>
          <Route path="resetar" element={<LoginPasswordReset />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </section>
  );
};

export default Login;
