import View from './view.js';
import icons from 'url:../img/icons.svg';
import previewView from './previewView.js';


class ResultView extends View {

  _parentEl = document.querySelector('.results');
  _errMessage = 'Could not match your query. Try again!';

  generateMarkup() {
    return this._data.map(el => previewView.render(el, false)).join('');
  }




}

export default new ResultView();