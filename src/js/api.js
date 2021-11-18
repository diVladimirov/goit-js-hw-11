import axios from 'axios';

export async function fetchImages(data) {
  const BASE_URl = 'https://pixabay.com/api/';
  const API_KEY = 'key=24332293-f673b61ccd63539823a678f1a';

  const url = `${BASE_URl}?${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true`;

  return await axios.get(url);
}
