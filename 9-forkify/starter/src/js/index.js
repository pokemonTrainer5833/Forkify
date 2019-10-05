import Search from './modals/Search';
import Recipe from './modals/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

//This is the global state of our app
//1>Search object
//2>Current recipe object
//3>Shopping list object
//4>Like recipe object
const state = {};

/**
 * Search
 * Controller */
const controlSearch = async () => {
  //1>Get the query from view controller
  const query = searchView.getQuery(); //will be stored in this query
  console.log(query);
  if (query) {
    //2>New Search object and add it to state
    state.search = new Search(query);

    //3>Prepare the user interface(loading spinner etc)
    searchView.removeQuery();
    searchView.removeResult();
    renderLoader(elements.searchRes);
    //4>Search or recipes
    await state.search.getData(); //it waits for the promise to fulfill and then only the next line can execute

    //5>Render the results on the UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
elements.searchRes.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const gotoPage = parseInt(btn.dataset.goto, 10);
    searchView.removeResult();
    searchView.renderResults(state.search.result, gotoPage);
  }
});

/**
 * Recipe
 * Controller */
const r = new Recipe(47746);
r.getRecipe();
console.log(r);
