import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from "lodash.debounce";

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const searchBtn = document.querySelector(`button[type="submit"]`);

const API_KEY = '29396920-d4426056c3f6851287cd3980f';
const perPage = 40;

const fetchPhotos = () => {
    return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=qweqweq&image_type=photo&orientation=horizontal&safesearch=true&pretty=true&per_page=${perPage}&page=1`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
  });
};

const renderFirstSearch = async () => {
    try {
        const photos = await fetchPhotos();
        
        console.log(photos.hits);

    } catch (error) {
        console.log('ups');
    };
};

// const totalHits = photos.totalHits;
    // const webformatURL = photos.hits.map(photo => {return photo.webformatURL});
    // console.log(photos);
    // console.log(webformatURL);
// https://pixabay.com/api/?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&pretty=true&per_page=${perPage}&page=1

console.log(renderFirstSearch());

