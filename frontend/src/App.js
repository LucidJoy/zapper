import axios from "axios";

import "./App.css";

function App() {
  async function backendCall() {
    const response = await axios.get(`http://localhost:8000/`);

    console.log(response.data);
  }

  return (
    <div className='App'>
      <button onClick={backendCall}>Fetch hello</button>
    </div>
  );
}

export default App;
