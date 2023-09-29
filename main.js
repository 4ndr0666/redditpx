function fetchMedia() {
    const PROXY_URL = "https://cors.io/?";  // New Proxy URL
    const TARGET_URL = "https://redditpx.jeffjose.cloud/r/lakebell";
    const inputField = document.getElementById('userInput');
    const userURL = inputField ? inputField.value : TARGET_URL;
    
    fetch(PROXY_URL + userURL, {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => {
        if (!response.ok) {
            console.error(`HTTP Status: ${response.status}, Status Text: ${response.statusText}`);
            throw new Error('Network response was not ok. This could be a CORS issue.');
        }
        return response.blob();
    })
    .then(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        displayImage(imageUrl);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}

function displayImage(url) {
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
}
