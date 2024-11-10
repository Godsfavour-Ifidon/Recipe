const recipesListContainer = document.querySelector(".recipe-container");
const loader = document.querySelector(".loader");
const detailsOfRecipes = document.querySelector(".recipe-details");
const body = document.querySelector("body");
const btn = document.querySelector(".btn");

function showLoader() {
  loader.classList.add("show");
  recipesListContainer.classList.add("hide");
}
function removeLoader() {
  loader.classList.remove("show");
  recipesListContainer.classList.remove("hide");
}

async function fetchListOfRecipe() {
  showLoader();
  const response = await fetch("https://dummyjson.com/recipes", {
    method: "GET",
  });
  const result = await response.json();
  if (result && result.recipes && result.recipes.length > 0) {
    removeLoader();
    displayRecipesList(result.recipes);
    // console.log(result);
  }
}

function displayRecipesList(getRecipes) {
  getRecipes.forEach((recipesItem) => {
    const { name, image, ingredients, cuisine, rating, id, mealType } =
      recipesItem;
    const recipesListWrapper = document.createElement("div");
    recipesListWrapper.classList.add("recipes-wrapper");

    // name

    const recipesName = document.createElement("p");
    recipesName.classList.add("recipes-name");
    recipesName.textContent = name;

    // image

    const recipesImage = document.createElement("img");
    recipesImage.classList.add("recipes-img");
    recipesImage.src = image;

    // ingredients

    const recipesIngredients = document.createElement("p");
    recipesIngredients.classList.add("recipes-ingredients");
    recipesIngredients.textContent = ingredients.map((item) => item);

    // cuisine

    const recipesCuisine = document.createElement("p");
    recipesCuisine.classList.add("recipes-cuisine");
    recipesCuisine.textContent = cuisine;

    // mealType
    const recipesMealType = document.createElement("p");
    recipesMealType.classList.add("recipes-mealTtype");
    recipesMealType.textContent = mealType;

    // rating

    const recipesRating = document.createElement("p");
    recipesRating.classList.add("recipes-rating");
    recipesRating.textContent = rating;

    // recipes Details button

    const recipesDetailsButton = document.createElement("button");
    recipesDetailsButton.classList.add("recipes-detailsButton");
    recipesDetailsButton.textContent = "Recipes Details";
    recipesDetailsButton.addEventListener("click", () =>
      handleRecipesDetails(id)
    );
    recipesListWrapper.appendChild(recipesImage);
    recipesListWrapper.appendChild(recipesName);
    recipesListWrapper.appendChild(recipesCuisine);
    recipesListWrapper.appendChild(recipesIngredients);
    recipesListWrapper.appendChild(recipesMealType);
    recipesListWrapper.appendChild(recipesRating);
    recipesListWrapper.appendChild(recipesDetailsButton);

    recipesListContainer.appendChild(recipesListWrapper);
  });
}

fetchListOfRecipe();
async function handleRecipesDetails(getId) {
  const res = await fetch(`https://dummyjson.com/recipes/${getId}`);
  const data = await res.json();
  if (data) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    displayRecipesListData(data);
  }
}

function displayRecipesListData(getData) {
  detailsOfRecipes.innerHTML = `
  <h1>You are now seeing the list of the following recipes.</h1>
  <p>${getData.name}</p>
  <p>${getData.ingredients}</p>
 <p>${getData.cuisine}</p>
`;
}

btn.addEventListener("click", () => {
  body.classList.toggle("change");
});
