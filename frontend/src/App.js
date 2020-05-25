import React from 'react';
import logo from './logo.png';
import './App.css';
import FeedScheduleForm from './components/feed-schedule-form/FeedScheduleForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 style={{paddingLeft: '16px', margin:0}}>DuckLog</h2>
      </header>

      <section class="App-viewport">
        <h1>Submit DuckLog entry</h1>
        <FeedScheduleForm></FeedScheduleForm>
      </section>
    </div>
  );
}

export default App;
