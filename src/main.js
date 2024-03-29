import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import { fetchImages } from "../js/pixabay-api";
import { showImages } from "../js/render-functions";

import cautionIcon from './img/caution.svg';
import errorIcon from './img/error.svg';

// Отримання елементів DOM
const LOADER = document.getElementById('loader');
const GALLERY = document.getElementById('gallery');
const SEARCH_FORM = document.getElementById('search-form');
const SEARCH_INPUT = document.getElementById('search-input');
const LOAD_MORE_BUTTON = document.getElementById('load-more-btn');

// Ініціалізація галереї lightbox
const lightbox = new SimpleLightbox('.gallery a');

// Параметри для пагінації
let currentPage = 1;
let currentQuery = "";
let PER_PAGE = 15;
// Глобальна змінна для зберігання всіх зображень
let allImages = [];

// Функція для відображення/приховування кнопки "Load more"
function toggleLoadMoreButton(show) {
    LOAD_MORE_BUTTON.style.display = show ? 'block' : 'none';
}

// Функція для відображення/приховування індикатора завантаження
function updateLoaderVisibility(show) {
    LOADER.style.display = show ? 'block' : 'none';
}

// Функція завантаження додаткових зображень
async function loadMoreImages() {
    updateLoaderVisibility(true);

    try {
        currentPage += 1;
        const data = await fetchImages(currentQuery, currentPage, PER_PAGE);
        const totalHits = data.totalHits;
        const totalPages = Math.ceil(totalHits / PER_PAGE);

        if (currentPage > totalPages) {
            iziToast.error({
                message: "We're sorry, but you've reached the end of search results.",
                theme: 'dark',
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageColor: '#fafafb',
                iconUrl: errorIcon,
            });
            toggleLoadMoreButton(false);
        } else {
            // Додаємо нові зображення до існуючих
            allImages.push(...data.hits);
            showImages(allImages);
            toggleLoadMoreButton(currentPage < totalPages);
            const cardHeight = GALLERY.querySelector('.card').getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching more images. Please try again.'
        });
        console.error('Error fetching more images:', error);
    } finally {
       updateLoaderVisibility(false);
    }
}

// Функція для виконання пошуку
async function performSearch(query) {
    updateLoaderVisibility(true);

    try {
        const data = await fetchImages(query);
        const totalHits = data.totalHits;

        if (totalHits === 0) {
            iziToast.warning({
                title: 'No results',
                message: 'Sorry, there are no images matching your search. Please try again!',
                theme: 'dark',
                position: 'topRight',
                backgroundColor: '#ffa000',
                messageColor: '#fafafb',
                iconUrl: cautionIcon
            });
            toggleLoadMoreButton(false); // Приховуємо кнопку "Load more", оскільки немає результатів
        } else {
            allImages = [];
            showImages(data.hits);
            toggleLoadMoreButton(data.totalHits > PER_PAGE && data.hits.length >= PER_PAGE);
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again!'
        });
        console.error('Error fetching images:', error);
    } finally {
        updateLoaderVisibility(false);
    }
}

// Функція обробки події відправлення форми пошуку
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

    GALLERY.innerHTML = "";
    toggleLoadMoreButton(false);

    await performSearch(query);
}

// Додавання слухача події для форми пошуку
SEARCH_FORM.addEventListener('submit', searchFormSubmit);

// Додавання слухача подій для кнопки "Load more"
LOAD_MORE_BUTTON.addEventListener('click', loadMoreImages);
