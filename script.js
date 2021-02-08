const inputMealName = document.getElementById('input-meal');
const searchBtn = document.getElementById('search-btn');

// Search Button Event Handler
searchBtn.addEventListener('click', () => getMealsData(inputMealName.value))

// Function For Get Meals Data From API
const getMealsData = name => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then(data => displayMeals(data.meals))
}

// Function For Display Meals
const displayMeals = mealsData => {
    const mealsDetails = document.getElementById('meals-details');
    mealsDetails.innerHTML = '';
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    const nothingFound = document.getElementById('nothing-found');
    nothingFound.innerText = '';

    // Checking Meals Data Or Nothing
    if (mealsData) {
        mealsData.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'col p-3';
            const mealInfo = `
                <div onclick="getDetails(${meal.idMeal})" class="card border-0 rounded-3" style="width: 18rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top">
                    <div class="card-body bg-light">
                        <h5 class="card-title text-center">${meal.strMeal}</h5>
                    </div>
                </div>
            `;
            mealDiv.innerHTML = mealInfo;
            mealsContainer.appendChild(mealDiv);
        });
    } else {
        nothingFound.innerText = `No meal found for "${inputMealName.value}" search result !`;
    }
}

// Function For Get Details Of Meals
const getDetails = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => displayMealsDetails(data.meals[0]));
}

// Function For Display Details Of Meals
const displayMealsDetails = details => {
    const mealsDetails = document.getElementById('meals-details');
    mealsDetails.innerHTML = `
        <div class="d-flex justify-content-center mb-5">
            <div class="card w-75 border-0 rounded-3 meal-details">
                <img src="${details.strMealThumb}" class="card-img-top">
                <div class="card-body bg-light">
                    <h1 class="mb-4">${details.strMeal}</h1>
                    <h5 class="card-text mb-4">Ingredients</h5>
                    <p><img src="images/checkmark.png">${details.strMeasure1} ${details.strIngredient1}</p>
                    <p><img src="images/checkmark.png">${details.strMeasure2} ${details.strIngredient2}</p>
                    <p><img src="images/checkmark.png">${details.strMeasure3} ${details.strIngredient3}</p>
                    <p><img src="images/checkmark.png">${details.strMeasure4} ${details.strIngredient4}</p>
                    <p><img src="images/checkmark.png">${details.strMeasure5} ${details.strIngredient5}</p>
                    <p><img src="images/checkmark.png">${details.strMeasure6} ${details.strIngredient6}</p>
                    <p><img src="images/checkmark.png">${details.strMeasure7} ${details.strIngredient7}</p>
                    <p><img src="images/checkmark.png">${details.strMeasure8} ${details.strIngredient8}</p>
                    <p><img src="images/checkmark.png">${details.strMeasure9} ${details.strIngredient9}</p>
                    <p><img src="images/checkmark.png">${details.strMeasure10} ${details.strIngredient10}</p>
                </div>
            </div>
        </div>
        `;
}