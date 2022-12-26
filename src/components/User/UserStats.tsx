import React from 'react';
import { STATS_GET } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';
import Loading from '../Helpers/Loading';
import UserStatsGraph, { UserStatsData } from './UserStatsGraph';

const UserStats = () => {
  const { data, error, loading, request } = useFetch<UserStatsData[]>();

  React.useEffect(() => {
    const getData = async () => {
      const token = window.localStorage.getItem('token');

      if (token) {
        const { url, options } = STATS_GET(token);
        await request(url, options);
      }
    };
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <div>
        <Head title="Estatísticas" description="Estatísticas" />
        {data.length > 0 ? (
          <UserStatsGraph data={data} />
        ) : (
          <p>Usuário ainda não possui estatísticas.</p>
        )}
      </div>
    );
  return null;
};

export default UserStats;
