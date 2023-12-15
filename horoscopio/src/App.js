// File: App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from 'react-router-dom';
import './App.css';

const HoroscopePage = ({ name, sex, dob }) => (
  <div>
    <h2>Your Horoscope Page</h2>
    <p>Name: {name}</p>
    <p>Sex: {sex}</p>
    <p>Date of Birth: {dob}</p>
    {/* Add your horoscope content here */}
  </div>
);

const App = () => {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    // Add logic to handle the form submission, if needed
    // In this example, we simply navigate to the HoroscopePage with the provided data
    history.push(`/horoscope?name=${name}&sex=${sex}&dob=${dob}`);
  };

  return (
    <Router>
      <div className="App">
        <div className="form-container">
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Sex:
            <input
              type="text"
              placeholder="Enter your sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="text"
              placeholder="Enter your date of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </label>
          <button onClick={handleSubmit}>
            <Link to="/horoscope">Dalej</Link>
          </button>
        </div>

        <Switch>
          <Route path="/horoscope">
            <HoroscopePage name={name} sex={sex} dob={dob} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
