import './Nav.css';
import useAuth from '../hooks/useAuth'
import {useCookies} from 'react-cookie';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Nav = () => {
  const { auth, setAuth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  let navigation = useNavigate();
  let isLogged = false;
  const authToken = auth._id;

  const logout = () => {
    console.log('logout');
    removeCookie('AuthToken', cookies.AuthToken);
    navigation('/');
    window.location.reload();
  }

  const menuClick = () => {}

  return (
    <nav className="nav">
      <div className="logo"><a href="/">LOGOHERE</a></div>
      <div className="menu">
        <span className="menu-item">{authToken ? <a onClick={logout} href="#">Wyloguj</a> : <a href="/auth">Zaloguj</a>}</span>
        <span className="menu-item"><Link to="/recipes">Przepisy</Link></span>
        { auth?.role === 2001 && 
        <span className="menu-item"><Link to="/moderate">Moderate</Link></span> 
        }
      </div>
    </nav>
  )
}

export default Nav;