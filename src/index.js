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

  imageApiService.resetPage();
  clearImageContainer();

  fetchedImages();
}

async function fetchedImages() {
  try {
    const { data, hasNextPage } = await imageApiService.fetchImages();
    console.log(data);
    console.log(data.data.hits);

    renderMarkup(data);
    if (!hasNextPage) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadMoreBtn.classList.add('visually-hidden');
      return;
    }

    if (data.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      refs.loadMoreBtn.classList.add('visually-hidden');
    }

    Notiflix.Notify.info(`Hooray! We found ${data.data.totalHits} images.`);

    setTimeout(() => {
      refs.loadMoreBtn.classList.remove('visually-hidden');
    }, 1000);
    // checkFreeImages(data.data.totalHits);
    // imageApiService.fetchImages().then(renderMarkup);
  } catch (error) {
    console.log(error.message);
  }
}

function onClick() {
  fetchedImages();
}

function clearImageContainer() {
  refs.imageContainer.innerHTML = '';
}

// function checkFreeImages() {}

// function onSubmit(event) {
//   event.preventDefault();
//   imageApiService.query = event.currentTarget.elements.searchQuery.value.trim();
//   if (imageApiService.query === '') {
//     return Notiflix.Notify.failure('Please make sure all fields are filled in correctly');
//   }

//   imageApiService.resetPage();
//   imageApiService.fetchImages().then(renderMarkup, clearImageContainer());
//   refs.loadMoreBtn.classList.remove('visually-hidden');
// }
