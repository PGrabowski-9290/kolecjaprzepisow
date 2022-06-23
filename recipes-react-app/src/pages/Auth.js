import './Auth.css';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth'
import Nav from '../components/Nav';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';

const Auth = () => {
  const { setAuth } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect( () => {
    setError('')
  }, [username, password, confirmPassword, email])

  let navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if ( isSignUp && (password !== confirmPassword)) {
        setError('Hasła są nie zgodne');
        return;
      }
      
      const response = await axios.post(`/auth/${isSignUp ? 'signup' : 'login'}`,
       {email: email, password: password, name: username},
       {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
       }
      );
      const success  = response?.status === 200;
      console.log(response)
      const {_id, roles, accessToken, name} = response?.data?.user;

      if(success) {
        setAuth({ _id, roles, accessToken, name})
        navigate(from, {replace: true});
      }

    }catch (err) {
      console.log(err);

      setError(err?.response?.data?.message);
    }
  }

  

  const handleRegister = () => {
    setIsSignUp(!isSignUp);
  }

  return (
    <>
      <div className="container">
        <section className="auth-container">
          <form onSubmit={handleSubmit} className="auth-form">
            <h2>{!isSignUp ? 'LOGOWANIE' : 'REJESTRACJA'} </h2>
            <div className="row">
            <div className="col">
              <input type="email"
                id="email"
                name="email"
                placeholder="Adres Email"
                required={true} 
                onChange={(e) => setEmail(e.target.value)}
                tabIndex="2" 
              />
              <input type="password" 
                id="password"
                name="password"
                placeholder="Hasło"
                required={true}
                onChange={(e)=> setPassword(e.target.value)}
                tabIndex="6" 
              />
              
            </div>
            {isSignUp && <div className="col">
                <input type="text" 
                  id="name"
                  placeholder="Nazwa"
                  required={true}
                  onChange={(e)=> setUsername(e.target.value)}
                  tabIndex="4"  
                />
                <input type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  placeholder="Potwierdź Hasło"
                  required={true}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
                  tabIndex="7"
                />
              </div>}
            </div>
            <div className="row">
              <p className={error ? "error" : "offscreen"} >{error}</p>
            </div>
            <div className="row">              
              <input type="submit" value={!isSignUp ? 'ZALOGUJ' : 'ZAREJESTRUJ'} tabIndex="8"/>
            </div>
          </form>
          <div>
            <hr />
            {!isSignUp ? <span className='text-muted'> Jeśli nie posiadasz konta <button className="btn-link" onClick={handleRegister} tabIndex="9">ZAREJESTRUJ</button></span> : <span className='text-muted'>Posiadasz konto? <button className="btn-link" onClick={handleRegister} tabIndex="9">ZALOGUJ</button></span>}
            
          </div>
          
        </section>
      </div>
    </>
  )
}

export default Auth