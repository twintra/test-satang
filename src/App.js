import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layout/default';
import Market from './pages/market';
import MarketSocket from './pages/market_socket';

function App() {
  return (
    <div className="wrapper">
      <DefaultLayout>
        <BrowserRouter>
          <Routes>
            <Route 
              path='/market/:id' 
              element={<Market/>} 
            />
            <Route 
              path='/market_socket/:id' 
              element={<MarketSocket/>} 
            />
          </Routes>
        </BrowserRouter>

      </DefaultLayout>

    </div>
  );
}

export default App;