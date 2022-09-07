import View from './view.js';
import icons from 'url:../img/icons.svg';

class PaginationView extends View {
    _parentEl = document.querySelector('.pagination');

    generateMarkup() {
        const numPages = Math.ceil(this._data.result.length / this._data.resultsPerPage);
        console.log(numPages);

        if (numPages > 1 && this._data.currentPage === 1)
            return `<button data-goto="${this._data.currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        //show next page
        if (numPages === 1)
            return '';
        // show nothing
        if (this._data.currentPage === numPages && numPages > 1)
            return `<button data-goto="${this._data.currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.currentPage - 1}</span>
      </button>`;
        //show previous page
        if (this._data.currentPage < numPages && numPages > 1)
            return `<button data-goto="${this._data.currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.currentPage - 1}</span>
      </button>
      <button data-goto="${this._data.currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
        //show prevous and next page
    }

    addHandlerChangePage(handler) {
        this._parentEl.addEventListener('click', event => {
            event.preventDefault();
            const btn = event.target.closest('.btn--inline');
            if (btn.classList[1].includes('pagination__btn--next')) this._data.currentPage++;
            if (btn.classList[1].includes('pagination__btn--prev')) this._data.currentPage--;
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });



            handler(this._data.currentPage);
        });
    }

    /* addHandlerPrevPage(handler) {
        this._parentEl.querySelector('.pagination__btn--prev').addEventListener('click', event => {
            event.preventDefault();
            this._data.currentPage--
            handler(this._data.currentPage);
        });
    } */
}

export default new PaginationView();




