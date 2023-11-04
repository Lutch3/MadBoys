import { memo, useEffect, useState } from 'react';

import { useApiContext, useTeamsContext } from '../context/FcMadBoysContext';
import { Player } from '../../model/models';
import { addTeam as addTeam } from '../../service/FcMadBoysService';

const AddTeam: React.FC = memo(() => {
  const [name, setName] = useState('');
  const teams = useTeamsContext();
  const { setTeams } = useApiContext();

  useEffect(() => {
    console.log('Rendering AddTeam');
  });

  const addTeamClickHandler = () => {
    if (name) {
      let teamToAdd: Player = { name: name };
      //write the player to the DB
      addTeam(teamToAdd).then((addedTeam) => {
        console.log(addedTeam);
        //refresh the collection
        let teamsArray: any[] = JSON.parse(JSON.stringify(teams));
        teamsArray.push(addedTeam);
        setTeams(teamsArray);
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
        <button style={{ marginLeft: '5px' }} onClick={addTeamClickHandler}>
          Add
        </button>
      </div>
    </>
  );
});

export { AddTeam };
