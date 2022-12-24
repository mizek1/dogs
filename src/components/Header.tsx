import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Dogs } from '../assets/dogs.svg';
import UserContext from '../UserContext';
import styles from './Header.module.scss';

const Header = () => {
  const { userData } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {userData ? (
          <Link className={styles.login} to="/conta">
            {userData.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
