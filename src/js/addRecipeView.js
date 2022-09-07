import View from "./view";

class AddRecipeView extends View {
    _parentEl = document.querySelector('.upload');
    //_errMessage = 'Wrong data format';
    _message = 'Recipe uploaded successfully!';

    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');

    constructor() {
        super();
        this.addHandlerOpenWindow();
        this.addHandlerCloseWindow();

    }

    toggleWindow() {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }

    addHandlerOpenWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerCloseWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerSubmit(handler) {
        this._parentEl.addEventListener('submit', function (event) {
            event.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }
}

export default new AddRecipeView();

