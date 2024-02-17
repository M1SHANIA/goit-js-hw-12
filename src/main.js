// Імпортуємо модулі та стилі
import './js/pixabay-api.js';
import './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Імпортуємо стилі та бібліотеку для індикації завантаження
import 'nprogress/nprogress.css';
import { fetchImages, GALLERY_LINK } from './js/pixabay-api';
import { createGallery } from './js/render-functions';

// Отримуємо посилання на контейнер галереї, форму пошуку та елементи інтерфейсу
const galleryContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loaderContainer = document.querySelector('.loader');
const searchResultMessage = document.querySelector('.result-info');

// Додаємо обробник події для форми пошуку
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const queryInput = event.target.elements.query.value.trim(); // Вилучаємо пробіли з початку і кінця рядка

    // Додаємо відображення індикатора завантаження перед відправленням запиту
    loaderContainer.style.display = 'block';

    // Валідація мінімальної довжини пошукового запиту
    if (queryInput.length < 3) {
        // Використовуємо iziToast для відображення повідомлення про невалідний ввід
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query with at least 3 characters.',
            position: 'topRight',
        });
        // Приховуємо індикатор завантаження у випадку невалідного вводу
        loaderContainer.style.display = 'none';
        return;
    }

    // Очищення HTML галереї перед новим пошуком
    galleryContainer.innerHTML = '';
    searchResultMessage.innerHTML = ''; // Очищення інформації про результат перед новим пошуком

    // Ініціалізація SimpleLightbox тут, якщо потрібно, щоб гарантувати, що галерея буде готова до відображення
    const lightbox = new SimpleLightbox(`.${GALLERY_LINK}`);

    // Відправка запиту на сервер і обробка результату
    fetchImages(queryInput)
        .then(({ hits }) => {
            // Після отримання результату приховуємо індикатор завантаження
            loaderContainer.style.display = 'none';

            if (hits.length > 0) {
                // Виведення зображень в галерею
                const galleryHTML = hits.map(createGallery).join('');
                galleryContainer.innerHTML = galleryHTML;

                // Виведення інформації про результат
                searchResultMessage.innerHTML = `<p class="result-messages">${hits.length} images found for "${queryInput}"</p>`;

                // Оновлення SimpleLightbox
                lightbox.refresh();
            } else {
                // Відображення повідомлення про відсутність результатів
                searchResultMessage.innerHTML = '<p class="no-results-message">No images found.</p>';
            }

            // Закриття інформації про результат через 5 секунд
            setTimeout(() => {
                searchResultMessage.innerHTML = '';
            }, 5000);
        })
        .catch((error) => {
            // Приховуємо індикатор завантаження у випадку помилки
            loaderContainer.style.display = 'none';

            console.error('Error fetching images:', error);

            // Використання iziToast для відображення помилки користувачу
            iziToast.error({
                title: 'Error',
                message: 'Error fetching images. Please try again.',
                position: 'topRight',
            });
        })
        .finally(() => {
            // Приховання індикатора завантаження та очищення форми
            searchForm.reset();
        });
});
