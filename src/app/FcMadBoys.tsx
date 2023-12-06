import { Ranking } from '../components/rankings/Ranking';
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
import seb from '../assets/SEB.png';
import { useState } from 'react';

export const FcMadBoys: React.FC = () => {
  const isAuthentified = useAuthentifiedContext();
  const { setIsAuthentified } = useApiContext();

  const Navigations = {
    Home: "home",
    Events: "events",
    Ranking: "ranking",
    BZVC: "bzvc",
    Setup: "setup",
  }

  const [selectedNav, setSelectedNav] = useState(Navigations.Home);


  const doLogout = () => {
    logout().then(() => {
      console.log('Signed out successfully');
      setIsAuthentified(false);
    });
  };

  const buttonClikedHandler = (nav:any):undefined => {
    setSelectedNav(nav);
  }

  return (
    <>
      {/* NAVBAR */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginBottom:'10px'}}>
        <button onClick={()=> buttonClikedHandler(Navigations.Home)}>Home</button>  
        <button onClick={()=> buttonClikedHandler(Navigations.Events)}>Events</button>
        <button onClick={()=> buttonClikedHandler(Navigations.Ranking)}>Player Stats</button>
        <button onClick={()=> buttonClikedHandler(Navigations.BZVC)}>BZVC</button>
        { isAuthentified &&
          <button onClick={()=> buttonClikedHandler(Navigations.Setup)}>Setup</button>
        } 
      </div>

      {/* LOGIN */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
            <img src={logo} className="logo" style={{ width: 'auto', height: 'auto' }} />
            <h3>FC Mad Boys</h3>
        {isAuthentified && (
          <span style={{ width: '25px' }} className="logout" onClick={doLogout}>
            Logout
          </span>
        )}

        {!isAuthentified && <Login />}
      </div>
      
      {/* HOME */}
      { selectedNav === Navigations.Home &&
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
          <div style={{ margin: '5px', marginTop:'20px', width:'50%'}} >
            <p><strong>FC MadBoys</strong> est un <strong>club de football en salle</strong> inscrit à la <a rel="noreferrer noopener" href="https://www.bzvc.be" target="_blank">Brusselse Zaal Voetbal Competitie (BZVC)</a> depuis 2018.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Suivez nous sur Instagram</p>
            <a href="https://www.instagram.com/mad.boys.fc/" target='_blank'><Icon.Instagram  style={{ marginRight:'5px', width:'50px', height:'50px',color:'black'}}/></a>

            <div style={{ marginTop:'15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', flexWrap:'wrap'}}>
            <h3>Ils nous soutiennent:</h3>
              <div style={{ marginTop:'15px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-around', width: '100%', flexWrap:'wrap'}}>
                <a href='http://se-belgique.com/' target='_blank'>
                  <img src={seb} className="logo" style={{margin:'10px',width: '375px', height: '75px' }} />
                </a>
                <a href='https://www.one-up.be/' target='_blank'>
                  <img src={oneUp} className="logo" style={{margin:'10px', width: '200px', height: '200px' }} />
                </a>
                {/* <a href='https://www.century21.be/fr/agence/century-21-azur/UVqBaHQBXt-nJTnOiqVM' target='_blank'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 509.5" width="124" style={{margin:'10px', fill: '#beaf87'}}>
                    <path d="M216.5 322.7l47.1-68.1 1.1-1.6c7.5-11.1 11.9-24.4 11.9-38.8 0-5.7-.7-11.2-2-16.4-7.4-30.5-34.8-53.1-67.6-53.1-38.4 0-69.6 31.1-69.6 69.6 0 .9 0 1.7.1 2.6h42.1c-.1-.9-.1-1.7-.1-2.6 0-15.2 12.4-27.5 27.5-27.5s28.3 11.5 27.5 27.5c-.3 7.1-6.5 18-8.9 21.4-2.4 3.4-89.4 129.1-89.4 129.1h119l29.1-42h-67.8zm107.6-178h-.5l-29.1 42h36.6v178.1h42V144.7z"></path>
                    <path d="M337.5 450.7c-26.2 11.1-54 16.7-82.8 16.7s-56.6-5.6-82.8-16.7c-25.3-10.7-48.1-26.1-67.6-45.6-19.5-19.5-34.9-42.3-45.6-67.6-11.1-26.2-16.7-54-16.7-82.8s5.6-56.6 16.7-82.8c10.7-25.3 26.1-48.1 45.6-67.6s42.3-34.9 67.6-45.6C198.1 47.6 226 42 254.7 42s56.6 5.6 82.8 16.7c11.7 5 22.9 10.9 33.5 17.9l24-34.5C354.7 15.5 306.5 0 254.7 0 114 0 0 114 0 254.7s114 254.7 254.7 254.7c54 0 104.1-16.8 145.3-45.5l-23.9-34.5c-12.1 8.4-25 15.6-38.6 21.3z"></path>
                    <path d="M381 362.3c0 .1 0 .2.1.4 0 .1.1.3.2.4.1.1.3.2.5.3.2.1.5.1.8.1h.6c.2 0 .4-.1.5-.1.2-.1.3-.2.4-.3.1-.1.1-.3.1-.5 0-.1 0-.3-.1-.4-.1-.1-.2-.2-.3-.2-.1-.1-.3-.1-.4-.2s-.3-.1-.5-.1l-.8-.2c-.3-.1-.6-.1-.9-.2s-.5-.2-.8-.4c-.2-.2-.4-.4-.5-.6s-.2-.6-.2-1v-.5c0-.2.1-.3.2-.5s.2-.3.3-.5c.1-.2.3-.3.5-.4.2-.1.5-.2.8-.3s.7-.1 1.1-.1c.6 0 1 .1 1.4.3s.7.4.9.6.4.5.5.8.1.5.1.8H384c0-.1 0-.2-.1-.3 0-.1-.1-.3-.2-.4-.1-.1-.3-.2-.5-.3-.2-.1-.5-.1-.8-.1h-.5c-.2 0-.3.1-.4.2l-.3.3c-.1.1-.1.3-.1.4 0 .1 0 .3.1.4.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2.1.3.1l1.8.5c.3.1.5.1.7.2s.4.2.6.4c.2.2.3.3.4.6.1.2.2.5.2.9s-.1.7-.2 1c-.1.3-.3.5-.5.7-.2.2-.4.3-.6.4-.2.1-.4.2-.7.2-.2.1-.4.1-.6.1h-.5c-.7 0-1.2-.1-1.7-.3-.4-.2-.8-.4-1-.6-.2-.3-.4-.5-.5-.8-.1-.3-.1-.6-.1-.8h1.7zm13.1 2.4h-1.5v-6.3l-1.4 6.3h-1.5l-1.4-6.3v6.3h-1.5v-7.5h2.3l1.4 5.9 1.3-5.9h2.3v7.5z"></path>
                  </svg>
                </a> */}
              </div>
            </div>
          </div>
        </div>  
      }
      
      {/* STATS */}
      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
        { selectedNav === Navigations.Ranking &&
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
            <div style={{ margin: '5px' }} className="card">
            <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
              <h2>Player's Stats</h2>
              <Icon.Award size={40} style={{ paddingLeft: '5px' }} />
            </div>
            <Ranking />
          </div>
        </div>  
        }
        
        {/* SETUP */}
        {isAuthentified && selectedNav === Navigations.Setup && 
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
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
        </div>
        }
        
        {/* EVENTS */}
        { selectedNav === Navigations.Events &&
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
        </div>
        }

        {/* BZVC */}
        { selectedNav === Navigations.BZVC &&
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', width:'75%'}}>
          <div style={{ margin: '5px', width: '100%', height: '600px' }} className="card">
            <div style={{ textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
              <h2>BZVC : Classement</h2>
              <iframe style={{ width: '100%', height: '100%' }} src={'https://www.bzvc.be/index.php?kind=klassement&reeks=1'} />
            </div>
          </div>
        </div>
        }
      </div>
      <p style={{ marginTop: '25px' }} className="read-the-docs">
        Created by Lutch ^^
      </p>
    </>
  );
};
