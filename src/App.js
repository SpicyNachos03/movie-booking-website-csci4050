import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import MovieCard from './components/MovieCard/MovieCard'; // Correct path to MovieCard
import SeatingPage from './components/SeatingPage/SeatingPage'; // Add SeatingPage import
import AlertComponent from './components/AlertComponent/AlertComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header title={title} />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            {/* Registration Route */}
            <Route path="/" exact>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>

            {/* Login Route */}
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>

            {/* Home Route (Protected) */}
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>

            {/* Movie Details Route */}
            <PrivateRoute path="/movies/:id">
              <MovieCard />
            </PrivateRoute>

            {/* Seat Selection Route */}
            <PrivateRoute path="/seating/:movieId/:showtime">
              <SeatingPage />
            </PrivateRoute>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
