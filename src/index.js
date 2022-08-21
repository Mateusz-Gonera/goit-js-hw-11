import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from "lodash.debounce";

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const searchBtn = document.querySelector(`button[type="submit"]`);

const API_KEY = '29396920-d4426056c3f6851287cd3980f';
const perPage = 40;

const fetchPhotos = async (search, pagenr) => {
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&pretty=true&per_page=${perPage}&page=${pagenr}`);
  const photos = await response.json();
  return photos;
};

form.addEventListener('submit', async event => {
  try {
    event.preventDefault();
    const { searchBtn, searchQuery } = event.currentTarget;    
    let trimInput = searchQuery.value.trim();
    let page = 1;
    const varPhotos = await fetchPhotos(trimInput, page);
    const photosArr = varPhotos.hits;

    if (varPhotos.hits.length === 0) {
      throw new Error();
    }
    console.log(photosArr);
    console.log(trimInput);
  } catch (error) {
    console.log('ups');
  }
});


// const totalHits = photos.totalHits;
    // const webformatURL = photos.hits.map(photo => {return photo.webformatURL});
    // console.log(photos);
    // console.log(webformatURL);
// https://pixabay.com/api/?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&pretty=true&per_page=${perPage}&page=1


