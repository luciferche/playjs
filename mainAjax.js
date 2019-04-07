/const urlBase = 'https://pokeapi.co/api/v2/';

var resultSpan = document.getElementById('content');

getUsers
getJokes
function get () {
    var url = document.getElementById('inputUrl').value;

    getAjax(url)
}

function post (params) {
    var url = document.getElementById('inputUrl').value;
    postAjax(url, params);
}


function getAjax(endpoint) {

    var url = urlBase + endpoint;
    console.log('ajax GET - ' + url);
    var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
    r   return false;
    }
    httpRequest.onreadystatechange = getCallback;
    httpRequest.open('GET', url);
    httpRequest.send();
}

function getCallback() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log('request done - status ', httpRequest.status);
        if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            resultSpan.innerHTML = httpRequest.responseText;
            return httpRequest.responseText;
        } else {
            alert('There was a problem with the request.');
            console.error('ERROR with the request ', httpRequest.response);
        }
    } else {
        console.log('request not done ', httpRequest.readyState);
    }
}

function postAjax(endpoint, data) {
    var url = urlBase + endpoint;
    console.log('ajax GET - ' + url);
    var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    httpRequest.onreadystatechange = postCallback;
    
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(params);
}


function postCallback() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log('request done - status ', httpRequest.status);
        if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            resultSpan.innerHTML = httpRequest.responseText;
            return httpRequest.responseText;
        } else {
            alert('There was a problem with the request.');
            console.error('ERROR with the request ', httpRequest.response);
        }
    } else {
        console.log('request not done ', httpRequest.readyState);
    }
}