import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "../js/pixabay-api";
import { showImages } from "../js/render-functions";

import cautionIcon from './img/caution.svg';
import errorIcon from './img/error.svg';

const LOADER = document.getElementById('loader');
const GALLERY = document.getElementById('gallery');
const lightbox = new SimpleLightbox('.gallery a');
const SEARCH_FORM = document.getElementById('search-form');
const SEARCH_INPUT = document.getElementById('search-input');


SEARCH_FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    const query = SEARCH_INPUT.value.trim();

    if (query === "") {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term!',
            theme: 'dark',
            position: 'topRight',
            backgroundColor: '#ef4040',
            messageColor: '#fafafb',
            iconUrl: errorIcon,
        });
        return;
    }


    LOADER.style.display = 'block';

    GALLERY.innerHTML = "";


    fetchImages(query)
        .then((data) => {
            setTimeout(() => {
                LOADER.style.display = 'none';
            }, 1500);
           
            if (data.hits.length === 0) {
                iziToast.warning({
                    title: 'No results',
                    message: 'Sorry, there are no images matching your search.Please try again!',
                     theme: 'dark',
                    position: 'topRight',
                    backgroundColor: '#ffa000',
                    messageColor: '#fafafb',
                     iconUrl: cautionIcon
                });
            } else {
                showImages(data.hits);
            }
        })
        .catch((error) => {
            LOADER.style.display = 'none';

            iziToast.error({
                title: 'Error',
                message: 'An error occurred while fetching images. Please try again!'
            });
            console.error('Error fetching images:', error);
        });
});

