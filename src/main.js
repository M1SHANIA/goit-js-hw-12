import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './js/pixabay-api.js';
import { displayImages, appendImages, initializeLightbox } from './js/render-functions.js';

const galleryContainer = document.querySelector('.gallery');
const loaderContainer = document.getElementById('loader');
const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');
const loadingIndicator = document.getElementById('loading-indicator');

loadMoreBtn.style.display = 'none';

const apiKey = '42361434-dd35276d7c0a60f1c8ceb9714';
let currentPage = 1;
let currentQuery = '';
let currentImagesCount = 0;
let totalHits = 0;

function toastSuccess(message) {
    iziToast.success({
        title: 'Success',
        message: message,
        position: 'topRight'
    });
}

function toastError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight'
    });
}

function toggleLoadMoreBtn(show) {
    loadMoreBtn.style.display = show ? 'block' : 'none';
}

function toggleLoader(show) {
    loaderContainer.style.display = show ? 'block' : 'none';
    loadingIndicator.style.display = show ? 'block' : 'none';
}

async function scrollToNextGroup() {
    const cardHeight = galleryContainer.querySelector('.image-card').getBoundingClientRect().height;
    window.scrollBy({
        top: 2 * cardHeight,
        left: 0,
        behavior: 'smooth'
    });
}

async function performSearch(query, page) {
    try {
        toggleLoader(true);
        const images = await searchImages(query, page);
        if (images.length > 0) {
            if (page === 1) {
                displayImages(galleryContainer, images);
            } else {
                appendImages(galleryContainer, images);
            }
            toastSuccess(`Was found: ${images.length} images`);
            initializeLightbox();
            if (images.length < 15) {
                toastError('We are sorry, but you have reached the end of search results.');
                toggleLoadMoreBtn(false);
            } else {
                toggleLoadMoreBtn(true);
            }
            scrollToNextGroup();
        } else {
            galleryContainer.innerHTML = '';
            toastError(`Sorry, there are no images matching your search query "${query}". Please try again!`);
            toggleLoadMoreBtn(false);
        }
    } finally {
        toggleLoader(false);
    }
}

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    toggleLoadMoreBtn(false);
    const query = document.getElementById('query').value.trim();
    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search query.' });
        return;
    }
    currentQuery = query;
    currentPage = 1;
    await performSearch(query, currentPage);
});

loadMoreBtn.addEventListener('click', async function () {
    try {
        toggleLoader(true);
        currentPage++;
        await performSearch(currentQuery, currentPage);
    } catch (error) {
        toastError('Failed to fetch additional images.');
    } finally {
        toggleLoader(false);
    }
});
