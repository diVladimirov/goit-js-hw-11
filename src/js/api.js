// import axios from 'axios';

// const BASE_URl = 'https://pixabay.com/api/';
// const API_KEY = 'key=24332293-f673b61ccd63539823a678f1a';

// export async function fetchImages(data) {
//   const url = `${BASE_URl}?${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

//   return axios.get(url);
// }

import axios from 'axios';

const BASE_URl = 'https://pixabay.com/api/';
const API_KEY = 'key=24332293-f673b61ccd63539823a678f1a';
const PER_PAGE = 40;

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.pageSize = PER_PAGE;
  }
  async fetchImages() {
    const url = `${BASE_URl}?${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.pageSize}&page=${this.page}`;
    this.incrementPage();
    return await axios.get(url);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
