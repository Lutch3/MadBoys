import { Ranking } from '../components/ranking/Ranking';
import { useApiContext, useAuthentifiedContext } from '../components/context/FcMadBoysContext';
import { AddEvent } from '../components/events/AddEvent';
import { EventsList } from '../components/events/EventsList';
import { AddTeam } from '../components/teams/AddTeam';
import { TeamsList } from '../components/teams/TeamsList';
import { AddPlayer } from '../components/players/AddPlayer';
import { PlayersList } from '../components/players/PlayersList';
import { Login } from '../components/Login/Login';
import * as Icon from 'react-bootstrap-icons';
import { logout } from '../service/FcMadBoysService';
import logo from '../assets/madLogo.jpg';
import oneUp from '../assets/oneUp.png';

export const FcMadBoys: React.FC = () => {
  const isAuthentified = useAuthentifiedContext();
  const { setIsAuthentified } = useApiContext();

  const doLogout = () => {
    logout().then(() => {
      console.log('Signed out successfully');
      setIsAuthentified(false);
    });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img src={oneUp} className="logo" style={{ marginRight: '10px', width: '100px', height: '100px' }} />
          <div>
            <img src={logo} className="logo" style={{ width: 'auto', height: 'auto' }} />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
              <h3>FC Mad Boys</h3>
              <a href="https://www.instagram.com/mad.boys.fc/" style={{ marginLeft:'10px'}}><Icon.Instagram  style={{  width:'20px', height:'20px',color:'black'}}/></a>
            </div>
          </div>
          <img src={oneUp} className="logo" style={{ marginLeft: '10px', width: '100px', height: '100px' }} />
        </div>
        {isAuthentified && (
          <span style={{ width: '25px' }} className="logout" onClick={doLogout}>
            Logout
          </span>
        )}
      </div>

      {!isAuthentified && <Login />}

      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
          <div style={{ margin: '5px' }} className="card">
            <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
              <h2>Player's Stats</h2>
              <Icon.Award size={40} style={{ paddingLeft: '5px' }} />
            </div>
            <Ranking />
          </div>
          {isAuthentified && (
            <div style={{ margin: '5px', width:'300px', height: '525px' }} className="card">
              <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <h2>Players</h2>
                <Icon.Person size={40} style={{ paddingLeft: '5px' }} />
              </div>
              {isAuthentified && <AddPlayer />}
              <div style={{ paddingTop: '5px', height: 'auto', overflowY: 'scroll' }}>
                <PlayersList />
              </div>
            </div>
          )}
          {isAuthentified && (
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
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
          <div style={{ margin: '5px', width: '100%' }} className="card">
            <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
              <h2>Events</h2>
              <Icon.Calendar size={40} style={{ paddingLeft: '5px' }} />
            </div>
            {isAuthentified && <AddEvent />}
            <div style={{ paddingTop: '5px' }}>
              <EventsList readOnly={!isAuthentified} />
            </div>
          </div>
          <div style={{ margin: '5px', width: '100%', height: '600px' }} className="card">
            <div style={{ textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
              <h2>BZVC : Classement</h2>
              <iframe style={{ width: '100%', height: '100%' }} src={'https://www.bzvc.be/index.php?kind=klassement&reeks=1'} />
            </div>
          </div>
        </div>
      </div>
      <p style={{ marginTop: '25px' }} className="read-the-docs">
        Created by Lutch ^^
      </p>
    </>
  );
};
