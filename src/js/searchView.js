class SearchView {

    _parentEl = document.querySelector('.search');

    getSearchQuery() {
        const query = this._parentEl.querySelector('.search__field').value;
        this._clearSearchField();
        return query;
    }

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (event) {
            event.preventDefault();
            handler();
        });
    }

    _clearSearchField() {
        this._parentEl.querySelector('.search__field').textContent = '';
    }

}

export default new SearchView();


