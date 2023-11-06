import { memo, useEffect } from 'react';

import './AddEvent.css';
import { useApiContext, useEventsContext, useTeamsContext } from '../context/FcMadBoysContext';
import { Event, Team } from '../../model/models';
import { addEvent } from '../../service/FcMadBoysService';
import { Form } from 'react-bootstrap';

const AddEvent: React.FC = memo(() => {
  const events = useEventsContext();
  const teams = useTeamsContext();
  const { setEvents } = useApiContext();

  let selectedHomeTeamId: string | null | undefined = null;
  let selectedAwayTeamId: string | null | undefined = null;
  let homeTeamScore:number = 0;
  let awayTeamScore:number = 0;
  let dateString:string = '';

  useEffect(() => {
    console.log('Rendering AddEvents');
    homeTeamScore = 0;
    awayTeamScore = 0;
    dateString = '';
  }, [teams]);

  const createTeamOptions = () => {
    let items: any[] = [];
    items.push(<option selected key={Math.random()} value={''}></option>);
    if (teams && teams.length > 0) {
      teams.forEach((team: Team) => {
        items.push(
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        );
      });
    }
    return items;
  };

  const addEventClickHandler = () => {
    console.log (dateString, selectedHomeTeamId , selectedAwayTeamId , awayTeamScore , homeTeamScore); 
    if (dateString && selectedHomeTeamId && selectedAwayTeamId) {
      let eventToAdd: Event = { date: dateString
                              , homeTeamId: selectedHomeTeamId
                              , homeTeamScore:homeTeamScore
                              , awayTeamId: selectedAwayTeamId 
                              , awayTeamScore:awayTeamScore 
                            };
      addEvent(eventToAdd).then((addedEvent: any) => {
        //refresh the collection
        let eventsArray: any[] = JSON.parse(JSON.stringify(events));
        eventsArray.unshift(addedEvent);
        setEvents(eventsArray);
      });
    }
  };

  const onHomeTeamChangeHandler = (e: any) => {
    selectedHomeTeamId = e.target.value;
  };
  const onAwayTeamChangeHandler = (e: any) => {
    selectedAwayTeamId = e.target.value;
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ paddingRight: '5px' }}>Date</span>
        <input
          type="date"
          onChange={(e) => { dateString = e.target.value;} }
          style={{paddingRight:'10px'}}
        ></input>
        <span style={{ paddingLeft:'5px', paddingRight: '5px' }}>Teams :</span>
        <Form.Select aria-label="Default select example" style={{ width: '300px' }} onChange={onHomeTeamChangeHandler}>
          {createTeamOptions()}
        </Form.Select>
        <div  style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <input style={{ textAlign:'center', width:'50px'}} defaultValue={0} type="number" min="0" onChange={ (event) => homeTeamScore = parseInt(event.target.value)}></input>
        </div>
        <span style={{ paddingLeft: '10px', paddingRight: '5px' }}> vs </span>
        <div  style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <input style={{textAlign:'center', width:'50px'}} defaultValue={0} type="number" min="0" onChange={ (event) => awayTeamScore = parseInt(event.target.value)}></input>
        </div>
        <Form.Select aria-label="Default select example" style={{ width: '300px' }} onChange={onAwayTeamChangeHandler}>
          {createTeamOptions()}
        </Form.Select>
        <button style={{ marginLeft: '5px' }} onClick={addEventClickHandler}>
          Add
        </button>
      </div>
    </>
  );
});

export { AddEvent };
