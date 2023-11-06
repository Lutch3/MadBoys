import { memo, useEffect } from 'react';

import './EventPlayersList.css';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useAuthentifiedContext, useEventPlayersContext, usePlayersContext } from '../context/FcMadBoysContext';
import { removeEventPlayer, updateEventPlayer } from '../../service/FcMadBoysService';
import * as Icon from 'react-bootstrap-icons';
import { EventPlayer } from '../../model/models';

interface AddEventPlayerProps {
  eventId: string;
}

const EventPlayersList: React.FC<AddEventPlayerProps> = memo(({ eventId }: AddEventPlayerProps) => {
  const eventPlayers = useEventPlayersContext();
  const players = usePlayersContext();
  const isAuthentified = useAuthentifiedContext();
  const { setEventPlayers } = useApiContext();

  const eventPlayersListGroups = eventPlayers?.filter((ep) => ep.eventId === eventId).map((eventPlayer: any) => {
      const player = players.find((p) => p.id === eventPlayer.playerId);
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <ListGroup.Item id={'ListGroup' + eventPlayer.id} style={{ width: '100%' }} key={eventPlayer.id}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <span style={{width:'125px'}}> {player?.name} </span>
              <div  style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <span>Goals</span>
                <input style={{marginLeft:'5px',width:'35px', textAlign:'center'}} value={eventPlayer.goals} type="number" min="0" onChange={(event) => updateEventPlayerGoals(eventPlayer, parseInt(event.target.value))}></input>
              </div>
              <div  style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Icon.PersonBadgeFill style={{marginRight:'5px',color:'#e1cf32'}}/>
                <input title='Yellow Card?' type="checkbox" checked={eventPlayer.hasYellowCard} onChange={(event) => updateEventPlayerYellowCard(eventPlayer, event.target.checked)}></input>
              </div>
              <div  style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Icon.PersonBadgeFill style={{marginRight:'5px',color:'red'}}/>
                <input title='Red Card?' type="checkbox" checked={eventPlayer.hasRedCard} onChange={(event) => updateEventPlayerRedCard(eventPlayer, event.target.checked)}></input>
              </div>
              <div  style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Icon.PersonLock style={{marginRight:'5px'}}/>
                <input title='Delegue?' type="checkbox" checked={eventPlayer.isDelegue} onChange={(event) => updateEventPlayerDelegue(eventPlayer, event.target.checked)}></input>
              </div>
            </div>
          </ListGroup.Item>
          {isAuthentified && <button onClick={() => deleteEventPlayer(eventPlayer)}><Icon.Trash/></button>}
        </div>
      );
    });

  useEffect(() => {
    console.log('Rendering EventPlayersList');
  }, [eventPlayers]);

  const updateEventPlayerGoals = (eventPlayer: EventPlayer, value: any) => {
    eventPlayer.goals = value;
    update(eventPlayer);
  };

  const updateEventPlayerYellowCard = (eventPlayer: EventPlayer, value: boolean) => {
    eventPlayer.hasYellowCard = value;
    update(eventPlayer);
  };

  const updateEventPlayerRedCard = (eventPlayer: EventPlayer, value: boolean) => {
    eventPlayer.hasRedCard = value;
    update(eventPlayer);
  };
  
  const updateEventPlayerDelegue = (eventPlayer: EventPlayer, value: boolean) => {
    eventPlayer.isDelegue = value;
    update(eventPlayer);
  };

  const update = (eventPlayer:EventPlayer) => {
    updateEventPlayer(eventPlayer).then((updatedEventPlayer) => {
      let eventPlayersArray: any[] = JSON.parse(JSON.stringify(eventPlayers));
      setEventPlayers(eventPlayersArray);
    });
  }

  const deleteEventPlayer = (eventPlayer: any) => {
    removeEventPlayer(eventPlayer).then(() => {
      let eventPlayersArray: any[] = JSON.parse(JSON.stringify(eventPlayers));
      eventPlayersArray = eventPlayersArray.filter((item) => item.id !== eventPlayer.id);
      setEventPlayers(eventPlayersArray);
    });
  };

  return (
    <>
      {eventPlayers && eventPlayers.length > 0 && (
        <div style={{ width: '700px' }}>
          <ListGroup> {eventPlayersListGroups} </ListGroup>
        </div>
      )}

      {(!eventPlayers || eventPlayers.length === 0) && <span>Please add Event Players</span>}
    </>
  );
});

export { EventPlayersList };
