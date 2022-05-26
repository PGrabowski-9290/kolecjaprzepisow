import './Auth.css';
import { useState } from 'react';
import Nav from '../components/Nav';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);


  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if ( isSignUp && (password !== confirmPassword)) {
        setError('Hasła są nie zgodne');
        return;
      }
      
      

      setCookie('AuthToken', '1231');


      navigate('/');

    }catch (err) {
      console.error(err);
    }
  }

  const handleRegister = () => {
    setIsSignUp(!isSignUp);
  }

  return (
    <>
      <Nav />
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
                  onChange={(e)=> setName(e.target.value)}
                  tabindex="4"  
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
              <p className="error-message">{error}</p>
            </div>
            <div className="row">              
              <input type="submit" value={!isSignUp ? 'ZALOGUJ' : 'ZAREJESTRUJ'} tabIndex="8"/>
            </div>
          </form>
          <div>
            <hr />
            {!isSignUp ? <span className='text-muted'> Jeśli nie posiadasz konta <button className="btn" onClick={handleRegister}>ZAREJESTRUJ</button></span> : <span className='text-muted'>Posiadasz konto? <button className="btn" onClick={handleRegister}>ZALOGUJ</button></span>}
            
          </div>
          
        </section>
      </div>
    </>
  )
}

export default Auth