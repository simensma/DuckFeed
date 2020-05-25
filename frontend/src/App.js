import React from 'react';
import logo from './logo.svg';
import './App.css';
import FeedScheduleForm from './components/feed-schedule-form/FeedScheduleForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>DuckLog</h1>
      </header>

      <section>
        <FeedScheduleForm></FeedScheduleForm>
      </section>
    </div>
  );
}

export default App;
