import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Auth from './pages/Auth';
import Moderate from './pages/Moderate';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import { Routes, Route} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

const App =() => {
 
  return (
    <>
      <Routes>
        <Route path="/" >
          <Route path="" element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="auth" element={<Auth />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.User]} />}>
            <Route path="moderate" element={<Moderate />} />
          </Route>

          <Route path="*" element={<NotFound />} />   
        </Route>           
      </Routes>
    </>
  );
}

export default App;
