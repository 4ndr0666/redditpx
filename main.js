function fetchMedia() {
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    const urlInput = document.getElementById("urlInput").value;
    const TARGET_URL = urlInput || "https://redditpx.jeffjose.cloud/r/lakebell";

    fetch(PROXY_URL + TARGET_URL, {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();  // Convert the response data to a blob
    })
    .then(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        displayImage(imageUrl);
    })
    .catch(error => {
        console.error('There was an error!', error);
        alert(`Error: ${error.message}`);
    });
}

function displayImage(url) {
    const img = document.createElement('img');
    img.src = url;
    document.getElementById("mediaDiv").appendChild(img);
}
