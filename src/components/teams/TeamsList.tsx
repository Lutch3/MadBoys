import { memo, useEffect } from 'react';

import { Team } from '../../model/models';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useAuthentifiedContext, useTeamsContext } from '../context/FcMadBoysContext';
import { removeTeam } from '../../service/FcMadBoysService';
import * as Icon from 'react-bootstrap-icons';

const TeamsList: React.FC = memo(() => {
    const teams = useTeamsContext();
    const { setTeams } = useApiContext();
    const isAuthentified = useAuthentifiedContext();
    const teamsListGroups = teams?.map((team:Team) => 
        <div style={{display:'flex', flexDirection:'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <ListGroup.Item style={{width:'100%'}} key={team.id}>{team.name}</ListGroup.Item>
            {isAuthentified && <button onClick={() => deleteTeam(team)}><Icon.Trash/></button>}
        </div>
    );
    useEffect(() => {
        console.log('Rendering TeamsList');
    }, [teams]);

    const deleteTeam = (team:any) => {
        removeTeam(team).then( () => {
            let teamsArray: any[] = JSON.parse(JSON.stringify(teams));
            teamsArray = teamsArray.filter( (item) => item.id !== team.id );
            setTeams(teamsArray);
        });
    }

    return (
        <>  { teams && teams.length > 0 &&
            <ListGroup > {teamsListGroups} </ListGroup >
            }

            {(!teams || teams.length === 0) && <span>Please add teams</span>}
        </>
    );

    
});



export { TeamsList };
