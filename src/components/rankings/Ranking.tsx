import { useEffect, useState } from 'react';

import { useEventPlayersContext, usePlayersContext } from '../context/FcMadBoysContext';
import { EventPlayer } from '../../model/models';
import { RankingColumnSort } from './RankingColumnSort';
import { useAtomValue } from 'jotai';
import { selectedSeasonAtom } from '../../stores/MadboysStore';

const Ranking: React.FC = (() => {
  const eventPlayers = useEventPlayersContext();
  const players = usePlayersContext();
  const selectedSeason = useAtomValue(selectedSeasonAtom);

  const [rankingRows, setRankingRows] = useState<any[]>([]);

  let rankingArray:any[] = [];
  let filteredEventPlayers:any[];

  useEffect(() => {
    filteredEventPlayers = eventPlayers.filter((ep) => ep.season === selectedSeason);
    calculateRankingRows('ratio','Asc');
  }, [eventPlayers, selectedSeason]);

  const createRankingArray = () => {
    const rankingMap = new Map();
    filteredEventPlayers.forEach((eventPlayer:EventPlayer) => {
      const { playerId, hasYellowCard, hasRedCard, isDelegue, goals } = eventPlayer;

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

    return Array.from(rankingMap.values());
  }

  const calculateRankingRows = (prop:string,sortDirection:'Asc'|'Desc') => {
    rankingArray = createRankingArray();
    const sortCompareFunction = getSortCompareFunction(prop,sortDirection);
    rankingArray.sort(sortCompareFunction);
    const _rankingRows:any[] = rankingArray.map( (ranking, index) => {
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
    })
    setRankingRows(_rankingRows);
  };

  const getSortCompareFunction = (property:string, sortDirection:'Asc'|'Desc') => {
    return (a: any, b: any) => {
      if (a[property] > b[property]) return sortDirection === 'Asc' ? -1 : 1;
      else if (a[property] < b[property]) return sortDirection === 'Asc' ? 1 : -1;
      return 0;
    }
  }

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <span>#Games</span>
              <RankingColumnSort property={'games'} callbackFunction={calculateRankingRows}/>
              </div>
            </th>
            <th scope="col">
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <span>#Goals</span>
              <RankingColumnSort property={'goals'} callbackFunction={calculateRankingRows}/>
              </div>
            </th>
            <th scope="col">
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <span>#Yellow Cards</span>
              <RankingColumnSort property={'yellowCard'} callbackFunction={calculateRankingRows}/>
              </div>
            </th>
            <th scope="col">
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <span>#Red Cards</span>
              <RankingColumnSort property={'redCard'} callbackFunction={calculateRankingRows}/>
              </div>
            </th>
            <th scope="col">
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <span>#Delegue</span>
              <RankingColumnSort property={'delegue'} callbackFunction={calculateRankingRows}/>
              </div>
            </th>
            <th scope="col">
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <span>Ratio Games/Goals</span>
              <RankingColumnSort property={'ratio'} callbackFunction={calculateRankingRows}/>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{rankingRows}</tbody>
      </table>
    </>
  );
});

export { Ranking };
