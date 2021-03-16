import './App.css';
import { useState, useEffect } from 'react';
import * as axios from 'axios';

function App() {
  const [foodName, setfoodName] = useState(' ');
  const [days, setdays] = useState(0);
  const [foodList, setfoodList] = useState([]);
  const [updateFoodName, setupdateFoodName] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3001/read')
      .then((response) => {
        console.log(response);
        setfoodList(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const addToList = () => {
    console.log(foodName + days);
    axios.post('http://localhost:3001/insert', {
      foodName: foodName,
      days: days
    })
      .then(res => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
  }

  const updateFunction = (id) => {
    // console.log("button working");
    axios.put('http://localhost:3001/update', {
      id: id,
      updatedName: updateFoodName
    })
      .then(res => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
  }

  const deleteFood = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          window.location.reload();
        }
      });
  }

  return (
    <div className="App">
      <h1>Crud with MERN</h1>
      <label>Food Name</label>
      <input type="text" onChange={(e) => setfoodName(e.target.value)} />
      <label>Day since you ate</label>
      <input type="number" onChange={(e) => setdays(e.target.value)} />
      <button onClick={addToList}>Add to List</button>
      {
        foodList.map((val, key) => {
          return (
            <div key={key}>
              <h1>{val.foodName} : <span>{val.daysSinceIAte}</span></h1>
              <input type="text" placeholder="new food name" onChange={(e) => setupdateFoodName(e.target.value)} />
              <button onClick={() => updateFunction(val._id)}>Update</button>
              <br />
              <button onClick={() => deleteFood(val._id)}>Delete</button>
            </div>)
        })
      }
    </div>
  );
}

export default App;
