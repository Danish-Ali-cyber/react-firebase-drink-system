import './App.css';
import BeverageFormMenu from './components/BeverageFormMenu/BeverageFormMenu';
import BeverageQueue from './components/BeverageQueue/BeverageQueue';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<BeverageFormMenu />} />
          <Route exact path="/queue" element={<BeverageQueue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
