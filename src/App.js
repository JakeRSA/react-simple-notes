import "./App.css";
import MakeNote from "./components/MakeNote";
import Modal from 'react-modal';

Modal.setAppElement('#root')

function App() {
  return (
    <div class="container">    
      <h1 className="main-header">my notes</h1>
      <MakeNote />
    </div>
  );
}

export default App;
