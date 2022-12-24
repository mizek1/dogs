import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './UserHeader.module.scss';
import UserHeaderNav from './UserHeaderNav';

const Locations = {
  '/conta': 'Minha conta',
  '/conta/estatisticas': 'Estatísticas',
  '/conta/postar': 'Adicionar foto',
};

const UserHeader = () => {
  const [title, setTitle] = React.useState('');
  const location = useLocation();

  React.useEffect(() => {
    setTitle(Locations[location.pathname as keyof typeof Locations]);
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
