import './App.css';
import { useRoutes } from 'hookrouter';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/layout/NavBar';

const routes = {
  '/': () => <HomePage />,
  '/about': () => <AboutPage />,
};

function App() {
  const routeResult = useRoutes(routes);
  // Insert navbar here
  return (
    <div className="App">
      <NavBar name="Test" />
      {routeResult || <NotFoundPage />}
    </div>
  );
}

export default App;
