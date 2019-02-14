'use strict';

const apiKey = 'NtDlhnRrQjIf34L4hWpbFp2lwikgbCnViWByCdKN';
const searchURL = 'https://api.nps.gov/api/v1/parks'

function getParkQueries(query, maxResults) {
    const params = {
      key: apiKey,
      q: query,
      limit: (maxResults - 1),
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    console.log(url);
    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseJson => displayReults(responseJson))
        .catch(err => failureCallback(err))
}

    
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayReults(responseJson) {
    console.log(responseJson);
    $('.parkResults').empty();
    $('.parkResults').append(`<h3></h3><ul id="listResults"></ul>`);
    $('.parkResults > h3').append(`All Nartional Parks for ${document.getElementById('stateInput').value}`)
    $('.parkResults').removeClass('hidden')
    
    for(let i = 0; i < responseJson.data.length; i++){
        console.log(`Created li link for ${responseJson.data[i].fullName}`)
        let location = `Latitude: + ${responseJson.data[i].latLong[0]} + 
        <br>Longitude:  + ${responseJson.data[i].latLong[1]}`
        $('#listResults').append(
            `<li><b>${responseJson.data[i].fullName}</b></li>
            <li><i>${responseJson.data[i].description}</i></li>
            <li><a href="${responseJson.data[i].url}" target='_blank'>${responseJson.data[i].fullName} Website</a></li>
            <li><a href="${responseJson.data[i].directionsUrl}" target="_blank">Direction</a></li><br><br>`
        )};
};

function failureCallback(errMessage) {
    console.log(errMessage)
    $('.parkResults').append(
        `We are sorry but there are no parks in that area.<br> ${errMessage}`)
    $('.parkResults').removeClass('hidden')
};



function searchStart() {
    $('form').submit(event => {
        event.preventDefault();
        let str = $('#stateInput').val();
        let maxResults = $('#maxNumInput').val();
        let userEntry = str.toLowerCase();
        getParkQueries(userEntry, maxResults);
       
    })
};

$(function() {
    console.log('Search has been loaded.');
    searchStart();
})