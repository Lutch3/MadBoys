import { memo, useEffect } from 'react';

import { useEventPlayersContext, usePlayersContext } from '../context/FcMadBoysContext';
import { EventPlayer } from '../../model/models';

const Ranking: React.FC = memo(() => {
  const eventPlayers = useEventPlayersContext();
  const players = usePlayersContext();

  useEffect(() => {
    console.log('Rendering Ranking');
  }, [eventPlayers]);

  const calculateRankingRows = () => {
    const rankingMap = new Map();

    eventPlayers.forEach((eventPlayer:EventPlayer) => {
      const { playerId, hasYellowCard, hasRedCard, isDelegue, isCaptain, goals } = eventPlayer;

      if (!rankingMap.has(playerId)) {
        rankingMap.set(playerId, {
          playerId: playerId,
          games: 0,
          goals: 0,
          delegue:0,
          yellowCard:0,
          redCard:0,
        });
      }

      const playerData = rankingMap.get(playerId);
      playerData.games++;
      playerData.goals += goals;

      if (hasYellowCard) {
        playerData.yellowCard++;
      }
      if (hasRedCard) {
        playerData.redCard++;
      }
      if (isDelegue) {
        playerData.delegue++;
        playerData.games--;
      }

      playerData.ratio = 0;
      if (playerData.games !== 0)
        playerData.ratio = parseFloat(((playerData.goals / playerData.games)*100).toFixed(1));

      rankingMap.set(playerId, playerData);
    });

    const rankingArray = Array.from(rankingMap.values());
    return rankingArray
      .sort((a: any, b: any) => {
        if (a.ratio > b.ratio) return -1;
        else if (a.ratio < b.ratio) return 1;
        return 0;
      })
      .map((ranking, index) => {
        const eventPlayer = players.find((p) => p.id === ranking.playerId);
        let position = 0;
        position++;
        return (
          <tr key={ranking.playerId}>
            <td>{index+1}</td>
            <td>{eventPlayer?.name}</td>
            <td>{ranking.games}</td>
            <td>{ranking.goals}</td>
            <td>{ranking.yellowCard}</td>
            <td>{ranking.redCard}</td>
            <td>{ranking.delegue}</td>
            <td>{ranking.ratio} %</td>
          </tr>
        );
      });
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Games#</th>
            <th scope="col">Goals#</th>
            <th scope="col">Yellow Card#</th>
            <th scope="col">Red Card#</th>
            <th scope="col">Delegue#</th>
            <th scope="col">Ratio Games/Goals</th>
          </tr>
        </thead>
        <tbody>{calculateRankingRows()}</tbody>
      </table>
    </>
  );
});

export { Ranking };
