import { memo, useEffect } from 'react';

import './EventsList.css';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useAuthentifiedContext, useEventPlayersContext, useEventsContext, useTeamsContext, usePlayersContext } from '../context/FcMadBoysContext';
import { removeEvent } from '../../service/FcMadBoysService';
import { AddEventPlayer } from '../EventPlayer/AddEventPlayer';
import { EventPlayersList } from '../EventPlayer/EventPlayersList';
import * as Icon from 'react-bootstrap-icons';
import { Event, EventPlayer, Player } from '../../model/models';

interface EventsListProps {
  readOnly: boolean;
}

const EventsList: React.FC<EventsListProps> = memo(({ readOnly }: EventsListProps) => {
  const events = useEventsContext();
  const eventPlayers = useEventPlayersContext();
  const teams = useTeamsContext();
  const players = usePlayersContext();
  const isAuthentified = useAuthentifiedContext();
  const { setEvents } = useApiContext();

  const getTeamsScore = (event:Event) => {
    const homeTeam = teams.find((g) => g.id === event.homeTeamId)?.name;
    const awayTeam = teams.find((g) => g.id === event.awayTeamId)?.name;

    return homeTeam + ' ' + event.homeTeamScore +  ' vs '  +  event.awayTeamScore + ' ' +  awayTeam;
  }

  const getTeams = (event:Event) => {
    const homeTeam = teams.find((g) => g.id === event.homeTeamId)?.name;
    const awayTeam = teams.find((g) => g.id === event.awayTeamId)?.name;

    return homeTeam + ' vs ' +  awayTeam;
  }
  const getScores = (event:Event) => {
    return event.homeTeamScore +  ' - '  +  event.awayTeamScore;
  }

  const eventsListGroups = readOnly
    ? []
    : events?.map((event: any) => {
        const dateString = new Date(event.date).toDateString();
        return (
          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc', padding: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <ListGroup.Item style={{ width: '100%' }} key={event.id}>
                {dateString} - {getTeamsScore(event)}  
              </ListGroup.Item>
              {isAuthentified && (
                <button onClick={() => deleteEvent(event)}>
                  <Icon.Trash />
                </button>
              )}
            </div>
            {isAuthentified && <AddEventPlayer eventId={event.id} />}
            <div style={{ paddingTop: '5px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
              <EventPlayersList eventId={event.id} />
            </div>
          </div>
        );
      });
  useEffect(() => {
    console.log('Rendering EventsList');
  }, [events]);

  const deleteEvent = (event: any) => {
    removeEvent(event).then(() => {
      let eventsArray: any[] = JSON.parse(JSON.stringify(events));
      eventsArray = eventsArray.filter((item) => item.id !== event.id);
      setEvents(eventsArray);
    });
  };

  const constructPlayerDivs = (players:any) => {
    return players.sort((a:any,b:any)=> (a.name).localeCompare(b.name) ).map( (p:any) => 
      <div style={{ margin:'5px', border: '1px solid grey',borderRadius: '15px', padding: '5px'}}>
        <span style={{textAlign:'center', paddingRight:'5px'}}> {p?.name} {p?.goals > 0 ? '(' + p.goals + ')': ''} </span>
        {
          p?.hasYellowCard &&
          <Icon.PersonBadgeFill style={{color:'#e1cf32'}}/>
        }
        {
          p?.hasRedCard &&
          <Icon.PersonBadgeFill style={{color:'red'}}/>
        }
      </div>
      )
    }

  const calculateEventRows = () => {
    const listOfEvents:any[] = [];
    events.forEach( (value:any) => {
      const date = new Date(value.date);
      const row:any = { id: value.id
                  , date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
                  , teams: getTeams(value)
                  , score: getScores(value)
                  }
      console.log(eventPlayers.filter( (ep:EventPlayer) => ep.eventId === value.id ));
      row['players'] = eventPlayers.filter( (ep:EventPlayer) => ep.eventId === value.id ).map( (eventPlayer) => 
        {
          let mappedPlayer:any = {};
          const playerFromDb:Player|undefined = players.find((aPlayer:Player) => aPlayer.id === eventPlayer.playerId);
          mappedPlayer.name = playerFromDb?.name;
          mappedPlayer.id = playerFromDb?.id;
          if (eventPlayer.playerId === mappedPlayer.id){
            mappedPlayer.isDelegue = eventPlayer.isDelegue;
            mappedPlayer['goals'] = eventPlayer.goals;
            mappedPlayer['hasRedCard'] = eventPlayer.hasRedCard;
            mappedPlayer['hasYellowCard'] = eventPlayer.hasYellowCard;
          }
          return mappedPlayer;
        }
      );
      listOfEvents.push(row);
    });

    return listOfEvents.map((event, index) => {
      return (
        <tr key={event.id}>
          <td>{index+1}</td>
          <td >{event.date}</td>
          <td ><div style={{display:'flex', flexDirection:'column'}}>
                <span>{event.teams}</span>
                <span>{event.score}</span>
              </div></td>
          <td style={{width:'50%'}}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', flexWrap:'wrap' }}>
                { constructPlayerDivs(event.players.filter((p:EventPlayer) => !p.isDelegue)) }
              </div>
          </td>
          <td>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', flexWrap:'wrap' }}>
                { constructPlayerDivs(event.players.filter((p:EventPlayer) => p.isDelegue)) }
              </div>
          </td>
        </tr>
      );
    });
  };

  if (!readOnly) {
    return (
      <>
        {events && events.length > 0 && <ListGroup> {eventsListGroups} </ListGroup>}

        {(!events || events.length === 0) && <span>Please add Events</span>}
      </>
    );
  } else {
    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Match</th>
              <th scope="col">Players</th>
              <th scope="col">Delegue</th>
            </tr>
          </thead>
          <tbody>{calculateEventRows()}</tbody>
        </table>
      </>
    );
  }
});

export { EventsList };
