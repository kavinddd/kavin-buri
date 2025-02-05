import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p className="text-red-600">Hello World</p>

      <p>current count: {count}</p>

      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </>
  );
}

export default App;
