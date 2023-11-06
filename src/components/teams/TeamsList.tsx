import { memo, useEffect, useState } from 'react';

import {  Team } from '../../model/models';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useAuthentifiedContext, useEventsContext, useTeamsContext } from '../context/FcMadBoysContext';
import { removeTeam } from '../../service/FcMadBoysService';
import * as Icon from 'react-bootstrap-icons';
import { ModalDeleteDialog } from '../modals/ModalDeleteDialog';

const TeamsList: React.FC = memo(() => {
  const AnswerEnum = { YES: 'Yes', NO: 'No' };

  const [showModal, setShowModal] = useState(false);
  const [team2delete, setTeam2delete] = useState({ id: '', name: '' });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const teams = useTeamsContext();
  const events = useEventsContext();
  const { setTeams } = useApiContext();
  const isAuthentified = useAuthentifiedContext();

  const teamsListGroups = teams?.map((team: Team) => (
    <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
      <ListGroup.Item style={{ width: '100%' }} key={team.id}>
        {team.name}
      </ListGroup.Item>
      {isAuthentified && (
        <button onClick={() => deleteTeam(team)}>
          <Icon.Trash />
        </button>
      )}
    </div>
  ));
  useEffect(() => {
    console.log('Rendering TeamsList');
  }, [teams]);

  const deleteTeam = (team: any) => {
    setTeam2delete(team);
    handleShow();
  };

  const handleButtonClicked = (answer: 'Yes' | 'No') => {
    if (answer === AnswerEnum.YES) {
      
      if (!checkExistsEventForTeam(team2delete.id)){
        removeTeam(team2delete).then(() => {
          let teamsArray: any[] = JSON.parse(JSON.stringify(teams));
          teamsArray = teamsArray.filter((item) => item.id !== team2delete.id);
          setTeams(teamsArray);
        });
      }else{
        console.log('Cannot Delete Team because it is linked to Event data!!!')
      }
    }
    handleClose();
  };

  const checkExistsEventForTeam = (teamId:string):boolean => {
    let exist = false;
    events.forEach( (event:any) => {
      if (event.homeTeamId === teamId || event.awayTeamId === teamId)
      exist = true;
    return exist;
  })
  return exist;
  }

  return (
    <>
      {' '}
      {teams && teams.length > 0 && <ListGroup> {teamsListGroups} </ListGroup>}
      {(!teams || teams.length === 0) && <span>Please add teams</span>}
      <ModalDeleteDialog
        showModal={showModal}
        buttonClickedHandler={handleButtonClicked}
        title={`Deleting Team ${team2delete.name}`}
        bodyText={`Are you sure you want to delete ${team2delete.name}? All related data will be removed!!!`}
      />
    </>
  );
});

export { TeamsList };
