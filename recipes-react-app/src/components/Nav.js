import './Nav.css';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

const Nav = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  let navigation = useNavigate();
  let isLogged = false;
  const authToken = cookies.AuthToken;
  console.log(authToken);

  const logout = () => {
    console.log('logout');
    removeCookie('AuthToken', cookies.AuthToken);
    navigation('/');
    window.location.reload();
  }

  return (
    <nav className="nav">
      <div className="logo"><a href="/">LOGOHERE</a></div>
      <div className="menu">
        <span className="menu-item">{authToken ? <a onClick={logout} href="#">Wyloguj</a> : <a href="/auth">Zaloguj</a>}</span>
        <span className="menu-item"><a href="/recipes">Przepisy</a></span>
        <span className="menu-item"></span>
        <span className="menu-item"></span>
      </div>
    </nav>
  )
}

export default Nav;