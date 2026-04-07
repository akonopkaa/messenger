import { useState, useEffect } from "react";
import test from "./API/test.jsx"

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await test();
      setResponse(result.message);
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>{response}</p>
    </div>
  );
};

export default App;