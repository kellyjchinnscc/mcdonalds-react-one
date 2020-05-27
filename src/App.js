// Importing Modules
import React, {useState, useEffect} from 'react';
import './App.css';
import Footer from './Footer'
import Maindisplay from './Maindisplay'
import Header from './Header';

function App() {
  
  // STATE MANAGEMENT - State Initialization and Setter Functions
  const [foodNames, setFoodNames] = useState([])
  const [selectedFood, setSelectedFood] = useState('')
  const [selectedFoodCals, setSelectedFoodCals] = useState('')
  const [calories, setCalories] = useState([])

  // API DATA FETCHING
  const fetchData = async () => {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=2E3KnM9aEwbOJQojLjSlUXpJa0ePATpbeTh62KV6&query=mcdonald&pageSize=20`)
    const data = await response.json();
    const foodNames = data.map(item => {
      return item.description.toUpperCase().slice(12) // getting rid of the "McDonald's at the beginning of each food"
    })
    setFoodNames(foodNames)
    
    const nutrientsArray = data.map(item => {
      return item.foodNutrients
    })
    const filteredNutrientsArr = nutrientsArray.map(item => {
      let filteredInnerArr = item.filter(innerItem =>{      
        if(innerItem.number === "208"){
          let innerTempObj = {}
          innerTempObj.calories = innerItem.amount
          return innerTempObj
        }
      })
      return filteredInnerArr
    })

    const flattenedArray = filteredNutrientsArr.flat()
    const flattenedArrCals = flattenedArray.map(item =>{
      return item.amount
    })
    setCalories(flattenedArrCals)
    
    console.log(flattenedArrCals)
    console.log(foodNames)
  }
  useEffect(() => {
    fetchData(); // calling the fetchData function to get McDonald's info
  }, [])
  

  // Function Decl and Impl
  
  const handleMenuChange = () => {
    let foodInSelectedField = document.querySelector('.food-list')
    let foodNameString = foodInSelectedField.value
    let parallelIndex = foodNames.indexOf(foodNameString)
    setSelectedFood(foodNameString)
    setSelectedFoodCals(calories[parallelIndex])
  }

  // JSX Implementation
  return (
    <div className="App container">
      <div className="row">
        <Header/>
      </div>
      <div className="row">
        <Maindisplay 
          foods={foodNames} 
          chosenFood={selectedFood}
          numCals={selectedFoodCals}
          handleMenuChange = {handleMenuChange}
        />
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
}

export default App;
