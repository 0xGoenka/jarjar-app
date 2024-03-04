import "./App.css";
import axios from "axios";

function App() {
  const login = async () => {
    const message = await axios.get("http://localhost:3000/auth");
  };

  return (
    <>
      <button onClick={login}>Login</button>
    </>
  );
}

export default App;
