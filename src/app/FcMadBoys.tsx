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
import logo from '../assets/madboys.jpg';
import oneUp from '../assets/oneUp.png';
import traiteurTheo from '../assets/traiteurtheo.jpg';
import pps from '../assets/pps.jpg';
import seb from '../assets/SEB.png';
import latinos from '../assets/latinos.png';
import akt from '../assets/akt.jpg';
import topdelice from '../assets/topdelice.jpg';
import { useState } from 'react';
import ReactSelect from 'react-select';
import { useSetAtom } from 'jotai';
import { selectedSeasonAtom } from '../stores/MadboysStore';

export const FcMadBoys: React.FC = () => {
  const isAuthentified = useAuthentifiedContext();
  const { setIsAuthentified } = useApiContext();
  const setSelectedSeason = useSetAtom(selectedSeasonAtom);
  const seasons = [
    {
      seasonNumber : "1",
      seasonName: "2023-2024"
    },
    {
      seasonNumber : "2",
      seasonName: "2024-2025"
    }
  ];

  const options = seasons.map((season, index) => {
    return {
       label: season.seasonName,
       value: season.seasonNumber,
       key: index
    }
  });

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
    
      {/* LOGIN */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
        {isAuthentified && (
          <span style={{ width: '25px' }} className="logout" onClick={doLogout}>
            Logout
          </span>
        )}
        {!isAuthentified && <Login />}
      </div>

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
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <label>Choose a Season:</label>
        <ReactSelect
          onChange={ (e:any) => setSelectedSeason(e.value) }
          options={options}
          defaultValue={options[1]}/>
      </div>
      
      {/* HOME */}
      { selectedNav === Navigations.Home &&
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
          <div style={{ margin: '5px', marginTop:'20px', width:'50%'}} >
            <img src={logo} className="logo" style={{ width: '250px', height: 'auto' }} />
            <p><strong>FC MadBoys</strong> est un <strong>club de football en salle</strong> inscrit à la <a rel="noreferrer noopener" href="https://www.bzvc.be" target="_blank">Brusselse Zaal Voetbal Competitie (BZVC)</a> depuis 2018.</p>
            <p>Suivez nous sur Instagram</p>
            <a href="https://www.instagram.com/mad.boys.fc/" target='_blank'><Icon.Instagram  style={{ marginRight:'5px', width:'50px', height:'50px',color:'black'}}/></a>

            <div style={{ marginTop:'15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', flexWrap:'wrap'}}>
            <h3>Ils nous soutiennent:</h3>
              <div style={{ marginTop:'15px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-around', width: '100%', flexWrap:'wrap'}}>
                <a href='http://se-belgique.com/' target='_blank'>
                  <img src={seb} className="logo" style={{margin:'10px',width: '375px', height: '75px' }} />
                </a>
                <a href='https://aktgin.com/' target='_blank'>
                  <img src={akt} className="logo" style={{margin:'10px',width: '300px', height: '300px' }} />
                </a>
                <a href='https://www.instagram.com/latinosbar.be/' target='_blank'>
                  <img src={latinos} className="logo" style={{margin:'10px',width: '300px', height: '300px' }} />
                </a>
                <a href='https://traiteurtheofanis.com/' target='_blank'>
                  <img src={traiteurTheo} className="logo" style={{margin:'10px', width: '250px', height: '250px' }} />
                </a>
                <a href='https://www.topdelice.com/' target='_blank'>
                  <img src={topdelice} className="logo" style={{margin:'10px', width: '250px', height: 'auto' }} />
                </a>
                <a href='https://one-up-six.vercel.app/' target='_blank'>
                  <img src={oneUp} className="logo" style={{margin:'10px', width: '200px', height: '200px' }} />
                </a>
                <a href='https://www.instagram.com/ppsagency/' target='_blank'>
                  <img src={pps} className="logo" style={{margin:'10px', width: '200px', height: '200px' }} />
                </a>
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
              <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center', justifyContent:'center'}}>
                <img src={logo} className="logo" style={{ width: '100px', height: 'auto' }} />
                <h2>Player's Stats</h2>
                <Icon.Award size={40} style={{ paddingLeft: '5px' }} />
              </div>
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
              <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center', justifyContent:'center'}}>
                  <img src={logo} className="logo" style={{ width: '100px', height: 'auto' }} />
                  <h2>Events</h2>
                  <Icon.Calendar size={40} style={{ paddingLeft: '5px' }} />
              </div>
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
              <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center', justifyContent:'center'}}>
                  <img src={logo} className="logo" style={{ width: '100px', height: 'auto' }} />
                  <h2>BZVC : Classement</h2>
              </div>
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
