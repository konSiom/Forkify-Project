import { getJSON, postJSON } from './helpers.js';
import { API_URL, API_KEY, PAGE_RESULTS } from './config.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        resultsPerPage: PAGE_RESULTS,
        currentPage: 1
    },
    bookmarks: [],
};


export const loadSearchResult = async function (query) {
    try {
        const url = `${API_URL}?search=${query}&key=${API_KEY}`;
        const data = await getJSON(url);
        console.log(data);
        state.search.result = data.data.recipes.map(rec => {
            return {

                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && { key: rec.key }),
            }
        });
        //console.log(state.search.result);
        if (state.search.result.length === 0) throw new Error('Could not match query, please try again');

        state.search.currentPage = 1;


    } catch (err) {
        throw err;

    }
}

const createRecipeObj = function (recipe) {
    return {
        id: recipe.id,
        cookingTime: recipe.cooking_time,
        image: recipe.image_url,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        title: recipe.title,
        sourceUrl: recipe.source_url,
        bookmarked: false,
        ...(recipe.key && { key: recipe.key }),
    }
}


export const loadRecipe = async function (id) {

    try {
        const found = state.bookmarks.find(bm => bm.id === id);
        state.recipe = found;
        if (found) return;
        const url = `${API_URL}/${id}?key=${API_KEY}`;
        const data = await getJSON(url);

        const { recipe } = data.data;
        state.recipe = createRecipeObj(recipe);


    } catch (err) {
        throw err;

    }

}

export const dataPerPage = function (page = state.search.currentPage) {
    state.search.currentPage = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    const dataPart = state.search.result.slice(start, end);
    return dataPart;
}

export const servings = function (serv) {
    //state.recipe.servings = serv;
    const servings = state.recipe.servings;


    state.recipe.ingredients.forEach(ing => ing.quantity = ((ing.quantity * serv) / servings));
    state.recipe.servings = serv;

}

export const addBookmark = function (bookmark) {
    state.bookmarks.push(bookmark);

    state.recipe.bookmarked = true;


}

export const removeBookmark = function (bookmark) {
    const index = state.bookmarks.findIndex(el => el.id === bookmark.id);
    state.recipe.bookmarked = false;

    state.bookmarks.splice(index, 1);

}


export const addToLocalStorage = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

const init = function () {
    const bm = localStorage.getItem('bookmarks');

    if (bm) state.bookmarks = JSON.parse(bm);

    //console.log(state.bookmarks);
}
init();

export const uploadRecipe = async function (uploadData) {

    try {
        const ingr = Object.entries(uploadData).filter(el => el[0].startsWith('ingredient') && el[1] !== '')
            .map(ing => {
                const ingArr = ing[1].split(',').map(ing => ing.trim());
                if (ingArr.length !== 3) throw new Error('Wrong data format');
                const [quantity, unit, description] = ingArr;
                return { quantity: quantity ? +quantity : null, unit, description }
            });
        const recipe = {
            title: uploadData.title,
            cooking_time: +uploadData.cookingTime,
            publisher: uploadData.publisher,
            servings: +uploadData.servings,
            source_url: uploadData.sourceUrl,
            image_url: uploadData.image,
            ingredients: ingr
        };

        const response = await postJSON(`${API_URL}?key=${API_KEY}`, recipe);
        const data = response.data.recipe;
        //console.log(data);

        state.recipe = createRecipeObj(data);
        addBookmark(data);
    } catch (err) {
        throw err
    }

    console.log(state.recipe);
}












