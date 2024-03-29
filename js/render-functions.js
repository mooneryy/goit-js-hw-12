//бібліотеки
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const LOADER = document.getElementById('loader');
const GALLERY = document.getElementById('gallery');
const lightbox = new SimpleLightbox('.gallery a');

export async function showImages(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<div class="card">
      <a href="${largeImageURL}" data-lightbox="gallery" data-title="${tags}">
        <img src="${webformatURL}" alt="${tags}" title="${tags}"/>
      </a>
      <div class="card-border">
      <div class="param">
      <p class="title">Likes:</p>
      <p class="title">Views:</p>
      <p class="title">Comments:</p>
      <p class="title">Downloads:</p>
       </div>
        <div class="param">
      <p class="title-value">${likes}</p>
      <p class="title-value">${views}</p>
      <p class="title-value">${comments}</p>
      <p class="title-value">${downloads}</p>
       </div>
      </div>
    </div>`)
      .join('');
  GALLERY.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

    const imgLoad = GALLERY.querySelectorAll('img');
    const loadDelay = Array.from(imgLoad).map(img =>
        new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        })
    );

    try {
      await Promise.all(loadDelay);
        LOADER.style.display = 'none';
    } catch (error) {
            console.error('Error loading images:', error);
        }
    }
    
        
           