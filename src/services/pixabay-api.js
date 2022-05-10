const API_KEY = '25322434-03acd505c9529e00e290dd06b';
const BASE_URL = 'pixabay.com/api';

function fetchPixabayImage(image, page) {
  return fetch(
    `https://${BASE_URL}/?q=${image}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Извините, нет резуьтатов поиска по запросу ${image}.`)
    );
  });
}
const pixabayAPI = {
  fetchPixabayImage,
};
export default pixabayAPI;
