import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/students`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        console.log(actualData);
        setData(actualData);
        setError(null);
      } catch(err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }  
    }
    getData()
    // setInterval(() => {
    //   getData()
    // }, 1000);
  }, [])

  return (
    <div className="App">
      <h1>Students List</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {data &&
          data.map(({ id, name, rollno, gender, dob }) => (
            <li key={id}>
              <div style={{display: "flex"}}>
                <h3>{name}</h3>
                <h5 className="gender">{gender}</h5>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <h5>Roll No: {rollno}</h5>
                <p>Date of Birth: {dob}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
