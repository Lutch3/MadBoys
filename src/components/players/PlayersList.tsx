import { useEffect, useState } from 'react';

import './PlayersList.css';
import { EventPlayer, Player } from '../../model/models';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useAuthentifiedContext, useEventPlayersContext, usePlayersContext } from '../context/FcMadBoysContext';
import { removePlayer, removeEventPlayer } from '../../service/FcMadBoysService';
import * as Icon from 'react-bootstrap-icons';
import { ModalDeleteDialog } from '../modals/ModalDeleteDialog';

const PlayersList: React.FC = () => {
  const AnswerEnum = { YES: 'Yes', NO: 'No' };

  const [showModal, setShowModal] = useState(false);
  const [player2delete, setPlayer2delete] = useState({id:'',name:''});

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const players = usePlayersContext();
  const eventPlayers = useEventPlayersContext();
  const isAuthentified = useAuthentifiedContext();
  const { setPlayers, setEventPlayers } = useApiContext();
  const playersListGroups = players?.map((player: Player) => (
    <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
      <ListGroup.Item style={{ width: '100%' }} key={player.id}>
        {player.name}
      </ListGroup.Item>
      {isAuthentified && (
        <button onClick={() => deletePlayer(player)}>
          <Icon.Trash />
        </button>
      )}
    </div>
  ));
  useEffect(() => {
    console.log('Rendering PlayersList');
  }, [players]);

  const deletePlayer = (player: any) => {
    setPlayer2delete(player);
    handleShow();
  };

  const handleButtonClicked = (answer: 'Yes' | 'No') => {
    if (answer === AnswerEnum.YES) {
      //cascade delete player => event players
      removeEventPlayersForPlayer(player2delete.id)
      .then(() => {
        removePlayer(player2delete).then(() => {
          let playersArray: any[] = JSON.parse(JSON.stringify(players));
          playersArray = playersArray.filter((item) => item.id !== player2delete.id);
          setPlayers(playersArray);

          let eventPlayersArray: any[] = JSON.parse(JSON.stringify(eventPlayers));
          eventPlayersArray = eventPlayersArray.filter((item:EventPlayer) => item.playerId !== player2delete.id);
          setEventPlayers(eventPlayersArray);
        });
      })
      .catch((e) => console.log(e));
    }
    handleClose();
  };

  const removeEventPlayersForPlayer = async (playerId:string) => {
    let promises:Promise<any>[]=[];
    eventPlayers.filter( (ep) => ep.playerId === playerId).forEach( (ep2remove) => {
      promises.push(removeEventPlayer(ep2remove));
    });
    return Promise.all(promises);
  }

  return (
    <>
      {' '}
      {players && players.length > 0 && <ListGroup> {playersListGroups} </ListGroup>}
      {(!players || players.length === 0) && <span>Please add players</span>}
      <ModalDeleteDialog
        showModal={showModal}
        buttonClickedHandler={handleButtonClicked}
        title={`Deleting Player ${player2delete.name}`}
        bodyText={`Are you sure you want to delete ${player2delete.name}? All related data will be removed!!!`}
      />
    </>
  );
};

export { PlayersList };
