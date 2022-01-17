import {BrowserRouter as Router, Route, Link, useLocation} from 'react-router-dom';
import './App.css';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import RecommendPage from './pages/RecommendPage/RecommendPage';

function App() {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/institution/:gid" exact component={DetailsPage} />
      <Route path="/recommend" exact component={RecommendPage} />
    </Router>
  );
}

export default App;
