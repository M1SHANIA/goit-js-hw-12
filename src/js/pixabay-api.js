import axios from 'axios';

const apiKey = '42175181-9f2e4ea0c75ffabf50c3ef9f9';

export async function searchImages(query, page = 1) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
    try {
        const response = await axios.get(url);
        return response.data.hits;
    } catch (error) {
        throw error;
    }
}
