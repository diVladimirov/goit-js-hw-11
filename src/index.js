import './sass/main.scss';
import Notiflix from 'notiflix';
import { fetchImages } from './js/api';
import { getRefs } from './js/get-refs';
import { renderMarkup } from './js/markup';
import ImageApiService from './js/api';

const refs = getRefs();

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onClick);

function onSubmit(event) {
  event.preventDefault();
  imageApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (imageApiService.query === '') {
    return Notiflix.Notify.failure('Please make sure all fields are filled in correctly');
  }
  refs.loadMoreBtn.classList.remove('visually-hidden');
  imageApiService.resetPage();
  imageApiService.fetchImages().then(renderMarkup, clearImageContainer());
}

function onClick() {
  imageApiService.fetchImages().then(renderMarkup);
}

function clearImageContainer() {
  refs.imageContainer.innerHTML = '';
}
