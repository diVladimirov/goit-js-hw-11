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
    console.log(this.pageSize);
    console.log(this.page);
    const url = `${BASE_URl}?${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.pageSize}&page=${this.page}`;
    this.incrementPage();
    const data = await axios.get(url);
    return { data, hasNextPage: this.page <= Math.ceil(500 / this.pageSize) };
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

// const fetchUsersBtn = document.querySelector(".btn");
// const userList = document.querySelector(".user-list");

// fetchUsersBtn.addEventListener("click", async () => {
//   try {
//     const users = await fetchUsers();
//     renderUserListItems(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// async function fetchUsers() {
//   const baseUrl = "https://jsonplaceholder.typicode.com";
//   const userIds = [1, 2, 3, 4, 5];

//   const arrayOfPromises = userIds.map(async (userId) => {
//     const response = await fetch(`${baseUrl}/users/${userId}`);
//     return response.json();
//   });

//   const users = await Promise.all(arrayOfPromises);
//   return users;
// }

// function renderUserListItems(users) {
//   const markup = users
//     .map(
//       (user) => `<ul class="item">
//         <p><b>Name</b>: ${user.name}</p>
//         <p><b>Email</b>: ${user.email}</p>
//         <p><b>Company</b>: ${user.company.name}</p>
//       </ul>`
//     )
//     .join("");
//   userList.innerHTML = markup;
// }
