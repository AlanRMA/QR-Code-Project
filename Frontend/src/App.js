import React from 'react';
import './App.css';
import { sendPostRequest } from './api';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Minha Aplicação</h1>
                <button onClick={sendPostRequest}>Enviar Requisição</button>
            </header>
        </div>
    );
}

export default App;
