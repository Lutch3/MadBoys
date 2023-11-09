import { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';

import './RankingColumnSort.css';

interface RankingColumnSortProps {
    callbackFunction:Function;
    property:string;
}

const RankingColumnSort: React.FC<RankingColumnSortProps> = ({callbackFunction, property} : RankingColumnSortProps) => {
  const [upClicked, setUpClicked] = useState(false);
  const [downClicked, setDownClicked] = useState(false);

  useEffect(() => {
    console.log('Rendering RankingColumnSort');
  }, []);

  const onButtonClickHandler = (direction:'Asc'|'Desc') => {
    callbackFunction(property, direction);
  }

  return (
    <>
      <div style={{marginLeft:'5px'}}>
        <Icon.ChevronUp className='Icon' style={{fontSize:upClicked?'20px':'15px'}} onClick={() => { setUpClicked(true); setDownClicked(false);  onButtonClickHandler('Desc') }}/> 
        <Icon.ChevronDown className='Icon' style={{fontSize:downClicked?'20px':'15px'}} onClick={() => { setUpClicked(false); setDownClicked(true);  onButtonClickHandler('Asc')}} />
      </div>
    </>
  );
};

export { RankingColumnSort };
