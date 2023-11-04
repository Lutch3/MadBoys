import { memo, useEffect, useState } from 'react';

import './AddPlayer.css';
import { useApiContext, usePlayersContext } from '../context/FcMadBoysContext';
import { Player } from '../../model/models';
import { addPlayer } from '../../service/FcMadBoysService';

const AddPlayer: React.FC = memo(() => {
  const [name, setName] = useState('');
  const players = usePlayersContext();
  const { setPlayers } = useApiContext();

  useEffect(() => {
    console.log('Rendering AddPlayer');
  });

  const addPlayerClickHandler = () => {
    if (name) {
      let playerToAdd: Player = { name: name };
      //write the player to the DB
      addPlayer(playerToAdd).then((addedPlayer) => {
        //refresh the collection
        let playersArray: any[] = JSON.parse(JSON.stringify(players));
        playersArray.push(addedPlayer);
        setPlayers(playersArray);
        setName('');
      });
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <span style={{ paddingRight: '5px' }} className="">
          Name
        </span>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        <button style={{ marginLeft: '5px' }} onClick={addPlayerClickHandler}>
          Add
        </button>
      </div>
    </>
  );
});

export { AddPlayer };
