`use strict`;

// Getting Acess to the DOM Elements.

const mealBtn = document.getElementById(`meal-btn`);

const foodMeal = document.getElementById(`food-meal`);
const mealRecipe = document.getElementById(`meal-recipe`);
const mealIngredients = document.getElementById(`meal-ingredients`);
const uTube = document.getElementById(`utube-container`);

// Working with the random Meal API

const requestURL = `https://www.themealdb.com/api/json/v1/1/random.php`;

// fetching the random meal API

// Meal Title

const mealTitle = function (name) {
  const title = document.createElement(`h1`);
  title.textContent = name;
  mealRecipe.appendChild(title);
};

// Meal Instructions

const mealInstructions = function (instr) {
  const instructions = document.createElement(`p`);
  instructions.textContent = instr;
  mealRecipe.appendChild(instructions);
};

// Meal Image
const mealImg = function (imgURL) {
  const image = document.createElement(`img`);
  image.src = imgURL;
  mealIngredients.appendChild(image);
};

// Generating meal type

const mealType = function (category, area) {
  const mealCategory = document.createElement(`p`);
  const mealArea = document.createElement(`p`);
  mealCategory.textContent = `Category: ${category}`;
  mealArea.textContent = `Area: ${area}`;
  mealIngredients.append(mealCategory, mealArea);
};

// Generating Meal Ingredients

const generateIngredients = function (ing, measure) {
  const list = document.createElement(`ul`);
  const listTitlle = document.createElement(`h3`);
  list.append(listTitlle);

  // Generating List Ingredients
  ing.forEach((item, i) => {
    let li = document.createElement(`li`);
    li.textContent = `${item} - ${measure[i]}`;
    list.appendChild(li);
  });
  mealIngredients.append(list);
};

// Generating Youtube Recipe
const videoRecipe = function (url) {
  // Generating youtube video
  mealIngredients.innerHTML = `<iframe
    width="560"
    height="315"
    src = ${url}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  >
  </iframe>`;
};

// Fetching URL and generating a random meal
const randomMeal = async () => {
  // Ingredients Array
  const inngredientArr = [];
  // Measurment Array
  const measureArray = [];

  // ************************

  // Requesting to the external API
  let response = await fetch(requestURL);
  let data = await response.json();
  console.log(data);

  // Storing JSON DATA
  let meaLName = data.meals[0].strMeal;
  let mealCategory = data.meals[0].strCategory;
  let mealArea = data.meals[0].strArea;
  let mealSteps = data.meals[0].strInstructions;
  let mealImgURL = data.meals[0].strMealThumb;
  let uTubeUrl = data.meals[0].strYoutube;
  console.log(uTubeUrl);

  // Storing multiple Ingredients into array
  // Storing Ingredients Array
  for (let i = 0; i < 20; i++) {
    if (!data.meals[0][`strIngredient${i + 1}`]) {
      continue;
    }
    inngredientArr.push(data.meals[0][`strIngredient${i + 1}`]);
    measureArray.push(data.meals[0][`strMeasure${i + 1}`]);
  }

  // calling meal title
  mealTitle(meaLName);

  // calling the meal Instructions
  mealInstructions(mealSteps);

  // Calling the mealImg
  mealImg(mealImgURL);

  // calling the mealType
  mealType(mealCategory, mealArea);

  // Generating the Ingredients
  generateIngredients(inngredientArr, measureArray);

  // Generating a video recipe

  // videoRecipe(uTubeUrl);
};

// Adding Event listener to meal button
mealBtn.addEventListener(`click`, () => {
  // Removing/ Emptying conatiners
  mealIngredients.innerHTML = ``;
  mealRecipe.innerHTML = ``;
  uTube.innerHTML = ``;

  // Executing the random meal function
  randomMeal();
});

// fetch(requestURL)
//   .then((response) => response.json())
//   .then((meal) => console.log(meal))
//   .catch((error) => error)
//   .finally(() => `Promiise either completed sucessfully or not`);

// console.log(data);
