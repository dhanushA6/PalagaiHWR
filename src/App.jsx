import { useState } from 'react'; // Optional here, unless you're using useState inside App
import DrawingPage from './components/DrawingPage'; // Correct import path if file exists there
import './App.css'; // Correct for styling

function App() {
  return (
    <div className="App">
      <DrawingPage /> {/* Correct usage of the component */}
    </div>
  );
}

export default App;
