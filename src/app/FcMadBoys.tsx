import { Ranking } from '../components/Ranking/Ranking';
import { useApiContext, useAuthentifiedContext, useContinuedAsGuestContext } from '../components/context/FcMadBoysContext';
import { AddEvent } from '../components/events/AddEvent';
import { EventsList } from '../components/events/EventsList';
import { AddTeam } from '../components/teams/AddTeam';
import { TeamsList } from '../components/teams/TeamsList';
import { AddPlayer } from '../components/players/AddPlayer';
import { PlayersList } from '../components/players/PlayersList';
import { Login } from '../components/Login/Login';
import * as Icon from 'react-bootstrap-icons';
import { logout } from '../service/FcMadBoysService';
import { Image } from 'react-bootstrap';

export const FcMadBoys: React.FC = () => {
  const isAuthentified = useAuthentifiedContext();
  const hasContinuedAsGuest = useContinuedAsGuestContext();
  const { setIsAuthentified, setHasContinuedAsGuest } = useApiContext();

  const doLogout = () => {
    logout().then(() => {
      console.log('Signed out successfully');
      setIsAuthentified(false);
      setHasContinuedAsGuest(false);
    });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="./src/assets/madLogo.jpg" class="logo" style={{width:'auto', height:'auto'}}/>
        <h3>FC Mad Boys</h3>
        {isAuthentified && (
          <span style={{ width: '25px' }} className="logout" onClick={doLogout}>
            Logout
          </span>
        )}
        {!isAuthentified && hasContinuedAsGuest && (
          <span style={{ width: '25px' }} className="logout" onClick={() => {setHasContinuedAsGuest(false); setIsAuthentified(false) }}>
            Login
          </span>
        )}
      </div>

      {(!isAuthentified && !hasContinuedAsGuest) && <Login />}

      {(isAuthentified || hasContinuedAsGuest) && 
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
            <div style={{ margin: '5px' }} className="card">
              <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <h2>Player's Stats</h2>
                <Icon.Award size={40} style={{ paddingLeft: '5px' }} />
              </div>
              <Ranking />
            </div>
            { isAuthentified &&
            <div style={{ margin: '5px', height: '525px' }} className="card">
              <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <h2>Players</h2>
                <Icon.Person size={40} style={{ paddingLeft: '5px' }} />
              </div>
              {isAuthentified && <AddPlayer />}
              <div style={{ paddingTop: '5px', height: 'auto', overflowY: 'scroll' }}>
                <PlayersList />
              </div>
            </div>
            }
            {isAuthentified && 
            <div style={{ margin: '5px', height: '525px' }} className="card">
              <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <h2>Teams</h2>
                <Icon.Flag size={40} style={{ paddingLeft: '5px' }} />
              </div>
              {isAuthentified && <AddTeam />}
              <div style={{ paddingTop: '5px', height: 'auto', overflowY: 'scroll' }}>
                <TeamsList />
              </div>
            </div>
          }
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
            <div style={{ margin: '5px', width: '100%' }} className="card">
              <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <h2>Events</h2>
                <Icon.Calendar size={40} style={{ paddingLeft: '5px' }} />
              </div>
              {isAuthentified && <AddEvent />}
              <div style={{ paddingTop: '5px' }}>
                <EventsList readOnly={!isAuthentified}/>
              </div>
            </div>
          </div>
        </div>
      }
      <p style={{marginTop:'25px'}}className="read-the-docs">Created by Lutch ^^</p>
    </>
  );
};
