import "./App.css";
import MakeNote from "./components/MakeNote";
import Note from "./components/Note";

function App() {
  return (
    <div class="container">
      <h1 className="main-header">my notes</h1>
      <MakeNote />
      {/* <Note description='eat something' />
    <Note description='shower' />
    <Note description='broker peace deal between Israelis and Palestinians' />  */}
    </div>
  );
}

export default App;
