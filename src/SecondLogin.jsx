import './Styles/SecoundLogin.css';
import { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';

function SecoundLogin() {
  const clientID = "53496067689-ga7cu7bub9a35nugrpd93eg3hvhkungk.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [googleLoggedIn, setGoogleLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const onSuccess = (response) => {
    setUser(response.profileObj);
    setGoogleLoggedIn(true);
  };

  const onFailure = (response) => {
    console.log("Something went wrong");
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
  };

  const navigateToApp = () => {
    if (googleLoggedIn) {
      Navigate('/App2');
      setLoggedIn(true);
    } else {
      console.log("Debes autenticarte con Google primero");
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="center">
      <h1>Login</h1>

      <div className='btn'>
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Continue with Google"
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <div className={user ? "profile" : "hidden"}>
        <img src={user.imageUrl} alt="user" />
        <h3>{user.name}</h3>
        <button onClick={navigateToApp} disabled={!googleLoggedIn || loggedIn}>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default SecoundLogin;
