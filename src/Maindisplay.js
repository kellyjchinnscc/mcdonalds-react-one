import React from 'react'
import styles from './module.style.maindisplay.css'
const Maindisplay = ({foods, chosenFood, handleMenuChange, numCals}) =>{
    
    // JSX
    return(
        <div className='container'>
            <div className="row">
                 {/*JSX for left side of display*/}
                <div className='col-7 foodPicker'>
                    <h1>Welcome to McDonald's Calorie Checker!</h1>
                    <h2>Choose your food from the dropdown below, and its nutritional info will show on the right!</h2>
                    <div className="dropDown">
                        <select className="food-list" onChange={handleMenuChange}>
                            <option value="" selected disabled>Select your food!</option>
                            {foods.map(foodName => (
                                <option key={foodName} className="food-item">
                                    {foodName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/*JSX for right side of display*/}
                <div className='col-5 nutritionDisplay'>
                    <h1>Nutrition Info for:</h1>
                    <h1>{chosenFood}</h1>
                    <div>
                        <h2>Number of Calories: {numCals}</h2>
                        {/* <h2>Grams of Carbs: </h2> */}
                    </div>
                    
                </div>

            </div>
           
        </div>
    )
}

export default Maindisplay