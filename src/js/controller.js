
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js'
import recipeView from './recipeView.js';
import searchView from './searchView.js';
import resultView from './searchResultView.js';
import paginationView from './paginationView.js';
import bookmarksView from './bookmarksView.js';
import addRecipeView from './addRecipeView.js';


// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////




const controlRecipes = async function () {

  try {
    const id = window.location.hash.replace('#', '');

    if (!id) return;

    recipeView.renderSpinner();

    resultView.update(model.dataPerPage());
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);

    const { recipe } = model.state;
    //load recipe
    recipeView.render(recipe);

  } catch (err) {

    recipeView.displayError();

    console.error(err);
  }

};


const controlSearchResult = async function () {

  try {
    //model.state.search.currentPage = 1;
    const query = searchView.getSearchQuery();
    console.log(model.state.recipe);
    if (!query) return;

    resultView.renderSpinner();
    await model.loadSearchResult(query);
    console.log(model.state.search);
    //display search results
    resultView.render(model.dataPerPage());
    //load pagination
    paginationView.render(model.state.search);

  } catch (err) {
    resultView.displayError(err.message);
    console.log(err.message);
  }
}


const controlPagination = function (page) {

  resultView.render(model.dataPerPage(page));
  paginationView.render(model.state.search);

}

const controlServings = function (serv) {

  model.servings(serv);
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function (bookmark) {
  if (bookmark.bookmarked)
    model.removeBookmark(bookmark);
  else
    model.addBookmark(bookmark);
  //updates the bookmark button to filled
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
  model.addToLocalStorage();
}


const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (data) {
  try {
    console.log(model.state.recipe);
    addRecipeView.renderSpinner();

    await model.uploadRecipe(data);
    //render recipe
    recipeView.render(model.state.recipe);
    //show success msg
    addRecipeView.displayMessage();
    //render bookmarkview
    bookmarksView.render(model.state.bookmarks);
    //change url with current recipe id with history api
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);

    //console.log(data);
  } catch (err) {
    addRecipeView.displayError(err);
  }
}

const newFeature = function () {
  console.log('test feature');
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerChangePage(controlPagination);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  addRecipeView.addHandlerSubmit(controlAddRecipe);
  newFeature();
}

init();


























// MY alternative weird way of adding hash change event
/* document.querySelector('.search-results').addEventListener('click', function (event) {
  event.preventDefault();
  console.log(event.target.closest('.preview'));
  const clickTarget = event.target.closest('.preview');
  const id = clickTarget.querySelector('.preview__link').getAttribute("href");
  renderRecipe(id.replace('#', ''));
}); */

