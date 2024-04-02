// Function to fetch data from the API
function fetchData(url, successCallback, errorCallback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => successCallback(data))
        .catch(error => errorCallback(error));
}

// Function to render events
function renderEvents(data, targetElementId, htmlElement) {
    const events = data.events;
    let clutter = '';

    events.forEach(event => {
        const date = new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const distanceMiles = parseFloat(event.distanceKm) * 0.621371;
        const distance = distanceMiles.toFixed(2) + ' miles';

        // Concatenate the htmlElement variable with the current event data
        clutter += htmlElement
            .replace('${event.imgUrl}', event.imgUrl)
            .replace('${event.eventName}', event.eventName)
            .replace('${date}', date)
            .replace('${event.cityName}', event.cityName)
            .replace('${event.weather}', event.weather)
            .replace('${distance}', distance);
    });

    document.getElementById(targetElementId).innerHTML = clutter;
}

// Function to handle errors
function handleError(error) {
    console.error('There was a problem with the fetch operation:', error);
}

// Function to fetch and render events
function fetchAndRenderEvents(url, targetElementId, htmlElement) {
    fetchData(
        url,
        data => renderEvents(data, targetElementId, htmlElement),
        error => handleError(error)
    );
}

// Call the function to fetch and render recommended events
fetchAndRenderEvents(
    'https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco',
    'recomended',
    `
        <div class="card" >
            <img src="\${event.imgUrl}" alt="event image">
            <div class="card-body">
                <div class="up">
                    <h3><i class="ri-map-pin-line"></i> \${event.eventName}</h3>
                    <h6>\${date}</h6>
                </div>
                <div class="down">
                    <h4>\${event.cityName}</h4>
                    <h6>\${event.weather} | \${distance}</h6>
                </div>
            </div>
        </div>
    `
);

// Call the function to fetch and render upcoming events
fetchAndRenderEvents(
    'https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco',
    'upcoming',
    `
        <div class="card" >
            <div class="img"><img src="\${event.imgUrl}" alt="event images..."></div>
            <div class="card-body">
                <h4>\${event.eventName}</h4>
                <div class="down">
                    <h3><i class="ri-map-pin-line"></i>\${event.cityName}</h3>
                    <h6>\${date} | \${event.weather}</h6>
                </div>
            </div>
        </div> 
    `
);
