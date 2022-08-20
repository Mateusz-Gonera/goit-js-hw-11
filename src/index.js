import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from "lodash.debounce";

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const searchBtn = document.querySelector(`button[type="submit"]`);

const API_KEY = '29396920-d4426056c3f6851287cd3980f';
const perPage = 40;

const renderFirstSearch = async () => {
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&pretty=true&per_page=${perPage}&page=1`);
    const photos = await response.json();
    console.log(photos);
};

// https://pixabay.com/api/?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&pretty=true&per_page=${perPage}&page=1

renderFirstSearch();
console.log(searchBtn);

