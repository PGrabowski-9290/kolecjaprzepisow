import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Auth from './pages/Auth';
import Moderate from './pages/Moderate';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import { Routes, Route} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import RecipeDetails from './pages/RecipeDetails';
import RecipesAdd from './pages/RecipesAdd';

const ROLES = {
  'User': 1001,
  'Admin': 5001
}

const App =() => {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="recipes" element={<Recipes />} >            
            
          </Route>
          <Route path="recipes/details" element={<RecipeDetails />}/>
          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} /> } >
            <Route path='recipes/add' element={<RecipesAdd />} />
          </Route>


          <Route path="auth" element={<Auth />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="moderate" element={<Moderate />} />
          </Route>

          <Route path="*" element={<NotFound />} />   
        </Route>           
      </Routes>
    </>
  );
}

export default App;
