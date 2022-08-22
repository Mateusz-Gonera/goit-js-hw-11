import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const searchBtn = document.querySelector(`button[type="submit"]`);
const gallery = document.querySelector('.gallery');

const API_KEY = '29396920-d4426056c3f6851287cd3980f';
const perPage = 40;
let page = 1;
searchBtn.disabled = false;


const fetchPhotos = async (search, pagenr) => {
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&pretty=true&per_page=${perPage}&page=${pagenr}`);
  const photos = await response.json();
  return photos;
};

const renderGallery = (dataArray) => {
  let markup = dataArray
    .map(data => {
      return `<div class="photo-card">
  <a href="${data.largeImageURL}"><img src="${data.webformatURL}" alt="${data.tags}" loading="lazy" title="" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="span-item">${data.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span class="span-item">${data.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class="span-item">${data.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class="span-item">${data.downloads}</span>
    </p>
  </div>
</div>`
    })
    .join("");

  gallery.innerHTML = markup;
};

const renderNextPhotos = (dataArray) => {
  let markup2 = dataArray
    .map(data => {
      return `<div class="photo-card">
  <a href="${data.largeImageURL}"><img src="${data.webformatURL}" alt="${data.tags}" loading="lazy" title="" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="span-item">${data.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span class="span-item">${data.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class="span-item">${data.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class="span-item">${data.downloads}</span>
    </p>
  </div>
</div>`
    })
    .join("");
  
  gallery.insertAdjacentHTML('beforeend', markup2);
};

form.addEventListener('submit', async event => {
  try {
    event.preventDefault();
    const { searchBtn, searchQuery } = event.currentTarget;
    let trimInput = searchQuery.value.trim();
    localStorage.setItem('inputValue', `${trimInput}`)
    const varPhotos = await fetchPhotos(trimInput, page);
    const photosArr = varPhotos.hits;
    const total = varPhotos.totalHits;
    if (trimInput === "") return;
    Notiflix.Notify.success(`Hooray! We found ${total} images.`)
    if (photosArr.length === 0) {
      throw new Error();
    }
    renderGallery(photosArr);
    const lightbox = new simpleLightbox('.gallery a');
    lightbox.refresh();
    console.log(photosArr[0].webformatURL);
    console.log(photosArr[0].largeImageURL);
    console.log(photosArr[0].tags);
    console.log(photosArr[0].likes);
    console.log(photosArr[0].views);
    console.log(photosArr[0].comments);
    console.log(photosArr[0].downloads);

    console.log(varPhotos.totalHits);
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }
});

window.addEventListener("scroll", debounce(async event => {
  try {    
  let trimInput = localStorage.getItem('inputValue');
  const varPhotos = await fetchPhotos(trimInput, page);
    const photosArr = varPhotos.hits;
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      page += 1;
    renderNextPhotos(photosArr);
    const lightbox = new simpleLightbox('.gallery a');
    console.log(`${trimInput}`)
    }
  } catch (error) {
    console.log(error.message);
  }
}, 100))
