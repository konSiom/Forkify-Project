import View from './view.js'
import icons from 'url:../img/icons.svg';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMessage = 'Bookmark list is empty';


  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  generateMarkup() {
    return this._data.map(el => previewView.render(el, false)).join('');

  }
}

export default new BookmarksView();