import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import { fetchImages } from "../js/pixabay-api";
import { showImages } from "../js/render-functions";

import cautionIcon from './img/caution.svg';
import errorIcon from './img/error.svg';


const LOADER = document.getElementById('loader');
const GALLERY = document.getElementById('gallery');
const lightbox = new SimpleLightbox('.gallery a');
const SEARCH_FORM = document.getElementById('search-form');
const SEARCH_INPUT = document.getElementById('search-input');
const LOAD_MORE_BUTTON = document.getElementById('load-more-btn');

// пагінація
let currentPage = 1;
let currentQuery = "";

function toggleLoadMoreButton(show) {
    LOAD_MORE_BUTTON.style.display = show ? 'block' : 'none';
}

async function loadMoreImages() {
    LOADER.style.display = 'block';

    try {
        currentPage += 1;
        const data = await fetchImages(currentQuery, currentPage);

        if (data.hits.length > 0) {
            showImages(data.hits);
            const cardHeight = GALLERY.querySelector('.card').getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });
        
        } else {
            iziToast.warning({
                title: 'No more results',
                message: 'There are no more images for this search',
                theme: 'dark',
                position: 'topRight',
                backgroundColor: '#ffa000',
                messageColor: '#fafafb',
                iconUrl: cautionIcon,
            });
            if (currentPage === 1) {
                LOAD_MORE_BUTTON.style.display = 'none';
            } else {
                LOAD_MORE_BUTTON.disabled = true;
            }  
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occured while fetching more images. Please try again'
        });
        console.error('Error fetching more images:', error);
    } finally {
        LOADER.style.display = 'none';
    }

}

LOAD_MORE_BUTTON.addEventListener('click', loadMoreImages);

async function searchFormSubmit(event) {
    event.preventDefault();
    currentPage = 1;
    const query = SEARCH_INPUT.value.trim();
     currentQuery = query;

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
    toggleLoadMoreButton(false);

    try {
        const data = await fetchImages(currentQuery);

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
            toggleLoadMoreButton(true);
        }
        
    } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while fetching images. Please try again!'
            });
    
            console.error('Error fetching images:', error);
    } finally {
         setTimeout(() => {
            LOADER.style.display = 'none';
        }, 1500);
    }
}

SEARCH_FORM.addEventListener('submit', searchFormSubmit);

