import React, { lazy, Suspense } from 'react';
import './App.css';
import 'tachyons'

const Home = lazy(() => import('./components/Home'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
