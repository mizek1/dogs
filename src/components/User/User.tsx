import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserContext from '../../UserContext';
import Feed from '../Feed/Feed';
import Head from '../Helpers/Head';
import NotFound from '../NotFound';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

const User = () => {
  const { userData } = React.useContext(UserContext);

  return (
    <section className="container">
      <Head title="Minha Conta" description="Página do usuário" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={userData?.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
