import axios from "axios";

const KEY = '42472601-e2efb745d6431960b7108569a';

export async function fetchImages(search) {
    const url = `https://pixabay.com/api/?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true`;

    try {
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching images: ${error.message}`);
    }
}
