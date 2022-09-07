//import icons from '../img/icons.svg' //parcel v1 way

import icons from 'url:../img/icons.svg'; //parcel v2 way
import { Fraction } from 'fractional';
import View from './view.js';

class RecipeView extends View {

  _parentEl = document.querySelector('.recipe');



  generateMarkup() {
    return `<figure class="recipe__fig">
        <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>
    
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}.svg#icon-clock"></use>S
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">serving${this._data.servings > 1 ? 's' : ''}</span>
    
          <div class="recipe__info-buttons">
            <button data-update-to="${this._data.servings - 1}"class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-update-to="${this._data.servings + 1}" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
    
        <div class="recipe__user-generated ${this._data.key ? "" : 'hidden'}">
          <svg>
            <use href="${this._data.key ? icons : ""}.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}.svg#icon-bookmark${this._data.bookmarked ? '-fill' : ""}"></use>
          </svg>
        </button>
      </div>
    
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this.generateIng()}
        </ul>
      </div>
    
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`

  }

  addHandlerBookmark(handler) {
    this._parentEl.addEventListener('click', event => {
      const btn = event.target.closest('.btn--bookmark');
      if (!btn) return;

      //console.log(this._data);
      handler(this._data);
    })
  }

  generateIng() {
    return this._data.ingredients.map(ing => {
      return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
              <use href="${icons}.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${this.cupsToFraction(ing.quantity)}</div>
              <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
              </div>
              </li>`;
    }).join('')
  }

  addHandlerServings(handler) {
    this._parentEl.addEventListener('click', event => {
      const btn = event.target.closest('.btn--update-servings');
      if (!btn) return;
      let serv = +btn.dataset.updateTo;

      if (serv < 1 || serv >= 5) return;
      handler(serv);


    });

  }


  cupsToFraction(num) {
    if (num === null || num == 0) return '';
    const result = new Fraction(num).toString();

    /* if (num === null) return 'Some';
    const part = 100 - (num * 100);
    return `${num * 100 / part}/${100 / part}`; */
    return result
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event => window.addEventListener(event, handler));
  }

}

export default new RecipeView();











