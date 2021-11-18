import './sass/main.scss';
import Notiflix from 'notiflix';

import { getRefs } from './js/get-refs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const searchQuery = form.elements.searchQuery.value;
  console.log(searchQuery);
}
