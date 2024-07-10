import { fetchData } from "./api.js";
import { getTime } from "./module.js";

const $detailContainer = document.querySelector("[data-detail-container]");

// Assuming ACCESS_POINT is defined elsewhere in your code
ACCESS_POINT += `/${window.location.search.slice(window.location.search.indexOf("=") + 1)}`;

fetchData(null, data => {
  const {
    images: { LARGE, REGULAR, SMALL, THUMBNAIL },
    label: title,
    source: author,
    ingredients = [],
    totalTime: cookingTime = 0,
    calories = 0,
    cuisineType = [],
    dietLabels = [],
    dishType = [],
    yield: servings = 0,
    ingredientLines = [],
    uri
  } = data.recipe;

  document.title = `${title} - CookEase`;

  const banner = LARGE ?? REGULAR ?? SMALL ?? THUMBNAIL;
  const { url: bannerUrl, width, height } = banner;
  const tags = [...cuisineType, ...dietLabels, ...dishType];

  let tagElements = "";
  let ingredientItems = "";

  const recipeId = uri.slice(uri.lastIndexOf("_") + 1);
  const isSaved = window.localStorage.getItem(`CookEase-recipe${recipeId}`);

  tags.forEach(tag => {
    let type = "";
    if (cuisineType.includes(tag)) {
      type = "cuisineType";
    } else if (dietLabels.includes(tag)) {
      type = "diet";
    } else {
      type = "dishType";
    }
    tagElements += `
      <a href="./recipes.html?${type}=${tag.toLowerCase()}" class="filter-chip label-large has-state">${tag}</a>
    `;
  });

  ingredientLines.forEach(ingredient => {
    ingredientItems += `
      <li class="ingr-item">${ingredient}</li>
    `;
  });

  $detailContainer.innerHTML = `
    <figure class="detail-banner img-holder">
      <img src="${bannerUrl}" width="${width}" height="${height}" alt="${title}" class="img-cover">
    </figure>

    <div class="detail-content">
      <div class="title-wrapper">
        <h1 class="display-small">
          <a href="https://www.google.com/search?q=${encodeURIComponent(title)}" target="_blank">${title ?? "Untitled"}</a>
        </h1>

        
        <button class="btn btn-secondary has-state has-icon ${isSaved ? "saved" : "removed"}" onclick="saveRecipe(this, '${recipeId}')">
          <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>
          <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>
          <span class="label-large save-text">Save</span>
          <span class="label-large unsaved-text">Unsaved</span>
        </button>
      </div>

      <div class="detail-author label-large">
        <span class="span">by</span> ${author}
      </div>

      <div class="detail-stats">
        <div class="stats-item">
          <span class="display-medium">${ingredients.length}</span>
          <span class="label-medium">Ingredients</span>
        </div>
        <div class="stats-item">
          <span class="display-medium">${getTime(cookingTime).time || "<1"}</span>
          <span class="label-medium">${getTime(cookingTime).timeUnit}</span>
        </div>
        <div class="stats-item">
          <span class="display-medium">${Math.floor(calories)}</span>
          <span class="label-medium">Calories</span>
        </div>
      </div>

      ${tagElements ? `<div class="tag-list">${tagElements}</div>` : ""}

      <h2 class="title-medium ingr-title">
        Ingredients
        <span class="label-medium">for ${servings} Servings</span>
      </h2>

      ${ingredientItems ? `<ul class="body-large ingr-list">${ingredientItems}</ul>` : ""}
      <br>
      <h2 class="title-medium ">
        Recipe
      </h2>
      <br>
      <hr style="width:100%;text-align:left;margin-left:0; opacity:0.2;">
      <br>
       <p style="font-size: 1.5rem;">This delightful recipe is a culinary treat that combines a variety of flovors and textures to create a truly unique dining experience.This recipe is easy to follow and sure to impress.The igredients are simple and wholesome,and the steps are straightforward and clear.Enjoy the process of creating this dish,and savor the delicious result.</p>
      <br>
      <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(title)}" target="_blank" class="btn btn-primary" style="margin-left: 10px;">Click me</a>
     
    </div>
    
  `;
});
