import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
};

export default Header;
