let form = document.querySelector(".js-recipe-form");
let foodInput = document.querySelector("[name=recipe-name]");
let responseContainer = document.querySelector(".js-response-container");

function displayRecipes(response) {
    const meals = response.meals;

    // innerHTML is generally unsafe. However, to simplify your studies and move
    // to React fast, we'll first use innerHTML to render data.
    let html = "";
    for (let meal of meals) {
        html += `<p>${meal.strMeal}</p>`;
    }
    responseContainer.innerHTML = html;
}

function queryFood(searchExpression) {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchExpression;

    fetch(url)
        .then((data) => data.json())
        .then(displayRecipes);
}

function formSubmitted(event) {
    event.preventDefault();

    queryFood(foodInput.value);
    foodInput.value = "";
}

form.addEventListener("submit", formSubmitted);
