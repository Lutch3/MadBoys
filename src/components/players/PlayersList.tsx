import { memo, useEffect } from 'react';

import './PlayersList.css';
import { Player } from '../../model/models';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useAuthentifiedContext, usePlayersContext } from '../context/FcMadBoysContext';
import { removePlayer } from '../../service/FcMadBoysService';
import * as Icon from 'react-bootstrap-icons';
// import { ModalDeleteDialog } from '../modals/ModalDeleteDialog';

const PlayersList: React.FC = memo(() => {

    // const [showModal, setShowModal] = useState(false);

    // const handleClose = () => setShowModal(false);
    // const handleShow = () => setShowModal(true);

    const players = usePlayersContext();
    const isAuthentified = useAuthentifiedContext();
    const { setPlayers } = useApiContext();
    const playersListGroups = players?.map((player:Player) => 
        <div style={{display:'flex', flexDirection:'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <ListGroup.Item style={{width:'100%'}} key={player.id}>{player.name}</ListGroup.Item>
            {isAuthentified && <button onClick={() => deletePlayer(player)}><Icon.Trash/></button>}
        </div>
    );
    useEffect(() => {
        console.log('Rendering PlayersList');
    }, [players]);

    const deletePlayer = (player:any) => {
        console.log(player);
        // handleShow();
              removePlayer(player).then( () => {
        let playersArray: any[] = JSON.parse(JSON.stringify(players));
        playersArray = playersArray.filter( (item) => item.id !== player.id );
        setPlayers(playersArray);
        });
    }

    // const handleButtonClicked = (answer: 'Yes'|'No') => {
    // //   handleClose();
    //   console.log(answer);

    // }

    return (
        <>  { players && players.length > 0 &&
            <ListGroup > {playersListGroups} </ListGroup >
            }

            {(!players || players.length === 0) && <span>Please add players</span>}

            {/* <ModalDeleteDialog showModal={showModal} buttonClickedHandler={handleButtonClicked} /> */}
        </>
    );
});



export { PlayersList };
