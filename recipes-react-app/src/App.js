import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useCookies} from 'react-cookie';



const App =() => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  
  const authToken = cookies.authToken;

  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />      
          </Routes>
        </BrowserRouter>
      
    </>
  );
}

export default App;
