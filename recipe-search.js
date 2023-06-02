let form = document.querySelector(".js-recipe-form");
let foodInput = document.querySelector("[name=recipe-name]");
let responseContainer = document.querySelector(".js-response-container");

function getImageHtml(meal) {
    if (typeof meal.strMealThumb === "string") {
        return `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />`;
    }
    return "";
}

function getIngredientList(meal) {
    let html = "<ul>";

    for (let i = 1; i <= 20; ++i) {
        let currentIngredient = meal["strIngredient" + i];
        let currentMeasure = meal["strMeasure" + i];

        if (typeof currentIngredient === "string" && currentIngredient.length > 0) {
            html += `
                <li>
                    ${currentIngredient} (${currentMeasure})
                </li>
            `;
        }
    }

    html += "</ul>";

    return html;
}

function getIngredientsTab(meal) {
    return `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo${meal.idMeal}"
                    aria-expanded="false"
                    aria-controls="collapseTwo${meal.idMeal}"
                >
                    Ingredients
                </button>
            </h2>
            <div 
                id="collapseTwo${meal.idMeal}" 
                class="accordion-collapse collapse" 
                data-bs-parent="#accordion${meal.idMeal}">
                <div class="accordion-body">
                    ${getIngredientList(meal)}
                </div>
            </div>
        </div>
    `;
}

function getInstructionsTab(meal) {
    return `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne${meal.idMeal}"
                    aria-expanded="false"
                    aria-controls="collapseOne${meal.idMeal}"
                >
                    Instructions
                </button>
            </h2>
            <div 
                id="collapseOne${meal.idMeal}" 
                class="accordion-collapse collapse" 
                data-bs-parent="#accordion${meal.idMeal}">
                <div class="accordion-body">
                    ${meal.strInstructions}
                </div>
            </div>
        </div>
    `;
}

function displayRecipes(meals) {
    // innerHTML is generally unsafe. However, to simplify your studies and move
    // to React fast, we'll first use innerHTML to render data.
    let html = "";
    for (let meal of meals) {
        html += `
        <section class="meal-item p-4">
            <h2>${meal.strMeal}</h2>
            ${getImageHtml(meal)}
            <div class="accordion" id="accordion${meal.idMeal}">
                ${getInstructionsTab(meal)}
                ${getIngredientsTab(meal)}
            </div> 
            <a 
                href="${meal.strSource}" 
                class="align-self-baseline my-4 btn btn-info" 
                target="_blank">
                    Full recipe
            </a>
        </section>
        `;
    }
    responseContainer.innerHTML = html;
}

function displayErrorMessage() {
    responseContainer.innerHTML = '<div class="error">Error fetching data.</div>';
}

function render(response) {
    const meals = response.meals;

    if (meals === null) {
        displayErrorMessage();
    } else {
        displayRecipes(meals);
    }
}

function queryFood(searchExpression) {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchExpression;

    fetch(url)
        .then((data) => data.json())
        .then(render);
}

function formSubmitted(event) {
    event.preventDefault();

    queryFood(foodInput.value);
    foodInput.value = "";
}

form.addEventListener("submit", formSubmitted);
