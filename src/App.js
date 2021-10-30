import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Setup from './pages/Setup';
import Game from './pages/Game';
import FeedBack from './pages/FeedBack';
import Ranking from './pages/Ranking';
import About from './pages/About';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/Setup"><Setup /></Route>
        <Route exact path="/" render={ () => <Login /> } />
        <Route exact path="/game" render={ () => <Game /> } />
        <Route exact path="/feedback" render={ () => <FeedBack /> } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/about" component={ About } />
      </Switch>
    </div>
  );
}
