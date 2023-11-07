import { memo, useEffect, useState } from 'react';

import { login } from '../../service/FcMadBoysService';
import { useApiContext } from '../context/FcMadBoysContext';

const Login: React.FC = memo(() => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { setIsAuthentified } = useApiContext();

  useEffect(() => {
    console.log('Rendering Login');
  });

  const doLogin = () => {
    if (userName && password) {
        login(userName,password).then((userCredential:any) => {
            // Signed in
            console.log(userCredential);
            setIsAuthentified(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setIsAuthentified(false);
          });
    }
  };

  return (
    <>
      <div style={{ width:'auto',display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', alignItems: 'center', justifyContent:'center' }}>
        <span style={{ paddingRight: '5px' }} className="">
          User Name
        </span>
        <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)} />
        <span style={{ paddingLeft: '5px', paddingRight: '5px' }} className="">
          Password
        </span>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button style={{ marginLeft: '5px' }} onClick={doLogin}>Login</button>
      </div>
    </>
  );
});

export { Login };
