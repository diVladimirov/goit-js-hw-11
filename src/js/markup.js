import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getRefs } from './get-refs';

const refs = getRefs();

export function renderMarkup(image) {
  console.log(image);
  const imageArray = image.data.hits;
  // console.log(imageArray);

  // if (imageArray.length === 0) {
  //   Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.',
  //   );
  // } else {
  const markup = imageArray
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<a href="${largeImageURL}">
        <div class="photo-card">
          <div class="thumb">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </p>
      </div>
    </div>
    </a>`,
    )
    .join('');

  refs.imageContainer.insertAdjacentHTML('beforeend', markup);

  // const { height: cardHeight } = document
  //   .querySelector('.gallery')
  //   .firstElementChild.getBoundingClientRect();

  // window.scrollBy({
  //   top: cardHeight * 2,
  //   behavior: 'smooth',
  // });

  let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'botton',
    captionDelay: 250,
  });
}
