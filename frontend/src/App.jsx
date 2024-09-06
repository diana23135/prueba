import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/comentarios/get-all")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setData(data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <>
    <div>{data}</div>
    </>
  )
}

export default App
