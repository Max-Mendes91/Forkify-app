import View from './View.js';
import icons from '../../img/icons.svg'

// Simple fraction formatter
const formatFraction = (num) => {
    if (!num || num === 0) return '';
    if (num % 1 === 0) return num.toString();

    const whole = Math.floor(num);
    const decimal = num - whole;

    // Common fractions
    const fractions = [
        [0.125, '1/8'], [0.25, '1/4'], [0.333, '1/3'], [0.5, '1/2'],
        [0.667, '2/3'], [0.75, '3/4'], [0.875, '7/8']
    ];

    // Find closest fraction
    let closest = fractions[0];
    let minDiff = Math.abs(decimal - fractions[0][0]);

    for (let [dec, frac] of fractions) {
        const diff = Math.abs(decimal - dec);
        if (diff < minDiff) {
            minDiff = diff;
            closest = [dec, frac];
        }
    }

    if (minDiff < 0.1) {
        return whole > 0 ? `${whole} ${closest[1]}` : closest[1];
    }

    return num.toString();
};


class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    
    _errorMessage = 'We could not find that recipe. Please try another';
    _message ='';
    
    
    
    

    addHandlerRender(handler) {

        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }




  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--decrease-servings">
            <svg><use href="${icons}#icon-minus-circle"></use></svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg><use href="${icons}#icon-plus-circle"></use></svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        
      </div>
      <button class="btn--round">
        <svg><use href="${icons}#icon-bookmark-fill"></use></svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(ing => `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity ? formatFraction(ing.quantity) : ''}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
        `).join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this._data.publisher}</span>.
        Please check out directions at their website.
      </p>
      <a class="btn--small recipe__btn" href="${this._data.sourceUrl}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
  }

}

export default new RecipeView();
