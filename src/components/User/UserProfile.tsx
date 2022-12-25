import { useParams } from 'react-router-dom';
import Feed from '../Feed/Feed';
import Head from '../Helpers/Head';

const UserProfile = () => {
  const { user } = useParams();

  return (
    <section className="container mainContainer">
      <Head title={user || ''} description="Página do usuário." />
      <h1 className="title">{user}</h1>
      {user ? <Feed user={user} /> : <p>Não há postagens.</p>}
    </section>
  );
};

export default UserProfile;
