import React from 'react';
import { VictoryBar, VictoryChart, VictoryPie } from 'victory';
import { UserStatsData } from './UserStats';
import styles from './UserStatsGraph.module.scss';

interface UserStatsGraphProps {
  data: UserStatsData[];
}

const UserStatsGraph = ({ data }: UserStatsGraphProps) => {
  const [graph, setGraph] = React.useState<any>();
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    const graphData = data.map((value) => {
      return {
        x: value.title,
        y: Number(value.acessos),
      };
    });
    setGraph(graphData);

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, c) => a + c)
    );
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryChart>
          <VictoryBar data={graph} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraph;
