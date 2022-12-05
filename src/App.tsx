import React  from 'react';
import PlayerManagerReducer from "./CustomHooks/usePlayerManager";
import PlayerManager from "./Components/PlayerManager";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PlayerManagerReducer.Provider>
          <PlayerManager />
        </PlayerManagerReducer.Provider>
      </header>
    </div>
  );
}

export default App;
