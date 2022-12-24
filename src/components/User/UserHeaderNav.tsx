import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as AdicionarFoto } from '../../assets/adicionar.svg';
import { ReactComponent as Estatisticas } from '../../assets/estatisticas.svg';
import { ReactComponent as MinhasFotos } from '../../assets/feed.svg';
import { ReactComponent as Sair } from '../../assets/sair.svg';
import UserContext from '../../UserContext';
import styles from './UserHeaderNav.module.scss';

const UserHeaderNav = () => {
  const [mobile, setMobile] = React.useState(false);
  const { userLogout } = React.useContext(UserContext);

  return (
    <nav className={styles.nav}>
      <NavLink to="/conta" end>
        <MinhasFotos /> {mobile && 'Minhas Fotos'}
      </NavLink>
      <NavLink to="/conta/estatisticas">
        <Estatisticas /> {mobile && 'Estatísticas'}
      </NavLink>
      <NavLink to="/conta/postar">
        <AdicionarFoto /> {mobile && 'Adicionar Foto'}
      </NavLink>
      <button onClick={userLogout}>
        <Sair />
        {mobile && 'Sair'}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
