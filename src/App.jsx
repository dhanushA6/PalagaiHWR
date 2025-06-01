import React from 'react';
import { Routes, Route , HashRouter as Router} from 'react-router-dom';
import './App.css';
import ReactDOM from "react-dom/client";
import TamilDrawingApp from './components/DrawingPage'
function App() {
  return (
   
    <Router
      basename={process.env.PUBLIC_URL}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
  
        <Route path="/" element={<TamilDrawingApp />} />
      </Routes>
  </Router>
  );
}

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

export default App;
