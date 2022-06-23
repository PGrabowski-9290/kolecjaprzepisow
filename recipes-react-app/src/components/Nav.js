import './Nav.css';
import useAuth from '../hooks/useAuth'
import {useCookies} from 'react-cookie';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';

const Nav = () => {
  const { auth, setAuth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  let navigation = useNavigate();
  const authToken = auth._id;

  const logout = async () => {
    console.log('logout'); 
    const response = await axios.get('/auth/logout')
    setAuth({})
    console.log(cookies)
    navigation('/');
  }


  return (
    <nav className="nav">
      <div className="logo"><a href="/">LOGOHERE</a></div>
      <div className="menu">
        <span className="menu-item">{authToken ? <a onClick={logout} href="#">Wyloguj</a> : <a href="/auth">Zaloguj</a>}</span>
        <span className="menu-item"><Link to="/recipes">Przepisy</Link></span>
      </div>
    </nav>
  )
}

export default Nav;