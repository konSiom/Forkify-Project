import icons from 'url:../img/icons.svg';

export default class View {


  _data;

  render(data, render = true) {
    if (!data || Array.isArray(data) && data.length === 0)
      return this.displayError();
    this._data = data;
    const markup = this.generateMarkup();

    if (!render) return markup;

    this._clear();

    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {

    this._data = data;
    const newMarkup = this.generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Updates changed text
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        //console.log(newEl.textContent);
        curEl.textContent = newEl.textContent;

      }
      // Updates changed attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))

      }
    })

  }

  renderSpinner() {
    this._clear();
    const markup = `<div class="spinner">
         <svg>
         <use href="${icons}.svg#icon-loader"></use>
         </svg>
         </div>`;

    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = ''; //clears element from inner elements
  }

  displayMessage(message = this._message) {
    this._clear();
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._parentEl.insertAdjacentHTML('afterbegin', markup);

  }


  displayError(message = this._errMessage) {
    this._clear();
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

}