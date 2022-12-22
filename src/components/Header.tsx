import { Link } from 'react-router-dom';
import { ReactComponent as Dogs } from '../assets/dogs.svg';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        <Link className={styles.login} to="/login">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
