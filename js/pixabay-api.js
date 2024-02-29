const KEY = '42472601-e2efb745d6431960b7108569a';

export function fetchImages(search) {
    const url = `https://pixabay.com/api/?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    });
}
