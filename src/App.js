import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  function getData() {
    fetch("https://s3.amazonaws.com/open-to-cors/assignment.json")
      .then((response) => response.json())
      .then((data) => {
        let arr = [];
        if (data.products) {
          Object.keys(data.products).map((a) => {
            arr.push(data.products[a]);
          });
        }
        arr.sort(function (a, b) {
          var x = parseInt(a.popularity);
          var y = parseInt(b.popularity);
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        });
        setData(arr);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div className="card-container ">
      {data &&
        data.map((item, i) => (
          <div key={i} className="card">
            <h1>{item.title}</h1>
            <h3>Popularity: - {item.popularity}</h3>
            <h4>Subcategory: - {item.subcategory}</h4>
            <h5>Price: - {item.price}</h5>
          </div>
        ))}
    </div>
  );
}

export default App;
