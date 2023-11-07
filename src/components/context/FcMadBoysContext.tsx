import { createContext, useContext, useReducer, useEffect, useMemo} from 'react';
import { EventPlayer, Team, Player } from '../../model/models';
import { findAll } from '../../service/FcMadBoysService';

const playersContext = createContext<State['players']>([]);
export const usePlayersContext = () => {
  return useContext(playersContext);
};

const teamsContext = createContext<State['teams']>([]);
export const useTeamsContext = () => {
  return useContext(teamsContext);
};

const eventsContext = createContext<State['events']>([]);
export const useEventsContext = () => {
  return useContext(eventsContext);
};

const eventPlayersContext = createContext<State['eventPlayers']>([]);
export const useEventPlayersContext = () => {
  return useContext(eventPlayersContext);
};

const loadingContext = createContext<State['isLoading']>(false);
export const useLoadingContext = () => {
  return useContext(loadingContext);
};

const authentifiedContext = createContext<State['isAuthentified']>(false);
export const useAuthentifiedContext = () => {
  return useContext(authentifiedContext);
};

const apiContext = createContext<{ [key: string]: (...args: any[]) => unknown }>({});
export const useApiContext = () => {
  return useContext(apiContext);
};

type Actions =
  | { type: 'updatePlayers'; players: any }
  | { type: 'updateTeams'; teams: any }
  | { type: 'updateEvents'; events: any }
  | { type: 'updateEventPlayers'; eventPlayers: any }
  | { type: 'updateIsLoading'; isLoading: boolean }
  | { type: 'updateIsAuthentified'; isAuthentified: boolean }

type State = {
  isLoading: boolean;
  isAuthentified: boolean;
  players: Player[];
  teams: Team[];
  events: Event[];
  eventPlayers: EventPlayer[];
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'updateIsLoading':
      return { ...state, isLoading: action.isLoading };
    case 'updateIsAuthentified':
      return { ...state, isAuthentified: action.isAuthentified };
    case 'updatePlayers':
      return { ...state, players: action.players };
    case 'updateTeams':
      return { ...state, teams: action.teams };
    case 'updateEvents':
      return { ...state, events: action.events };
    case 'updateEventPlayers':
      return { ...state, eventPlayers: action.eventPlayers };
  }
};

const playersBaseValue: Player[] = [];
const teamsBaseValue: Team[] = [];
const eventsBaseValue: Event[] = [];
const eventPlayersBaseValue: EventPlayer[] = [];

const initialState: State = {
  isLoading: true,
  isAuthentified: false,
  players: playersBaseValue,
  teams: teamsBaseValue,
  events: eventsBaseValue,
  eventPlayers: eventPlayersBaseValue,
};

export const FcMadBoysProvider = ({ children }: { children: React.ReactNode }) => {
  //   const { service, baseUrl, preferences } = useServiceContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadPlayers();
    loadTeams();
    loadEvents();
    loadEventPlayers();
  }, []);

  const loadPlayers = async () => {
    dispatch({ type: 'updateIsLoading', isLoading: true });
    //load the players
    const l_players: any[] = await findAll('players', 'name');
    dispatch({ type: 'updatePlayers', players: l_players });
    dispatch({ type: 'updateIsLoading', isLoading: false });
  };

  const loadTeams = async () => {
    dispatch({ type: 'updateIsLoading', isLoading: true });
    //load the teams
    const l_teams: any[] = await findAll('teams', 'name');
    dispatch({ type: 'updateTeams', teams: l_teams });
    dispatch({ type: 'updateIsLoading', isLoading: false });
  };

  const loadEvents = async () => {
    dispatch({ type: 'updateIsLoading', isLoading: true });
    //load the events
    const l_events: any[] = await findAll('events', 'date', 'desc');
    dispatch({ type: 'updateEvents', events: l_events });
    dispatch({ type: 'updateIsLoading', isLoading: false });
  };

  const loadEventPlayers = async () => {
    dispatch({ type: 'updateIsLoading', isLoading: true });
    //load the eventPlayers
    const l_eventPlayers: any[] = await findAll('eventPlayers', 'eventId');
    dispatch({ type: 'updateEventPlayers', eventPlayers: l_eventPlayers });
    dispatch({ type: 'updateIsLoading', isLoading: false });
  };

  const api = useMemo(() => {
    const setPlayers = (c_players: Player[]) => {
      dispatch({ type: 'updatePlayers', players: c_players });
    };

    const setTeams = (c_teams: Team[]) => {
      dispatch({ type: 'updateTeams', teams: c_teams });
    };

    const setEvents = (c_events: Event[]) => {
      dispatch({ type: 'updateEvents', events: c_events });
    };

    const setEventPlayers = (c_eventPlayers: EventPlayer[]) => {
      dispatch({ type: 'updateEventPlayers', eventPlayers: c_eventPlayers });
    };

    const setIsAuthentified = (isAuthentified: boolean) => {
      dispatch({ type: 'updateIsAuthentified', isAuthentified: isAuthentified });
    };

    return { setPlayers, setTeams: setTeams, setEvents, setEventPlayers, setIsAuthentified };
  }, []);

  return (
    <apiContext.Provider value={api}>
      <loadingContext.Provider value={state.isLoading}>
        <authentifiedContext.Provider value={state.isAuthentified}>
            <playersContext.Provider value={state.players}>
              <teamsContext.Provider value={state.teams}>
                <eventsContext.Provider value={state.events}>
                  <eventPlayersContext.Provider value={state.eventPlayers}>{children}</eventPlayersContext.Provider>
                </eventsContext.Provider>
              </teamsContext.Provider>
            </playersContext.Provider>
        </authentifiedContext.Provider>
      </loadingContext.Provider>
    </apiContext.Provider>
  );
};
